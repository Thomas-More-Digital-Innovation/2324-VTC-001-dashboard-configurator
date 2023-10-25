import { createReadStream } from "fs";
import csv from "csv-parser";

function countUniqueValuesInColumn(filePath, headerName, callback) {
  const uniqueValues = new Map(); // To store unique values and their counts

  createReadStream(filePath)
    .pipe(csv({ separator: ";" }))
    .on("data", (row) => {
      // Extract the value from the specified header
      const columnValue = row[headerName];

      if (columnValue) {
        if (uniqueValues.has(columnValue)) {
          // Increment the count for an existing value
          uniqueValues.set(columnValue, uniqueValues.get(columnValue) + 1);
        } else {
          // Initialize the count for a new value
          uniqueValues.set(columnValue, 1);
        }
      }
    })
    .on("end", () => {
      const countsArray = Array.from(uniqueValues.values());

      callback(null, countsArray);
    })
    .on("error", (error) => {
      callback(error, null);
    });
}



