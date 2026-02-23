import React, { useState, useRef, useLayoutEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { OrgChart } from "d3-org-chart";
import CustomNodeContent from "./customNodeContent";
import CustomExpandButton from "./customExpandButton";
import EmployeeDetailsCard from "./employeeDetailsCard";

const styles = {
  orgChart: {
    height: "calc(100vh)",
    backgroundColor: "#000",
  },
};
 
const OrganizationalChart = (props) => {
  const d3Container = useRef(null);
  const chartRef = useRef(null); // Use useRef to store the chart instance
  const [cardShow, setCardShow] = useState(true);
  const [employeeId, setEmployeeId] = useState(null);

  const handleShow = () => setCardShow(true);
  const handleClose = () => setCardShow(false);

  const toggleDetailsCard = (nodeId) => {
    setEmployeeId(nodeId);
    handleShow();
  };

  useLayoutEffect(() => {
    if (props.data && d3Container.current) {
      if (!chartRef.current) {
        chartRef.current = new OrgChart();
      }
  
      const chart = chartRef.current;
  
      chart
        .container(d3Container.current)
        .data(props.data)
        .nodeWidth((d) => 400)
        .layout("top")
        .compact(true)
        .nodeHeight((d) => 150)
        .compactMarginBetween((d) => 80)

        .onNodeClick((node) => {
          toggleDetailsCard(node.id); // Ensure correct node ID is passed
        })
        .buttonContent((node) => {
          return ReactDOMServer.renderToStaticMarkup(
            <CustomExpandButton {...node.node} />
          );
        })
        .nodeContent((d) => {
          const contentStyle = {
            margin: "10px",
          };
  
          return ReactDOMServer.renderToStaticMarkup(
            <div style={contentStyle}>
              <CustomNodeContent {...d} />
            </div>
          );
        })
        
        .render();
  
      // Adjust connection line weights and color
      d3Container.current
        .querySelectorAll(".link")
        .forEach((link) => {
          link.style.stroke = "red"; // Change color to red
          link.style.strokeWidth = "3px"; // Adjust the width as needed
        });
    }
  }, [props.data]);
  

  return (
    <div style={styles.orgChart} ref={d3Container}>
      {cardShow && employeeId !== null && (
        <EmployeeDetailsCard
          employees={props.data}
          employee={props.data.find((employee) => employee.id === employeeId)}
          handleClose={handleClose}  
             
        />
      )}
    </div>
  );
};

export default OrganizationalChart;
