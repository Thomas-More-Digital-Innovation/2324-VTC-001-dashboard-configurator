// CONSTRUCTOR //
async function constructPage() {
  try {
    loadXML();
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    const fileChangeEvent = new Promise((resolve, reject) => {
      fileInput.addEventListener("change", resolve);
    });

    document.body.appendChild(fileInput);
    await fileChangeEvent;

    const file = fileInput.files[0];
    const reader = new FileReader();

    const readerPromise = new Promise((resolve, reject) => {
      reader.onload = resolve;
      reader.onerror = reject;
    });

    reader.readAsText(file);
    const event = await readerPromise;

    // Part 1: Read the file and parse data
    const content = event.target.result;
    const graphlist = document.getElementsByClassName("graph");
    for (let i = 1; i <= graphlist.length; i++) {
      const currentGraphId = graphlist[i - 1].getAttribute("id");
      const currentGraphType =
        graphsAttributeList[parseInt(currentGraphId)].type;

      if (currentGraphType == "ntgchart") {
        const currentGraphTitle =
          graphsAttributeList[parseInt(currentGraphId)].title;
        const currentGraphSubTitle =
          graphsAttributeList[parseInt(currentGraphId)].subtitle;
        const currentGraphDataColumn =
          graphsAttributeList[parseInt(currentGraphId)].dataColumn;
        SingleNightingaleChart(
          currentGraphId,
          currentGraphTitle,
          currentGraphSubTitle,
          SingleNightingaleChartCsvParser(content, currentGraphDataColumn)
        );
      } else {
        const currentGraphTitle =
          graphsAttributeList[parseInt(currentGraphId)].title;
        const currentGraphSubTitle =
          graphsAttributeList[parseInt(currentGraphId)].subtitle;
        const currentGraphTimeColumn =
          graphsAttributeList[parseInt(currentGraphId)].timeColumn;
        const currentGraphTargetColumn =
          graphsAttributeList[parseInt(currentGraphId)].targetColumn;
        MultipleNightingaleChart(
          currentGraphId,
          currentGraphTitle,
          currentGraphSubTitle,
          MulitpleNightingaleChartCsvParser(
            content,
            currentGraphTimeColumn,
            currentGraphTargetColumn
          )
        );
      }
    }

    console.log("Graphs created successfully");
  } catch (error) {
    console.error("Error:", error);
  }
}

// XML PARSING
let graphsAttributeList = [];
function displayXMLContent(xmlDoc) {
  const dashboard = xmlDoc.getElementsByTagName("dashboard")[0];
  let graphId = 0;

  let screens = dashboard.getElementsByTagName("screen");
  for (var i = 0; i < screens.length; i++) {
    let screenDiv = document.createElement("div");
    screenDiv.className = "screen";

    let rows = screens[i].getElementsByTagName("row");
    for (var j = 0; j < rows.length; j++) {
      let rowDiv = document.createElement("div");
      rowDiv.className = "row";

      let sections = rows[j].getElementsByTagName("section");
      for (var k = 0; k < sections.length; k++) {
        var sectionDiv = document.createElement("div");
        sectionDiv.className =
          "section-" + divisionToPercentage(sections[k].getAttribute("width"));

        let graphs = sections[k].getElementsByTagName("chart");
        for (var l = 0; l < graphs.length; l++) {
          var graphDiv = document.createElement("div");
          graphDiv.id = graphId;
          graphId += 1;
          graphDiv.classList.add("graph");
          if (graphs[l].getAttribute("type") == "ntgchart") {
            graphsAttributeList.push({
              type: graphs[l].getAttribute("type"),
              title: graphs[l].getAttribute("title"),
              subtitle: graphs[l].getAttribute("subtitle"),
              dataColumn: graphs[l].getAttribute("dataColumn"),
            });
          } else {
            graphsAttributeList.push({
              type: graphs[l].getAttribute("type"),
              title: graphs[l].getAttribute("title"),
              subtitle: graphs[l].getAttribute("subtitle"),
              timeColumn: graphs[l].getAttribute("timeColumn"),
              targetColumn: graphs[l].getAttribute("targetColumn"),
            });
          }

          sectionDiv.appendChild(graphDiv);
        }

        rowDiv.appendChild(sectionDiv);
      }

      screenDiv.appendChild(rowDiv);
    }

    document.body.appendChild(screenDiv);
  }
  console.log("Parsing Done!");
}

// XML LOADING
function loadXML() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "config.xml", true);
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var xmlDoc = xmlhttp.responseXML;
      let x = displayXMLContent(xmlDoc); //return object/list with parsed element data to be used as chart parameters
    }
  };
  xmlhttp.send();
  console.log("Reading Done!");
  console.log(graphsAttributeList);
}

