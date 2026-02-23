import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
  Node,
  Edge,
} from "reactflow";
import {
  colors,
  Typography,
  IconButton,
  Box,
  Button,
  makeStyles,
  Dialog,
  AppBar,
  Toolbar,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";

/**
 * @function a custom hook where you can utilize to declare a boolean state with method declared
 * @param {Boolean} initialValue
 * @returns {[Boolean, VoidFunction, VoidFunction, VoidFunction]}
 */
const useToggle = (initialValue = false) => {
  const [isOn, setIsOn] = useState(initialValue);

  function switchOn() {
    setIsOn(true);
  }

  function switchOff() {
    setIsOn(false);
  }

  //
  function toggle() {
    setIsOn((prevState) => !prevState);
  }

  useEffect(() => {
    setIsOn(initialValue);
  }, [initialValue]);

  return [isOn, switchOn, switchOff, toggle];
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: 64,
  },
  mapContainer: {
    width: "calc(100% - 300px)",
    height: "calc(100vh - 64px)",
    marginTop: 64,
    float: "right",
  },
  box: {
    width: 160,
    height: 70,
    textAlign: "center",
    fontSize: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
    borderRadius: 20,
    fontFamily: theme.typography.fontFamily,
  },
  modal: {
    width: 250,
    height: "100vh",
    position: "absolute",
    top: 64,
    left: 0,
    backgroundColor: "white",
    boxShadow: "2px 0 5px rgba(0,0,0,0.3)",
    padding: theme.spacing(2),
    boxSizing: "border-box",
  },
}));

const nodeSpacing = { x: 200, y: 100 };

const calculateSubtreeWidths = (data) => {
  const widths = {};
  const visited = new Set();

  const calculateWidth = (nodeId, path = new Set()) => {
    if (path.has(nodeId)) {
      //console.warn(`Cycle detected at node ${nodeId}`);
      return 0; // Return 0 or handle cycle appropriately
    }

    if (visited.has(nodeId)) {
      return widths[nodeId];
    }

    path.add(nodeId);
    visited.add(nodeId);

    const node = data.find((item) => item.ixStatus.toString() === nodeId);

    if (!node || !node.required || !node.required.ixStatus.length) {
      widths[nodeId] = 1;
      path.delete(nodeId);
      return 1;
    }

    const childWidths = (node?.required?.ixStatus || []).map((childId) =>
      calculateWidth(childId.toString(), path)
    );

    widths[nodeId] = childWidths.reduce((a, b) => a + b, 0);
    path.delete(nodeId);
    return widths[nodeId];
  };

  data.forEach((item) => {
    if (!(item.ixStatus.toString() in widths)) {
      calculateWidth(item.ixStatus.toString());
    }
  });

  return widths;
};

const calculatePositions = (data) => {
  const positions = {};
  const subtreeWidths = calculateSubtreeWidths(data);

  const assignPosition = (nodeId, level, xOffset = 0) => {
    const nodeWidth = subtreeWidths[nodeId] * nodeSpacing.x;
    const position = {
      x: xOffset + nodeWidth / 2 - nodeSpacing.x / 2,
      y: level * nodeSpacing.y,
    };
    positions[nodeId] = position;

    const node = data.find((item) => item.ixStatus.toString() === nodeId);
    if (node && node.required && node.required.ixStatus.length) {
      let currentXOffset = xOffset;
      node.required.ixStatus.forEach((childId) => {
        const childWidth = subtreeWidths[childId.toString()] * nodeSpacing.x;
        if (!positions[childId.toString()]) {
          assignPosition(childId.toString(), level + 1, currentXOffset);
          currentXOffset += childWidth;
        }
      });
    }
  };

  const rootNodes = data.filter(
    (node) =>
      !data.some((item) =>
        (item?.required?.ixStatus || []).includes(node.ixStatus)
      )
  );

  let currentXOffset = 0;
  rootNodes.forEach((node) => {
    assignPosition(node.ixStatus.toString(), 0, currentXOffset);
    currentXOffset += subtreeWidths[node.ixStatus.toString()] * nodeSpacing.x;
  });

  return positions;
};

/**
 *
 * @param {object} param
 * @param {Array<{AssignTo: string, color: string, ixStatus: number, required: {ixStatus: []}, sStatus: string}>} param.wf
 * @returns
 */
const WFMap = ({ wf = [], title = "Flowchart" }) => {
  const classNames = useStyles();

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const [wfMapShown, openWfMap, closeWfMap] = useToggle();
  const [nodeVisibility, setNodeVisibility] = useState(
    wf.reduce((acc, item) => ({ ...acc, [item.ixStatus]: true }), {})
  );

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const handleCheckboxChange = (event, nodeId) => {
    setNodeVisibility((prev) => ({ ...prev, [nodeId]: event.target.checked }));
  };

  useEffect(() => {
    const positions = calculatePositions(wf);

    /**
     * @type {Node<any, string>[]}
     */
    const elements = wf
      .filter((item) => nodeVisibility[item.ixStatus])
      .map((item) => ({
        id: item.ixStatus.toString(),
        type: "default",
        data: { label: item.sStatus },
        position: positions[item.ixStatus.toString()] || { x: 0, y: 0 },
        className: classNames.box,
        style: {
          border: `10px solid ${colors[item.color][500]}`,
          marginTop: "8px",
        },
        status: item.sStatus,
      }));

    /**
     * @type {Edge<any>[]}
     */
    const lines = wf.flatMap((item) => {
      if (!nodeVisibility[item.ixStatus]) return [];
      const source = item.ixStatus.toString();
      const targets = (item?.required?.ixStatus || [])
        .map((target) => `${target}`)
        .filter((target) => nodeVisibility[target]);

      return targets.map((target, index) => {
        const sourcePos = positions[source];
        const targetPos = positions[target];
        const isReverse = targetPos.y < sourcePos.y;
        const sourceColor = colors[item.color][500]; // Extract color from parent node

        const pathOffset = isReverse ? 40 + index * 200 : 0; // Increase horizontal offset for reverse edges

        return {
          id: `e${source}-${target}`,
          source,
          target,
          type: "smoothstep",
          style: { stroke: isReverse ? sourceColor : sourceColor, strokeWidth: isReverse ? 2 : 2 }, // Adjust stroke color based on isReverse
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: sourceColor,
          },
          animated: isReverse,

          zIndex: isReverse ? 0 : 1,
          pathOptions: isReverse
            ? {
                curvature: 0.5,
                offset: pathOffset,
                verticalRadius: 100, // Additional radius for vertical curves
              }
            : {},
        };
      });
    });

    setNodes(elements);
    setEdges(lines);
  }, [wf, nodeVisibility]);

  return (
    <Box>
      <Box className={classNames.modal}>
        <Typography variant="h6">{title}</Typography>
        <List>
          {wf.map((item) => (
            <ListItem key={item.ixStatus}>
              <ListItemIcon>
                <Checkbox
                  checked={nodeVisibility[item.ixStatus]}
                  onChange={(e) => handleCheckboxChange(e, item.ixStatus)}
                />
              </ListItemIcon>
              <ListItemText primary={item.sStatus} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box className={classNames.mapContainer}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          fitViewOptions={{ maxZoom: 0.7 }}
        />
      </Box>
    </Box>
  );
};

export default WFMap;
