function processDataWithParams(csvData, timeColumn, targetColumn) {
  const rows = csvData.split('\n').slice(1); // Split by lines, ignore header
  const data = {};

  rows.forEach(row => {
    const columns = row.split(',');
    const year = columns[timeColumn];
    const animal = columns[targetColumn];

    if (!data[year]) {
      data[year] = {}; // Create an object for each year
    }

    if (!data[year][animal]) {
      data[year][animal] = 0; // Initialize animal count for the year
    }

    data[year][animal]++; // Increment count for the animal in the year
  });

  const result = Object.entries(data).map(([year, animals]) => ({
    year: parseInt(year),
    data: Object.entries(animals).map(([name, value]) => ({ value, name }))
  }));

  return result;
}

// Example CSV data (replace this with your file read logic)
const csvData = `year,animal
2020,panda
2021,panda
2022,panda
2020,wolf
2021,wolf
2022,wolf
2020,panda
2021,panda
2022,panda`;

const processedData = processDataWithParams(csvData, 0, 1); // Specify column indices: year is at 0, animal is at 1
console.log(processedData.find(entry => entry.year === 2020)); // Get data for the year 2020
