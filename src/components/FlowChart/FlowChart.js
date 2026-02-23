import React from "react";
import "reactflow/dist/style.css";
import jsonData from "./DataFlowChart.json";
import WFMap from "./WFMap";

const FlowChart = () => {
  return <WFMap wf={jsonData.wf} />;
};

export default FlowChart;
