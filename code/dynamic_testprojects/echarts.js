function HorizontalBarChart(idref) {
  var chart = echarts.init(document.getElementById(idref), {
    width: 500,
    height: 400,
  });

  chart.setOption(
    (option = {
      dataset: {
        source: [
          ["score", "amount", "product"],
          [47.7, 35147, "Luxemburg"],
          [32.7, 20112, "Luik"],
          [10.6, 101852, "Namen"],
          [19.6, 91852, "Henegouwen"],
          [68.1, 79146, "Waals-Brabant"],
          [89.7, 20145, "Vlaams-Brabant"],
          [50.1, 12755, "Limburg"],
          [74.4, 41032, "Antwerpen"],
          [57.1, 78254, "Oost-Vlaanderen"],
          [89.3, 58212, "West-Vlaanderen"],
        ],
      },
      grid: { containLabel: true },
      xAxis: { name: "aantal" },
      yAxis: { type: "category" },
      visualMap: {
        orient: "horizontal",
        left: "center",
        top: "",
        min: 10,
        max: 100,
        text: ["Positief", "Negatief"],
        // Map the score column to color
        dimension: 0,
        inRange: {
          color: ["rgb(33,189,185)", "rgb(17, 108, 135)", "rgb(0,27,84)"],
        },
      },
      series: [
        {
          type: "bar",
          encode: {
            // Map the "amount" column to X axis.
            x: "amount",
            // Map the "product" column to Y axis
            y: "product",
          },
        },
      ],
    })
  );
  console.log("Generating Chart Done!")
}
// Function to load and parse XML
function loadXML() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "data.xml", true);
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var xmlDoc = xmlhttp.responseXML;
      displayXMLContent(xmlDoc);
    }
  };
  xmlhttp.send();
  console.log("Reading Done!")
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
  console.log("Parsing Done!")
};
// Call the loadXML function to start the process
loadXML()
