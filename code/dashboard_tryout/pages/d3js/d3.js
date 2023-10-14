const data = [10, 20, 40, 70, 80, 20, 10, 40];

const width = 400;
const height = 200;

// Create an SVG container
const svg = d3
  .select("#s1")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Create bars
svg
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d, i) => i * 60)
  .attr("y", (d) => height - d)
  .attr("width", 50)
  .attr("height", (d) => d)
  .attr("fill", "steelblue");

const svg2 = d3
  .select("#s2")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Create bars
svg2
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d, i) => i * 60)
  .attr("y", (d) => height - d)
  .attr("width", 50)
  .attr("height", (d) => d)
  .attr("fill", "steelblue");

const svg3 = d3
  .select("#s3")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Create bars
svg3
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d, i) => i * 60)
  .attr("y", (d) => height - d)
  .attr("width", 50)
  .attr("height", (d) => d)
  .attr("fill", "steelblue");
