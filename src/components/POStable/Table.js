import React from "react";
import data from "./DataJson.json";

const POSTable = () => {
  // Get all unique ixJCd values
  const uniqueIxJCds = Array.from(
    new Set(data.map((item) => item.ixJCd)),
  ).sort();

  // Merge rows with the same product code and branch code
  const mergedData = data.reduce((acc, item) => {
    const key = `${item.ixProd}-${item.ixBrch}`;
    if (!acc[key]) {
      acc[key] = { ...item, totIN: 0, totOUT: 0 };
    }
    acc[key].totIN += item.totIN;
    acc[key].totOUT += item.totOUT;
    return acc;
  }, {});

  // Sort merged data by branch code and then by product code
  const sortedMergedData = Object.values(mergedData).sort((a, b) => {
    if (a.ixBrch < b.ixBrch) return -1;
    if (a.ixBrch > b.ixBrch) return 1;
    if (a.ixProd < b.ixProd) return -1;
    if (a.ixProd > b.ixProd) return 1;
    return 0;
  });

  return (
    <div>
      <style>{`
        .po-table-container {
          max-height: 85vh;
          overflow-y: auto;
        }
        
        .po-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 15px;
          font-family: 'Arial', sans-serif;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
          position: relative;
        }
        
        .po-table thead tr,
        .po-table tfoot tr {
          background-color: #FF7704;
          color: #ffffff;
          text-align: left;
          font-size: 10px;
          font-weight: bold;
          text-transform: uppercase;
          position: sticky;
          z-index: 1;
        }
        
        .po-table thead tr {
          top: 0;
        }
        
        .po-table tfoot tr {
          bottom: 0;
        }
        
        .po-table th, .po-table td {
          padding: 3px 10px;
        }
        
        .po-table th.common, .po-table td.common {
          width: 10%;
        }
        
        .po-table th.ixJCd, .po-table td.ixJCd {
          width: calc(10% / ${uniqueIxJCds.length});
        }
        
        .po-table tbody tr {
          border-bottom: 1px solid #dddddd;
        }
        
        .po-table tbody tr:nth-of-type(even) {
          background-color: #f3f3f3;
        }
        
        .po-table tbody tr:hover {
          background-color: #f1f1f1;
          cursor: pointer;
        }
        
        .branch-row {
          background-color: #e1e1e1;
          font-weight: bold;
        }
      `}</style>

      <div className="po-table-container">
        <table className="po-table">
          <thead>
            <tr>
              <th className="common">Product Code</th>
              <th className="common">Branch Code</th>
              <th className="common">Description</th>
              <th className="common">Category</th>
              <th className="common">Sub Category</th>
              {uniqueIxJCds.map((ixJCd, index) => (
                <React.Fragment key={index}>
                  <th className="ixJCd">{ixJCd}</th>
                </React.Fragment>
              ))}
            </tr>
          </thead>

          <tbody>
            {sortedMergedData.map((item, index) => (
              <tr key={index}>
                <td className="common">{item.ixProd}</td>
                <td className="common">{item.ixBrch}</td>
                <td className="common">{item.sJCd}</td>
                <td className="common">{item.sProdCat}</td>
                <td className="common">{item.sProdCatSub}</td>
                {uniqueIxJCds.map((ixJCd, subIndex) => (
                  <React.Fragment key={subIndex}>
                    <td className="common">
                      {item.ixJCd === ixJCd ? item.totIN : "-"}
                    </td>
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default POSTable;
