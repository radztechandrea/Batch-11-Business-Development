import { makeStyles } from "@material-ui/core";
import { TableRow, TableCell, withStyles } from "@material-ui/core";
const Row = withStyles((theme) => ({
  root: {
    "&:nth-child(even)": {
      backgroundColor: "#f5f5f5",
    },
    "&:nth-child(odd)": {
      backgroundColor: "#fff",
    },
  },
}))(TableRow);
const Cell = withStyles((theme) => ({
  root: {
    padding: "20px",
    paddingTop: "2px",
    paddingBottom: "2px",
    minHeight: "52px",
    maxHeight: "52px",
    minWidth: "50px",
    maxWidth: "50px",
    lineHeight: "40px",
    boxSizing: "border-box",
    backgroundColor: "inherit",
    borderBottom: "rgba(224, 224, 224, 1)",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}))(TableCell);
const useStyles = makeStyles((theme) => ({
  stickyCellEvenRow: {
    backgroundColor: "#f5f5f5",
  },
  stickyCellOddRow: {
    backgroundColor: "#fff",
  },
  rowHead: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    outlineStyle: "solid",
    outlineColor: "rgba(224, 224, 224, 1)",
    outlineWidth: "2px",
  },
}));

export { useStyles, Row, Cell };
