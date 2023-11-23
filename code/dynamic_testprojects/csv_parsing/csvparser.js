async function handleCSVFile() {
  try {
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
    const parsedData = parseCSV(content, "dates");

    await NightingaleChart(parsedData);
    console.log("Graphs created successfully");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example parsing function (replace with your actual CSV parsing logic)
function parseCSV(content, columnName) {
  const rows = content.split("\n");
  const headers = rows[0].split(",");

  const columnIndex = headers.indexOf(columnName);
  if (columnIndex === -1) {
    throw new Error(`Column '${columnName}' not found`);
  }

  const columnValues = rows.slice(1).map((row) => {
    const values = row.replace(/\r/g, "").split(",");
    return values[columnIndex];
  });

  const uniqueElements = [...new Set(columnValues)]; // Get unique elements from the column

  const uniqueOccurrences = uniqueElements.map((element) => {
    const occurrences = columnValues.filter((value) => value === element).length;
    return {
      name: element,
      value: occurrences,
    };
  });

  return uniqueOccurrences;
}


function NightingaleChart(data) {
  return new Promise((resolve, reject) => {
    const wrapper = document.createElement("div");
    wrapper.id = "ntg";
    wrapper.classList.add("full");
    document.body.appendChild(wrapper);

    let chart = echarts.init(document.getElementById("ntg"), {
      width: "100%",
      height: "100%",
    });

    const option = {
      legend: {
        top: "bottom",
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
          data: data,
        },
      ],
    };

    chart.setOption(option);

    resolve();
  });
}

// Execution
handleCSVFile()
  .then(() => console.log("Graph created successfully"))
  .catch((error) => console.error("Error:", error));
