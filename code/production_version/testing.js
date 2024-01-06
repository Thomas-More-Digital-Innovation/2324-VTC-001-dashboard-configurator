function ProcessTimeAndTargetCSV(csvData) {
  const rows = csvData.split("\n");
  const headers = rows[0].split(";").map((header) => header.trim());
  const timeColumn = headers.indexOf("time");
  const targetColumn = headers.indexOf("target");

  const data = {};

  rows.slice(1).forEach((row) => {
    const columns = row.split(";");
    const time = columns[timeColumn];
    const target = columns[targetColumn];

    if (!data[target]) {
      data[target] = {};
    }

    if (!data[target].value) {
      data[target].value = [];
    }

    data[target].value.push(time);
  });

  const times = Array.from(
    new Set(rows.slice(1).map((row) => row.split(";")[timeColumn]))
  );
  const uniqueTargets = Object.keys(data);
  const result = [times.map(time => ({ name: time })), []];
  uniqueTargets.forEach((target) => {
    const valueArr = times.map(
      (time) => data[target].value.filter((val) => val === time).length
    );
    result[1].push({ value: valueArr, name: target });
  });

  return result;
}

const csvData = `time;target
2020;a
2021;a
2022;b
2020;a
2021;c
2022;a
2020;b
2021;a
2022;c`;

const result = ProcessTimeAndTargetCSV(csvData, "time", "target");
console.log(result);
