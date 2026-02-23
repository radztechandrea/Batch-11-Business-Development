import React from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const styles = {
  expandBtn: {
    width: "50px",
    height: "10px",
    color: "#600060",
    backgroundColor: "#fef9ef",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #d3d3d3",
    borderRadius: "10px",
    marginTop: "25px"
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};


const CustomExpandButton = (node) => {
  return (
    <>
      {node && (
        <div style={{...styles.expandBtn}}>
          <span>{node.data._directSubordinates}</span>
          <span style={styles.flex}>
            {node.children ? <FaAngleDown /> : <FaAngleUp />}
          </span>
        </div>
      )}
    </>
  );
};

export default CustomExpandButton;
