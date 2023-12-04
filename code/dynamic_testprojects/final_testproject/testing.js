function insertIntegerInOrder(arr, newName, newInt) {
  const newObj = { name: newName, int: newInt };

  if (arr.length === 0) {
    arr.push(newObj);
  } else {
    let index = 0;
    while (index < arr.length && newInt > arr[index].int) {
      index++;
    }
    arr.splice(index, 0, newObj);
  }
  return arr.map((item) => item.name); // Return only the names after sorting
}

function SingleNightingaleChartCsvParser(content, targetColumn, sortArray) {
  const rows = content.split("\n");
  const headers = rows[0].split(";");

  const columnIndex = headers.indexOf(targetColumn);
  if (columnIndex === -1) {
    throw new Error(`Column '${targetColumn}' not found`);
  }

  const columnValues = rows.slice(1).map((row) => {
    const values = row.replace(/\r/g, "").split(";");
    return values[columnIndex];
  });

  const uniqueElements = [...new Set(columnValues)]; // Get unique elements from the column

  const uniqueOccurrences = uniqueElements.map((element) => {
    const occurrences = columnValues.filter(
      (value) => value === element
    ).length;
    return {
      name: element,
      value: occurrences,
    };
  });

  // Sort the uniqueOccurrences based on the provided sortArray
  const sortedOccurrences = sortArray.map((element) => {
    const foundElement = uniqueOccurrences.find((obj) => obj.name === element);
    return foundElement ? foundElement : { name: element, value: 0 };
  });

  return sortedOccurrences;
}