// === CSV PARSERS === //
function SingleNightingaleChartCsvParser(content, columnName) {
  const rows = content.split("\n");
  const headers = rows[0].split(";");

  const columnIndex = headers.indexOf(columnName);
  if (columnIndex === -1) {
    throw new Error(`Column '${columnName}' not found`);
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

  return uniqueOccurrences;
}

function MulitpleNightingaleChartCsvParser(
  content,
  timeColumnName,
  targetColumnName
) {
  const rows = content.split("\n");
  const headers = rows[0].split(";");

  const timeColumnIndex = headers.indexOf(timeColumnName);
  const targetColumnIndex = headers.indexOf(targetColumnName);

  if (timeColumnIndex === -1 || targetColumnIndex === -1) {
    throw new Error(`One or both columns not found`);
  }

  const rowData = rows.slice(1).map((row) => {
    const values = row.replace(/\r/g, "").split(";");
    return { time: values[timeColumnIndex], target: values[targetColumnIndex] };
  });

  const timeBasedData = {};

  rowData.forEach(({ time, target }) => {
    if (!timeBasedData[time]) {
      timeBasedData[time] = {};
    }

    if (!timeBasedData[time][target]) {
      timeBasedData[time][target] = 0;
    }

    timeBasedData[time][target]++;
  });

  const uniqueOccurrences = Object.entries(timeBasedData).map(
    ([timeKey, targets]) => ({
      time: parseInt(timeKey),
      data: Object.entries(targets).map(([name, value]) => ({ value, name })),
    })
  );
  console.log(uniqueOccurrences);
  return uniqueOccurrences;
}

// === CHART CREATIONS === //

// SingleNightingaleChart - Create a nightingale chart that takes a single column as data input//
function SingleNightingaleChart(id, title, subtitle, data) {
  return new Promise((resolve) => {
    let chart = echarts.init(document.getElementById(id), {
      width: "100%",
      height: "100%",
    });

    // Define the color range
    const startColor = [0, 27, 84]; // rgb(0,27,84)
    const endColor = [33, 189, 185]; // rgb(33,189,185)

    // Calculate color gradient step
    const colorCount = data.length;
    const colorStep = [
      (endColor[0] - startColor[0]) / colorCount,
      (endColor[1] - startColor[1]) / colorCount,
      (endColor[2] - startColor[2]) / colorCount,
    ];

    // Generate colors within the specified range
    const colors = [];
    for (let i = 0; i < colorCount; i++) {
      const newColor = [
        Math.round(startColor[0] + colorStep[0] * i),
        Math.round(startColor[1] + colorStep[1] * i),
        Math.round(startColor[2] + colorStep[2] * i),
      ];
      colors.push(`rgb(${newColor.join(",")})`);
    }

    const option = {
      title: {
        text: title,
        subtext: subtitle,
        left: "center",
      },
      legend: {
        top: "60px",
      },
      tooltip: {
        trigger: "item",
        formatter: "{b} : {c} ({d}%)",
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: "Nightingale Chart",
          type: "pie",
          radius: [50, 200],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 8,
          },
          data: data.map((item, index) => ({
            value: item.value,
            name: item.name,
            itemStyle: {
              color: colors[index], // Assign generated colors to each data item
            },
          })),
        },
      ],
    };

    chart.setOption(option);

    resolve();
  });
}

function MultipleNightingaleChart(id, title, subtitle, data) {
  return new Promise((resolve) => {
    let chart = echarts.init(document.getElementById(id), {
      width: "100%",
      height: "100%",
    });

    // Define the color range
    const startColor = [0, 27, 84]; // rgb(0,27,84)
    const endColor = [33, 189, 185]; // rgb(33,189,185)

    // Calculate color gradient step
    const colorCount = data.length;
    const colorStep = [
      (endColor[0] - startColor[0]) / colorCount,
      (endColor[1] - startColor[1]) / colorCount,
      (endColor[2] - startColor[2]) / colorCount,
    ];

    // Generate colors within the specified range
    const colors = [];
    for (let i = 0; i < colorCount; i++) {
      const newColor = [
        Math.round(startColor[0] + colorStep[0] * i),
        Math.round(startColor[1] + colorStep[1] * i),
        Math.round(startColor[2] + colorStep[2] * i),
      ];
      colors.push(`rgb(${newColor.join(",")})`);
    }

    let dataArray = [];
    const positionList = generatePercentages(data.length);
    for (let i = 0; i < data.length; i++) {
      dataArray.push({
        name: data[i].time,
        type: "pie",
        radius: [50, 100],
        center: [positionList[i], "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data: data[i].data.map((item, index) => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: colors[index], // Assign generated colors to each data item
          },
        })),
      });
    }

    const option = {
      title: {
        text: title,
        subtext: subtitle,
        left: "center",
      },
      legend: {
        top: "60px",
      },
      tooltip: {
        trigger: "item",
        formatter: "{b} : {c} ({d}%)",
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: dataArray,
    };

    chart.setOption(option);

    resolve();
  });
}

// === HELPER FUNCTIONS === //

// Helps with conversion for layouting sections width
function divisionToPercentage(division) {
  const [numerator, denominator] = division.split("/").map(Number);

  if (denominator === 0) {
    return "Cannot divide by zero";
  }

  const allowedPercentages = [100, 66, 50, 33, 25];
  const result = Math.floor((numerator / denominator) * 100);

  if (allowedPercentages.includes(result)) {
    return `${result}`;
  } else {
    return "0";
  }
}

// Helps with spacing graphs in multiple variants
function generatePercentages(length) {
  if (length <= 0) {
    return [];
  }

  const rangeStart = 10;
  const rangeEnd = 90;
  const totalRange = rangeEnd - rangeStart;

  if (length === 1) {
    return ["50%"]; // If length is 1, return 50%
  }

  const step = totalRange / (length - 1);
  const percentages = [];

  for (let i = 0; i < length; i++) {
    const percentage = Math.round(rangeStart + i * step);
    percentages.push(percentage.toString() + "%");
  }

  return percentages;
}

// RUN ALL //
constructPage()
  .then(() => console.log("Graph created successfully"))
  .catch((error) => console.error("Error:", error));
