function parse(data, type) {
  if (type === 'double') {
    return parseFloat(data.replace(/[^a-zA-Z0-9.-]/g, ''));
  } else if (type === 'int') {
    return parseInt(data.replace(/[^a-zA-Z0-9.-]/g, ''));
  } else {
    return data;
  }
}

const parseData = (data, columns) =>
  columns.map(({ start, end, type }) =>
    parse(data.substring(start, end).trim(), type)
  );

const removeNewLines = (text) => text.replace(/(\r\n|\n|\r)/gm, "");

const processData = (lines, settings) => {
  const items = [];
  for (let i = settings.starting_line + 1; i < lines.length; i++) {
    const line = lines[i];
    const dataWithNoNewLine = removeNewLines(line);
    const parsedRow = parseData(dataWithNoNewLine, settings.columns);

    if (settings.hasOwnProperty('ends_when')) {
      if (settings.ends_when.col_value.includes(parsedRow[settings.ends_when.col_num])) {
        break;
      }
    }

    items.push(parsedRow);
  }
  return { items };
};

export function parseText(lines) {
  const settings = {
    starting_line: 13,
    ends_when: {
      col_num: 0,
      col_value: ["", "Grand", "Branch"]
    },
    columns: [
      { start: 0, end: 23 },
      { start: 23, end: 56 },
      { start: 56, end: 62 },
      { start: 62, end: 68, type: "int" },
      { start: 68, end: 78, type: "double" },
      { start: 78, end: 90, type: "double" },
      { start: 90, end: 98, type: "double" },
      { start: 98, end: 109, type: "double" },
      { start: 109, end: 121, type: "double" },
      { start: 121, end: 127, type: "double" },
      { start: 127, end: 139, type: "double" },
      { start: 139, end: 149, type: "double" }
    ]
  };

  const { items } = processData(lines, settings);
  const processedData = items.map(row => row.slice(0, 1)).flat();
  const processed = items.map(row => row.slice(0, 2));

  return { processedData, processed };
}
