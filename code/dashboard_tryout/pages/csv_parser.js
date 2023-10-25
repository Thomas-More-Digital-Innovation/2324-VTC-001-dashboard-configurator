const fs = require("fs");
const csv = require("csv-parser");

async function countUniqueColumnValues(filePath, columnName) {
  return new Promise((resolve, reject) => {
    const columnCounts = {};
    const feelings = [];
    const amount = [];

    fs.createReadStream(filePath)
      .pipe(csv({ separator: ";" }))
      .on("data", (row) => {
        if (columnName in row) {
          const columnValue = row[columnName].toString();

          // Count occurrences of each unique value
          if (columnCounts[columnValue]) {
            columnCounts[columnValue]++;
          } else {
            columnCounts[columnValue] = 1;
          }
        }
      })
      .on("end", () => {
        // Create an array of objects with unique values and counts
        const uniqueValueCounts = [];
        for (const value in columnCounts) {
          uniqueValueCounts.push({ value, count: columnCounts[value] });
          feelings.push(value); // Extract values into the "feelings" array
          amount.push(columnCounts[value]); // Extract counts into the "amount" array
        }

        // Resolve the promise with the "amount" array
        resolve(amount);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

countUniqueColumnValues("./dataset_dd.csv", "JAAR")
  .then((result) => {
    console.log(result); // This will now return true
  })
  .catch((error) => {
    console.error(error);
  });
