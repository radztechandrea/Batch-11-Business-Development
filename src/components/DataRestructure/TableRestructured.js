import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableContainer,
  TableRow as MuiTableRow,
  withStyles,
  IconButton,
  TablePagination,
  makeStyles,
  Button,
} from "@material-ui/core";
import numeral from "numeral";
import {
  Group,
  KeyboardArrowDown,
  KeyboardArrowRight,
} from "@material-ui/icons";
numeral.nullFormat("-");
numeral.zeroFormat("-");

const TableCell = withStyles((theme) => ({
  root: {
    padding: "0.8em 0.8em",
    borderBottom: "none",
  },
}))(MuiTableCell);

const TableRow = withStyles((theme) => ({
  root: {
    "&:nth-child(even)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(MuiTableRow);

const useStyles = makeStyles({
  tableHeader: {
    textAlign: "center",
    fontWeight: "bold",
  },
  tableCell: {
    textAlign: "center",
  },
  tableCellNumeric: {
    textAlign: "center",
  },
  tableCellHeader: {
    fontWeight: 700,
    backgroundColor: "#FF7704",
  },
  subAcc1Bg: {
    fontWeight: "bold",
  },
  subAcc2Bg: {
    fontWeight: "bold",
  },
  SubTotalCells: {
    backgroundColor: "#ddd",
    textAlign: "center",
    borderBottom: "3px double black",
    borderTop: "1px solid black",
    fontWeight: "bold",
  },
  TotalCells: {
    backgroundColor: "#FFF6EE",
    textAlign: "center",
    borderBottom: "3px double black",
    borderTop: "1px solid black",
    fontWeight: "bold",
  },
  GrandTotalCells: {
    backgroundColor: "#FF7704",
    textAlign: "center",
    borderBottom: "3px double black",
    borderTop: "1px solid black",
    fontWeight: "bold",
  },
  rowOdd: {
    backgroundColor: "#333",
  },
  tableContainer: {},
  headerFixed: {
    width: "150px",
  },
});

const TableResult = ({ data, columns }) => {
  const hasBranchColumn = data.some((item) => item.ixSub3);
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const toggleGroup = (groupName) => {
    setCollapsedGroups((prevCollapsedGroups) => ({
      ...prevCollapsedGroups,
      [groupName]: !prevCollapsedGroups[groupName],
    }));
  };

  const groupedData = data.reduce((acc, item) => {
    const ixSub1 = item.ixSub1;
    const ixSub2 = item.ixSub2;
    const sSub1 = item.sSub1;
    const sSub2 = item.sSub2;

    if (!acc[ixSub1]) {
      acc[ixSub1] = { sSub1, subGroups: {} };
    }
    if (!acc[ixSub1].subGroups[ixSub2]) {
      acc[ixSub1].subGroups[ixSub2] = { sSub2, items: [] };
    }

    acc[ixSub1].subGroups[ixSub2].items.push(item);
    return acc;
  }, {});

  const SubTotals = {};
  const GrandTotals = {};
  const GroupTotals = {};

  Object.entries(groupedData).forEach(([ixSub1, { subGroups }]) => {
    GroupTotals[ixSub1] = { tBeg: 0, tDr: 0, tCr: 0, tEnd: 0 };
    Object.entries(subGroups).forEach(([ixSub2, { items }]) => {
      items.forEach((item) => {
        GroupTotals[ixSub1].tBeg += item.tBeg;
        GroupTotals[ixSub1].tDr += item.tDr;
        GroupTotals[ixSub1].tCr += item.tCr;
        GroupTotals[ixSub1].tEnd += item.tEnd;
      });
    });
  });

  Object.entries(groupedData).forEach(([ixSub1, { subGroups }]) => {
    SubTotals[ixSub1] = {};
    Object.entries(subGroups).forEach(([ixSub2, { items }]) => {
      SubTotals[ixSub1][ixSub2] = items.reduce(
        (subtotal, item) => {
          subtotal.tBeg += item.tBeg;
          subtotal.tDr += item.tDr;
          subtotal.tCr += item.tCr;
          subtotal.tEnd += item.tEnd;
          return subtotal;
        },
        { tBeg: 0, tDr: 0, tCr: 0, tEnd: 0 }
      );
    });

    Object.values(SubTotals[ixSub1]).forEach((subtotal) => {
      GrandTotals.tBeg += subtotal.tBeg;
      GrandTotals.tDr += subtotal.tDr;
      GrandTotals.tCr += subtotal.tCr;
      GrandTotals.tEnd += subtotal.tEnd;
    });
  });

  const groupKeys = Object.keys(groupedData);
  const paginatedGroupKeys = groupKeys.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const classes = useStyles();
  return (
    <div>
      <TableContainer className={classes.tableContainer} id="TableContainer">
        <Table>
          <TableBody>
            {paginatedGroupKeys.map((ixSub1, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell className={classes.tableCellHeader}>
                    {columns.sSubType1}
                  </TableCell>
                  <TableCell className={classes.tableCellHeader}>
                    {columns.sSubType2}
                  </TableCell>
                  {hasBranchColumn && (
                    <TableCell className={classes.tableCellHeader}>
                      {columns.sSubType3}
                    </TableCell>
                  )}
                  <TableCell
                    className={`${classes.tableCellNumeric} ${classes.tableCellHeader} ${classes.headerFixed}`}
                  >
                    {columns.tBegType}
                  </TableCell>
                  <TableCell
                    className={`${classes.tableCellNumeric} ${classes.tableCellHeader} ${classes.headerFixed}`}
                  >
                    {columns.tDrType}
                  </TableCell>
                  <TableCell
                    className={`${classes.tableCellNumeric} ${classes.tableCellHeader} ${classes.headerFixed}`}
                  >
                    {columns.tCrType}
                  </TableCell>
                  <TableCell
                    className={`${classes.tableCellNumeric} ${classes.tableCellHeader} ${classes.headerFixed}`}
                  >
                    {columns.tEndType}
                  </TableCell>
                </TableRow>
                <TableRow
                  onClick={() => toggleGroup(ixSub1)}
                  aria-label="expand row"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <TableCell className={classes.subAcc1Bg} colSpan={7}>
                    <IconButton size="small">
                      {collapsedGroups[ixSub1] ? (
                        <KeyboardArrowRight />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </IconButton>
                    {groupedData[ixSub1].sSub1}
                  </TableCell>
                </TableRow>

                {!collapsedGroups[ixSub1] && (
                  <>
                    {Object.entries(groupedData[ixSub1].subGroups).map(
                      ([ixSub2, { sSub2, items }], sSub2Index) => (
                        <React.Fragment key={sSub2Index}>
                          <TableRow
                            style={
                              hasBranchColumn ? { cursor: "pointer" } : null
                            }
                            onClick={() =>
                              hasBranchColumn
                                ? toggleGroup(ixSub1 + ixSub2)
                                : null
                            }
                            aria-label="expand row"
                          >
                            <TableCell className={classes.subAcc1Bg}>
                              {hasBranchColumn && (
                                <IconButton size="small">
                                  {collapsedGroups[ixSub1 + ixSub2] ? (
                                    <KeyboardArrowRight />
                                  ) : (
                                    <KeyboardArrowDown />
                                  )}
                                </IconButton>
                              )}
                            </TableCell>
                            <TableCell
                              colSpan={hasBranchColumn ? 6 : null}
                              className={
                                hasBranchColumn ? classes.subAcc2Bg : null
                              }
                            >
                              <span className={classes.tableCell}>{sSub2}</span>
                            </TableCell>
                            {!hasBranchColumn && (
                              <>
                                <TableCell style={{ textAlign: "center" }}>
                                  {numeral(
                                    SubTotals[ixSub1][ixSub2].tBeg
                                  ).format("0,0.00")}
                                </TableCell>
                                <TableCell style={{ textAlign: "center" }}>
                                  {numeral(
                                    SubTotals[ixSub1][ixSub2].tDr
                                  ).format("0,0.00")}
                                </TableCell>
                                <TableCell style={{ textAlign: "center" }}>
                                  {numeral(
                                    SubTotals[ixSub1][ixSub2].tCr
                                  ).format("0,0.00")}
                                </TableCell>
                                <TableCell style={{ textAlign: "center" }}>
                                  {numeral(
                                    SubTotals[ixSub1][ixSub2].tEnd
                                  ).format("0,0.00")}
                                </TableCell>
                              </>
                            )}
                          </TableRow>
                          {(hasBranchColumn
                            ? !collapsedGroups[ixSub1 + ixSub2]
                            : collapsedGroups[ixSub1 + ixSub2]) && (
                            <>
                              {items.map((item, itemIndex) => (
                                <TableRow key={itemIndex}>
                                  <TableCell></TableCell>
                                  {hasBranchColumn && <TableCell></TableCell>}
                                  <TableCell>{item.sSub3}</TableCell>
                                  <TableCell className={classes.tableCell}>
                                    {numeral(item.tBeg).format("0,0.00")}
                                  </TableCell>
                                  <TableCell className={classes.tableCell}>
                                    {numeral(item.tDr).format("0,0.00")}
                                  </TableCell>
                                  <TableCell className={classes.tableCell}>
                                    {numeral(item.tCr).format("0,0.00")}
                                  </TableCell>
                                  <TableCell className={classes.tableCell}>
                                    {numeral(item.tEnd).format("0,0.00")}
                                  </TableCell>
                                </TableRow>
                              ))}
                              {hasBranchColumn && (
                                <TableRow>
                                  <TableCell
                                    style={{
                                      textAlign: "Right",
                                      fontWeight: "bold",
                                    }}
                                    colSpan={hasBranchColumn ? 3 : 2}
                                  >
                                    Sub-Total:
                                    {
                                      groupedData[ixSub1].subGroups[ixSub2]
                                        .sSub2
                                    }
                                  </TableCell>
                                  <TableCell className={classes.SubTotalCells}>
                                    {numeral(
                                      SubTotals[ixSub1][ixSub2].tBeg
                                    ).format("0,0.00")}
                                    {console.log(SubTotals[ixSub1])}
                                  </TableCell>
                                  <TableCell className={classes.SubTotalCells}>
                                    {numeral(
                                      SubTotals[ixSub1][ixSub2].tDr
                                    ).format("0,0.00")}
                                  </TableCell>
                                  <TableCell className={classes.SubTotalCells}>
                                    {numeral(
                                      SubTotals[ixSub1][ixSub2].tCr
                                    ).format("0,0.00")}
                                  </TableCell>
                                  <TableCell className={classes.SubTotalCells}>
                                    {numeral(
                                      SubTotals[ixSub1][ixSub2].tEnd
                                    ).format("0,0.00")}
                                  </TableCell>
                                </TableRow>
                              )}
                              <TableRow>
                                <TableCell
                                  style={{ height: "20px" }}
                                  colSpan={hasBranchColumn ? 7 : 6}
                                ></TableCell>
                              </TableRow>
                            </>
                          )}
                        </React.Fragment>
                      )
                    )}
                    <TableRow>
                      <TableCell
                        colSpan={hasBranchColumn ? 3 : 2}
                        style={{ textAlign: "right", fontWeight: "bold" }}
                      >
                        Total: {groupedData[ixSub1].sSub1}
                      </TableCell>
                      <TableCell className={classes.TotalCells}>
                        {numeral(GroupTotals[ixSub1].tBeg).format("0,0.00")}
                      </TableCell>
                      <TableCell className={classes.TotalCells}>
                        {numeral(GroupTotals[ixSub1].tDr).format("0,0.00")}
                      </TableCell>
                      <TableCell className={classes.TotalCells}>
                        {numeral(GroupTotals[ixSub1].tCr).format("0,0.00")}
                      </TableCell>
                      <TableCell className={classes.TotalCells}>
                        {numeral(GroupTotals[ixSub1].tEnd).format("0,0.00")}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{ height: "20px" }}
                        colSpan={hasBranchColumn ? 7 : 6}
                      ></TableCell>
                    </TableRow>
                  </>
                )}
              </React.Fragment>
            ))}

            <TableRow>
              <TableCell
                colSpan={hasBranchColumn ? 3 : 2}
                style={{ textAlign: "right", fontWeight: "bold" }}
              >
                Grand Total:
              </TableCell>
              <TableCell className={classes.GrandTotalCells}>
                {numeral(GrandTotals.tBeg).format("0,0.00")}
              </TableCell>
              <TableCell className={classes.GrandTotalCells}>
                {numeral(GrandTotals.tDr).format("0,0.00")}
              </TableCell>
              <TableCell className={classes.GrandTotalCells}>
                {numeral(GrandTotals.tCr).format("0,0.00")}
              </TableCell>
              <TableCell className={classes.GrandTotalCells}>
                {numeral(GrandTotals.tEnd).format("0,0.00")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={{ height: "20px" }}
                colSpan={hasBranchColumn ? 7 : 6}
              ></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={groupKeys.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default TableResult;
