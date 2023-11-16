async function readCSV(csvFilePath) {
    try {
        const response = await fetch(csvFilePath);
        const csvData = await response.text();
        const rows = csvData.split('\n');
        const data = [];

        // Extracting headers and removing whitespace
        const headers = rows[0].split(',').map(header => header.trim());

        for (let i = 1; i < rows.length; i++) {
            const columns = rows[i].split(',');
            const values = columns.map(value => value.trim());

            // Creating an object with 'value' and 'name' keys
            const rowData = {};
            headers.forEach((header_1, index) => {
                rowData[header_1] = values[index];
            });

            data.push(rowData);
        }
        return data;
    } catch (error) {
        console.error('Error fetching or processing CSV:', error);
        return null;
    }
  }

const path = './data.csv'
console.log(path)
readCSV(path)