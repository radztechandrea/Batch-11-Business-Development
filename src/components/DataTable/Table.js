import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  TableContainer as Container,
  Table as MuiTable,
  TableHead as Head,
  TableBody as Body,
  TextField,
  Paper,
  Card,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useStyles, Row, Cell } from "./hooks/useStyles";
import { getCellValue } from "./utils";
import { TblTextField } from "./components";
import { debounce, size } from "lodash";

const applySticky = (data) => {
  const lastStickyIndex = data.findIndex((item) => item.sticky);
  return lastStickyIndex === -1
    ? data
    : data.map((item, index) => ({
        ...item,
        sticky: index <= lastStickyIndex || item.sticky,
      }));
};

const Table = ({
  columns = [],
  data = [],
  rowIDKey = "id",
  totals = [],
  onCellEditCommit = () => {},
}) => {
  const classes = useStyles();

  const shownColumns = useMemo(
    () => applySticky(columns).filter((col) => !col?.hide),
    [columns]
  );

  const [tableData, setTableData] = useState(data);
  const [filteredData, setFilteredData] = useState(data);

  const [selectedCell, setSelectedCell] = useState(null);
  const [columnTotals, setColumnTotals] = useState(
    totals.reduce((acc, curr) => ({ ...acc, [curr]: 0 }), {})
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!selectedCell) return;

      const { rowId, colField } = selectedCell;
      const rowIndex = filteredData.findIndex((row) => row[rowIDKey] === rowId);
      const colIndex = shownColumns.findIndex((col) => col.field === colField);

      const keyMoves = {
        ArrowUp: () =>
          rowIndex > 0 &&
          setSelectedCell({
            rowId: filteredData[rowIndex - 1][rowIDKey],
            colField,
          }),
        ArrowDown: () =>
          rowIndex < filteredData.length - 1 &&
          setSelectedCell({
            rowId: filteredData[rowIndex + 1][rowIDKey],
            colField,
          }),
        ArrowLeft: () =>
          colIndex > 0 &&
          setSelectedCell({
            rowId,
            colField: shownColumns[colIndex - 1].field,
          }),
        ArrowRight: () =>
          colIndex < shownColumns.length - 1 &&
          setSelectedCell({
            rowId,
            colField: shownColumns[colIndex + 1].field,
          }),
        Enter: () => {
          if (!selectedCell) return;
          const inputField = document.getElementById(
            `cell-${rowId}-${colField}`
          );
          if (inputField) {
            inputField.focus();
          }
        },
      };

      keyMoves[event.key]?.();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCell, filteredData, shownColumns, rowIDKey]);

  useEffect(() => {
    const debouncedSearch = debounce((query) => {
      const searchTerms = query.trim().toLowerCase().split(" ");
      setFilteredData(
        tableData.filter((item) =>
          searchTerms.every((term) =>
            Object.values(item).some(
              (value) =>
                typeof value === "string" && value.toLowerCase().includes(term)
            )
          )
        )
      );
    }, 500);

    debouncedSearch(searchQuery);

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery, tableData]);

  const handleSearchChange = (event) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);
  };

  const handleCellDoubleClick = (rowId, colField) => {
    setSelectedCell({ rowId, colField });
  };

  const calculateColumnTotals = useCallback(
    (data) =>
      data.reduce(
        (acc, curr) => {
          totals.forEach((total) => {
            acc[total] += parseFloat(curr[total]) || 0;
          });
          return acc;
        },
        totals.reduce((acc, curr) => ({ ...acc, [curr]: 0 }), {})
      ),
    [totals]
  );

  const handleCellEdit = useCallback(
    (rowId, colField, value) => {
      const updatedData = tableData.map((row) =>
        row[rowIDKey] === rowId ? { ...row, [colField]: value } : row
      );
      setTableData(updatedData);
      setFilteredData(updatedData);
      onCellEditCommit({ id: rowId, field: colField, value });

      if (totals.includes(colField)) {
        const updatedColumnTotals = calculateColumnTotals(updatedData);
        setColumnTotals(updatedColumnTotals);
      }

      const rowIndex = filteredData.findIndex((row) => row[rowIDKey] === rowId);
      const colIndex = shownColumns.findIndex((col) => col.field === colField);

      if (rowIndex < filteredData.length - 1) {
        setSelectedCell({
          rowId: filteredData[rowIndex + 1][rowIDKey],
          colField: shownColumns[colIndex].field,
        });
      }
    },
    [
      tableData,
      rowIDKey,
      onCellEditCommit,
      calculateColumnTotals,
      totals,
      filteredData,
      shownColumns,
    ]
  );

  const cellStyles = (col, index, isSticky) => ({
    textAlign: col?.headerAlign || "left",
    minWidth: col?.width || 100,
    maxWidth: col?.width || 100,
    position: isSticky ? "sticky" : "static",
    zIndex: index === 0 ? 15 : 10,
    left: isSticky
      ? `${shownColumns
          .slice(0, index)
          .reduce((acc, col) => acc + (col.width || 300), 0)}px`
      : "auto",
  });

  return (
    <Paper elevation={8}>
      <Card
        style={{ marginTop: 10, textAlign: "left", backgroundColor: "#fff" }}
      >
        <TextField
          variant="outlined"
          label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          inputProps={{
            style: { fontSize: 12, padding: 15, width: 200 },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={{ backgroundColor: "#ededed", margin: "20px 20px 10px 20px" }}
        />
      </Card>
      <Container style={{ maxHeight: 600, width: 1230, overflow: "auto" }}>
        <MuiTable>
          <Head>
            <Row className={classes.rowHead}>
              {shownColumns.map((col, index) => (
                <Cell
                  key={col.field}
                  style={cellStyles(col, index, col.sticky)}
                >
                  {col.headerName}
                </Cell>
              ))}
            </Row>
          </Head>
          <Body>
            {filteredData.map((item, rowIndex) => (
              <Row
                key={item[rowIDKey]}
                className={rowIndex % 2 ? classes.evenRow : classes.oddRow}
              >
                {shownColumns.map((col, index) => (
                  <Cell
                    key={col.field}
                    style={cellStyles(col, index, col.sticky)}
                    onDoubleClick={() =>
                      handleCellDoubleClick(item[rowIDKey], col.field)
                    }
                  >
                    {selectedCell?.rowId === item[rowIDKey] &&
                    selectedCell.colField === col.field ? (
                      <TblTextField
                        id={`cell-${item[rowIDKey]}-${col.field}`}
                        value={item[col.field]}
                        onBlur={() => setSelectedCell(null)}
                        fullWidth
                        style={{
                          boxSizing: "border-box",
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            e.stopPropagation();
                            handleCellEdit(
                              item[rowIDKey],
                              col.field,
                              e.target.value
                            );
                          }
                        }}
                        onChange={(e) =>
                          handleCellEdit(
                            item[rowIDKey],
                            col.field,
                            e.target.value
                          )
                        }
                        variant="outlined"
                        size="small"
                      />
                    ) : (
                      getCellValue(col, item, item[rowIDKey], item[col.field])
                    )}
                  </Cell>
                ))}
              </Row>
            ))}
            {totals.length > 0 && (
              <Row
                style={{
                  position: "sticky",
                  bottom: 0,
                  zIndex: 20,
                  outline: "3px solid rgba(224, 224, 224, 1)",
                }}
              >
                {shownColumns.map((col, index) => (
                  <Cell
                    key={col.field}
                    style={cellStyles(col, index, col.sticky)}
                  >
                    {index === 0 ? "Total" : ""}
                    {totals.includes(col.field)
                      ? getCellValue(col, {}, 0, columnTotals[col.field])
                      : ""}
                  </Cell>
                ))}
              </Row>
            )}
          </Body>
        </MuiTable>
      </Container>
    </Paper>
  );
};

export default React.memo(Table);
