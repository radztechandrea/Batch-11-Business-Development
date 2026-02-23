import React from "react";
import OrganizationalChart from "./orgChart";
import employees from "./dataOrgChart.json";


const App = () => {
  return (
    <>
      <OrganizationalChart data={employees} />
    </>
  );
};

export default App;