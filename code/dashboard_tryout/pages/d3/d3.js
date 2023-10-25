// --- D3 CHARTS --- //
LineChart("#s1");
Densitychart("#s2");
LollypopChart("#s3");
StackedAreaChart("#m1");
ChgBarChart("#m2");
ChgPieChart("#m3");

function LineChart(idref) {
  const data = [
    { year: "2020", value: 20 },
    { year: "2021", value: 35 },
    { year: "2022", value: 45 },
    { year: "2023", value: 30 },
    { year: "2024", value: 50 },
  ];

  const width = 600;
  const height = 400;
  const margin = { top: 30, right: 30, bottom: 50, left: 50 };

  const svg = d3
    .select(idref)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Define x and y scales
  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.year))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    .nice()
    .range([height - margin.bottom, margin.top]);

  // Create the line
  const line = d3
    .line()
    .x((d) => xScale(d.year) + xScale.bandwidth() / 2)
    .y((d) => yScale(d.value));

  // Add the line to the chart
  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "rgb(0,27,84)")
    .attr("stroke-width", 3)
    .attr("d", line);

  // Add data points
  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.year) + xScale.bandwidth() / 2)
    .attr("cy", (d) => yScale(d.value))
    .attr("r", 6)
    .attr("fill", "rgb(33,189,185)");

  // Add x-axis
  svg
    .append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(xScale));

  // Add y-axis
  svg
    .append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale));

  // Add labels
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height - 10)
    .attr("text-anchor", "middle")
    .text("Year");

  svg
    .append("text")
    .attr("x", 10)
    .attr("y", 10)
    .text("Value")
    .attr("transform", "rotate(-90)")
    .style("text-anchor", "start");
}

