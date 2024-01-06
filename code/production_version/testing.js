function extractColumns(csvData, targetColumnsString) {
  const rows = csvData.split("\n");
  const headers = rows[0].split(";");

  const targetColumnsArray = targetColumnsString.split(",");
  const extractedColumns = [];

  const valuesArray = [];
  let columnsArray = [];

  targetColumnsArray.forEach((targetColumn) => {
    if (headers.includes(targetColumn)) {
      const columnIndex = headers.indexOf(targetColumn);
      const columnValues = [];

      for (let i = 1; i < rows.length; i++) {
        const rowValues = rows[i].split(";");
        const value = rowValues[columnIndex].replace(",", "."); // Replace comma with dot
        const multipliedValue = parseFloat(value) * 100;
        const intValue = Math.round(multipliedValue); // Remove decimal places after multiplication
        columnValues.push(intValue);
      }

      const uniqueValues = [...new Set(columnValues)];
      const columnEntry = [];

      uniqueValues.forEach((value) => {
        const occurrences = columnValues.filter((val) => val === value).length;
        const index = targetColumnsArray.indexOf(targetColumn);
        columnEntry.push([index, value, occurrences]);
      });

      const sortedValues = columnEntry.sort((a, b) => a[1] - b[1]);

      valuesArray.push(...sortedValues);
      columnsArray.push(targetColumn);
    }
  });

  extractedColumns.push(columnsArray);
  extractedColumns.push(valuesArray);

  return extractedColumns;
}

// Example CSV data (replace this with your actual CSV data)
const csvFileData = `Column1;Column2;Column3;Column4
0.8956;0,3541;0,5987;0.4444
0.2345;0,7555;0,1123;0.9444
0.6677;0,0987;0,7823;0.2712
0.5112;0,3171;0,8866;0.7277`;

// Example target columns
const targetColumns = "Column2,Column3";

const extractedColumns = extractColumns(csvFileData, targetColumns);
console.log(extractedColumns);
