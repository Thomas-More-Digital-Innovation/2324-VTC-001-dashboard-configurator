const data = [10, 20, 40, 70, 80, 20, 10, 40];

const width = 400;
const height = 200;

// Create an SVG container
const svg = d3
  .select("#chart")
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
