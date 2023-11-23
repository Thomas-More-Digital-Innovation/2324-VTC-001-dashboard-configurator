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
    const graphlist = document.getElementsByClassName("ntg");
    for (let i = 1; i <= graphlist.length; i++) {
      const id = "s" + i
      NightingaleChart(parseCSV(content), id);
    }

    console.log("Graphs created successfully");
  } catch (error) {
    console.error("Error:", error);
  }
}

// XML PARSER //
async function loadXML() {
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
}

// XML DISPLAY
function displayXMLContent(xmlDoc) {
  const dashboard = xmlDoc.getElementsByTagName("dashboard")[0];
  const screens = dashboard.getElementsByTagName("screen");
  let idcount = 1;

  for (var i = 0; i < screens.length; i++) {
    let screenDiv = document.createElement("div");
    screenDiv.className = "full";

    let rows = screens[i].getElementsByTagName("row");
    for (var j = 0; j < rows.length; j++) {
      let rowDiv = document.createElement("div");
      rowDiv.className = "row";

      let graphs = rows[j].getElementsByTagName("ntgchart");
      for (var k = 0; k < graphs.length; k++) {
        var graphDiv = document.createElement("div");
        graphDiv.id = "s" + idcount;
        idcount += 1;
        graphDiv.classList.add("ntg", "fullcenter");
        rowDiv.appendChild(graphDiv);
      }

      screenDiv.appendChild(rowDiv);
    }

    document.body.appendChild(screenDiv);
  }
  console.log("Parsing Done!");
}

// CSV PARSER //
function parseCSV(content) {
  const rows = content.split("\n");
  return rows.slice(1).map((row) => {
    const [value, name] = row.replace(/\r/g, "").split(",");
    return {
      value: parseInt(value),
      name: name,
    };
  });
}


// GRAPHS //
function NightingaleChart(data, id) {
  return new Promise((resolve, reject) => {

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
      colors.push(`rgb(${newColor.join(',')})`);
    }

    const option = {
      legend: {
        top: "top",
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

// RUN //
constructPage()
  .then(() => console.log("Graph created successfully"))
  .catch((error) => console.error("Error:", error));
