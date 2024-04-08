function ScatterPlotCsvParser(content, targetColumn, timeColumn) {
  // Split the CSV content into rows
  const rows = content.trim().split('\n');
  
  // Find the index of the targetColumn and timeColumn
  const headers = rows.shift().split(',');
  const targetIndex = headers.indexOf(targetColumn);
  const timeIndex = headers.indexOf(timeColumn);
  
  // Initialize arrays to store target and time values
  const targetValues = [];
  const timeValues = [];
  
  // Iterate through each row
  rows.forEach(row => {
      // Split the row into individual values
      const values = row.split(',');
      
      // Extract target and time values from the row
      const targetValue = parseFloat(values[targetIndex].replace(',', '.'));
      const timeValue = parseFloat(values[timeIndex].replace(',', '.'));
      
      // Add the values to the arrays
      targetValues.push(targetValue);
      timeValues.push(timeValue);
  });
  
  // Return an array containing the target and time arrays
  return [targetValues, timeValues];
}

const csvContent = `
Time,Value
1,2
2,3
3,4
4,5
`;

const [targetValues, timeValues] = ScatterPlotCsvParser(csvContent, 'Value', 'Time');
console.log(targetValues); // Output: [2, 3, 4, 5]
console.log(timeValues);   // Output: [1, 2, 3, 4]
