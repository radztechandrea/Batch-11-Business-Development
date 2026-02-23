/**
 * @typedef {object} column
 * @property {string} field
 * @property {string} headerName
 * @property {'left'|'center'|'right'} [headerAlign]
 * @property {number} [width=100]
 * @property {boolean} [sortable]
 * @property {boolean} [hide]
 * @property {'left'|'center'|'right'} [align]
 * @property {boolean} [editable]
 * @property {(param: {row: object, id: string|number, value: string|number, field: string}) => string|number} [valueGetter]
 * @property {(param: {row: object, id: string|number, value: string|number, field: string}) => string|number} [valueFormatter]
 * @property {(param: {row: object, id: string|number, value: string|number, field: string}) => string|number} [renderCell]
 */
