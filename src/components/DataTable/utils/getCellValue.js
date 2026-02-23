import { isFunction } from "lodash";

/**
 *
 * @template dataT
 * @param {column} col
 * @param {dataT} row
 * @param {string|number} id
 * @param {string|number} value
 * @param {string} field
 */
function getCellValue(col, row, id, value, field) {
  let parsedVal = value;

  if (col.hasOwnProperty("valueGetter") && isFunction(col.valueGetter))
    parsedVal = col.valueGetter({ row, id, value, field });

  if (col.hasOwnProperty("valueFormatter") && isFunction(col.valueFormatter))
    parsedVal = col.valueFormatter({ row, id, value: parsedVal, field });

  if (col.hasOwnProperty("renderCell") && isFunction(col.renderCell))
    parsedVal = col.renderCell({ row, id, value: parsedVal, field });

  return parsedVal;
}

export default getCellValue;
