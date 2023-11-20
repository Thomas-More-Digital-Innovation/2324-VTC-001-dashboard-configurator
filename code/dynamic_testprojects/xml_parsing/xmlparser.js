function GenerateGraph(amount) {
  let list = [];
  let positions = ["50%", "100%", "150%"]

  for (let i = 0; i < amount; i++) {
    list.push({
      name: "Radius Mode",
      type: "pie",
      radius: [20, 140],
      center: [positions[i], "50%"],
      roseType: "radius",
      itemStyle: {
        borderRadius: 5,
      },
      label: {
        show: false,
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //   },
      // },
      data: [
        { value: 40, name: "rose 1" },
        { value: 33, name: "rose 2" },
        { value: 28, name: "rose 3" },
        { value: 22, name: "rose 4" },
        { value: 20, name: "rose 5" },
        { value: 15, name: "rose 6" },
        { value: 12, name: "rose 7" },
        { value: 10, name: "rose 8" },
      ],
    });
  }
  return list;
}

function NightingaleChart(idref, amount) {
  var chart = echarts.init(document.getElementById(idref), {
    width: "100%",
    height: "100%",
  });

  chart.setOption(
    (option = {
      title: {
        text: "Dynamic charts!!!",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        left: "center",
        top: "bottom",
        data: [
          "rose1",
          "rose2",
          "rose3",
          "rose4",
          "rose5",
          "rose6",
          "rose7",
          "rose8",
        ],
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
      series: GenerateGraph(amount)
    })
  );
  console.log("Generating Chart Done!");
}
// Function to load and parse XML
function loadXML() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "config.xml", true);
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var xmlDoc = xmlhttp.responseXML;
      let x = displayXMLContent(xmlDoc); //return object/list with parsed element data to be used as chart parameters
      NightingaleChart("s3", x)
    }
  };
  xmlhttp.send();
  console.log("Reading Done!");
}

// Function to display XML content in HTML
function displayXMLContent(xmlDoc) {
  const dashboard = xmlDoc.getElementsByTagName("dashboard")[0];
  const screens = dashboard.getElementsByTagName("screen");
  let idCounter = 1

  for (var i = 0; i < screens.length; i++) {
    let screenDiv = document.createElement("div");
    screenDiv.className = "full";

    let rows = screens[i].getElementsByTagName("row");
    for (var j = 0; j < rows.length; j++) {
      let rowDiv = document.createElement("div");
      rowDiv.className = "row";

      let graphs = rows[j].getElementsByTagName("graph");
      for (var k = 0; k < graphs.length; k++) {
        var graphDiv = document.createElement("div");
        graphDiv.className = "graph";
        graphDiv.id = 's' + idCounter;
        idCounter += 1;
        rowDiv.appendChild(graphDiv);
      }

      screenDiv.appendChild(rowDiv);
    }

    document.body.appendChild(screenDiv);
  }
  console.log("Parsing Done!");
  return 3;
}
// Call the loadXML function to start the process
loadXML();