function Densitychart(idref) {
  // set the dimensions and margins of the graph
  const margin = { top: 10, right: 30, bottom: 30, left: 40 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3
    .select(idref)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // read data
  d3.csv(
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_for_density2d.csv"
  ).then(function (data) {
    // Add X axis
    const x = d3
      .scaleLinear()
      .domain([5, 20])
      .range([margin.left, width - margin.right]);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([5, 25])
      .range([height - margin.bottom, margin.top]);
    svg.append("g").call(d3.axisLeft(y));

    // Prepare a color palette
    const color = d3
      .scaleLinear()
      .domain([0, 1.5]) // Points per square pixel.
      .range(["white", "rgb(25, 149, 161)"]);

    // compute the density data
    const densityData = d3
      .contourDensity()
      .x(function (d) {
        return x(d.x);
      })
      .y(function (d) {
        return y(d.y);
      })
      .size([width, height])
      .bandwidth(20)(data);

    // show the shape!
    svg
      .insert("g", "g")
      .selectAll("path")
      .data(densityData)
      .enter()
      .append("path")
      .attr("d", d3.geoPath())
      .attr("fill", function (d) {
        return color(d.value);
      });
  });
}

function LollypopChart(idref) {
  // set the dimensions and margins of the graph
  const margin = { top: 10, right: 30, bottom: 40, left: 100 },
    width = 460 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3
    .select(idref)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Parse the Data
  d3.csv(
    "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv"
  ).then(function (data) {
    // sort data
    data.sort(function (b, a) {
      return a.Value - b.Value;
    });

    // Add X axis
    const x = d3.scaleLinear().domain([0, 13000]).range([0, width]);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Y axis
    const y = d3
      .scaleBand()
      .range([0, height])
      .domain(
        data.map(function (d) {
          return d.Country;
        })
      )
      .padding(1);
    svg.append("g").call(d3.axisLeft(y));

    // Lines
    svg
      .selectAll("myline")
      .data(data)
      .join("line")
      .attr("x1", x(0))
      .attr("x2", x(0))
      .attr("y1", function (d) {
        return y(d.Country);
      })
      .attr("y2", function (d) {
        return y(d.Country);
      })
      .attr("stroke-width", 2.5)
      .attr("stroke", "rgb(0,27,84)");

    // Circles -> start at X=0
    svg
      .selectAll("mycircle")
      .data(data)
      .join("circle")
      .attr("cx", x(0))
      .attr("cy", function (d) {
        return y(d.Country);
      })
      .attr("r", "7")
      .style("fill", "rgb(33,189,185)")

    // Change the X coordinates of line and circle
    svg
      .selectAll("circle")
      .transition()
      .duration(2000)
      .attr("cx", function (d) {
        return x(d.Value);
      });

    svg
      .selectAll("line")
      .transition()
      .duration(2000)
      .attr("x1", function (d) {
        return x(d.Value);
      });
  });
}

function ChgBarChart(idref) {
  const data = [
    { year: "2020", values: [10, 15, 20, 25, 35] },
    { year: "2021", values: [15, 20, 5, 30, 10] },
    { year: "2022", values: [30, 5, 25, 10, 15] },
    // Add more data for each year
  ];

  const margin = { top: 40, right: 30, bottom: 40, left: 60 };
  const width = 550 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const svg = d3
    .select(idref)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Define unique colors for each bar
  const colors = [
    "rgb(0, 27, 84)",
    "rgb(8, 67, 109)",
    "rgb(17, 108, 135)",
    "rgb(25, 149, 161)",
    "rgb(33, 189, 185)",
  ];

  // Create scales
  const x = d3
    .scaleLinear()
    .domain([0, d3.max(data[0].values)])
    .nice()
    .range([0, width]);

  const y = d3
    .scaleBand()
    .domain(data[0].values.map((d, i) => i))
    .range([0, height])
    .padding(0.1);

  // Create initial bars with unique colors
  const bars = svg
    .selectAll(".bar")
    .data(data[0].values)
    .enter()
    .append("g")
    .attr("class", "bar");

  bars
    .append("rect")
    .attr("x", 0)
    .attr("y", (d, i) => y(i))
    .attr("width", 0)
    .attr("height", y.bandwidth())
    .attr("fill", (d, i) => colors[i])
    .transition()
    .duration(1000)
    .attr("x", 0)
    .attr("width", (d) => x(d));

  bars
    .append("text")
    .attr("x", (d) => x(d) + 5)
    .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
    .text((d) => d)
    .attr("dy", "0.35em");

  // Display the year above the chart
  const yearText = svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", -10)
    .attr("text-anchor", "middle");

  // Function to update the chart for a specific year
  function updateChart(yearIndex) {
    bars
      .data(data[yearIndex].values)
      .select("rect")
      .transition()
      .duration(1000)
      .attr("x", 0)
      .attr("width", (d) => x(d));

    bars
      .data(data[yearIndex].values)
      .select("text")
      .transition()
      .duration(1000)
      .attr("x", (d) => x(d) + 5)
      .text((d) => d);

    // Update the year based on the current year's values
    yearText.text(data[yearIndex].year);
  }

  // Initial update
  let currentYear = 0;
  updateChart(currentYear);

  // Set up a loop to create an animation (replace with your own logic)
  setInterval(() => {
    currentYear = (currentYear + 1) % data.length;
    updateChart(currentYear);
  }, 4000);
}

function ChgPieChart(idref) {
  const data = [
    { year: "2020", values: [30, 20, 10, 40] },
    { year: "2021", values: [15, 25, 35, 25] },
    { year: "2022", values: [10, 40, 15, 35] },
    // Add more data for additional years
  ];

  const width = 400;
  const height = 400;
  const radius = Math.min(width, height) / 2;

  const svg = d3
    .select(idref)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const color = d3
    .scaleOrdinal()
    .domain(data[0].values)
    .range([
      "rgb(0,27,84)",
      "rgb(8, 67, 109)",
      "rgb(17, 108, 135)",
      "rgb(33,189,185)",
    ]);

  const arc = d3.arc().innerRadius(0).outerRadius(radius);

  const pie = d3.pie();

  let currentYear = 0;

  function updatePie(yearIndex) {
    const pieData = pie(data[yearIndex].values);

    const arcs = svg.selectAll(".arc").data(pieData);

    arcs
      .enter()
      .append("path")
      .attr("class", "arc")
      .merge(arcs)
      .transition()
      .duration(1000)
      .attr("d", arc)
      .attr("fill", (d, i) => color(i));

    arcs.exit().remove();
  }

  function updateYear() {
    svg
      .append("text")
      .attr("class", "year-label")
      .attr("dy", -10)
      .attr("text-anchor", "middle")
      .text(data[currentYear].year);
  }

  updateYear();
  updatePie(currentYear);

  // Periodically change the year and update the pie chart (replace with your own logic)
  setInterval(() => {
    currentYear = (currentYear + 1) % data.length;
    svg.select(".year-label").remove();
    updateYear();
    updatePie(currentYear);
  }, 2000);
}

function StackedAreaChart(idref) {
  const data = [
    { year: "2020", Positief: 20, Negatief: 30, Neutraal: 25 },
    { year: "2021", Positief: 30, Negatief: 25, Neutraal: 35 },
    { year: "2022", Positief: 35, Negatief: 40, Neutraal: 30 },
    // Add more data for additional years and categories
  ];

  // Define chart dimensions
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  const width = 800 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  // Create an SVG container
  const svg = d3
    .select(idref)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Extract category keys for stacking
  const keys = Object.keys(data[0]).slice(1);

  // Set up scales
  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.year))
    .range([0, width])
    .padding(0.1);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d3.sum(keys, (key) => d[key]))])
    .nice()
    .range([height, 0]);

    const customColors = ["rgb(0,27,84)", "rgb(17, 108, 135)", "rgb(33,189,185)"];

  // Create a stack generator
  const stack = d3
    .stack()
    .keys(keys)
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);

  // Stack the data
  const stackedData = stack(data);

  // Create the areas
  svg
    .selectAll("path")
    .data(stackedData)
    .enter()
    .append("path")
    .attr("fill", (d, i) => customColors[i])
    .attr(
      "d",
      d3
        .area()
        .x((d) => xScale(d.data.year))
        .y0((d) => yScale(d[0]))
        .y1((d) => yScale(d[1]))
    );

  // Add axes
  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

  svg.append("g").attr("class", "y-axis").call(d3.axisLeft(yScale).ticks(5));

  // Add legend
  const legend = svg
    .selectAll(".legend")
    .data(keys)
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", (d, i) => "translate(0," + i * 20 + ")");

  legend
    .append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .attr("fill", (d, i) => customColors[i]);

  legend
    .append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text((d) => d);
}
