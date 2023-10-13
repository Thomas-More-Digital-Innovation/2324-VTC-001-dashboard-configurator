const fs = require("fs");
const csv = require("csv-parser");

function countUniqueColumnValues(filePath, columnName, columnCounts, callback) {
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

      //   console.log(uniqueValueCounts);
      //   console.log("Feelings array:", feelings);
      //   console.log("Amount array:", amount);

      callback(amount);
    });
}

const filePath = "./dataset_dd.csv";
const columnName = "M3Gevoel_Clustered";
const columnCounts = {};

countUniqueColumnValues(filePath, columnName, columnCounts, (result) => {
  const data = result;
  console.log(data);
});

