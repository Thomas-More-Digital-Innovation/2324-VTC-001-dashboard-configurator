// --- CANVAS DECLARATION --- //
// Canvas declarations for single-view charts
const ctxs1 = document.getElementById("s1"); // Canvas for doughnut chart
const ctxs2 = document.getElementById("s2"); // Canvas for scatter chart
const ctxs3 = document.getElementById("s3"); // canvas for polar area chart

// Canvas declarations for multi-view charts
const ctxm1 = document.getElementById("m1");
const ctxm2 = document.getElementById("m2");
const ctxm3 = document.getElementById("m3");

// --- SINGLE-VIEW CHARTS --- //
// Doughnut chart - s1
new Chart(ctxs1, {
  type: "doughnut",
  data: {
    labels: ["Answer 1", "Answer 2", "Answer 3"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(0,27,84)",
          "rgb(17, 108, 135)",
          "rgb(33,189,185)",
        ],
        hoverOffset: 4,
        radius: "100%",
      },
    ],
  },
  options: {
    maintainAspectRatio: false, // Prevent fixed aspect ratio
    responsive: false, // Disable responsiveness
    cutout: 100,
  },
});

// Scatter chart - s2
new Chart(ctxs2, {
  type: "scatter",
  data: {
    datasets: [
      {
        label: "Opinions",
        data: [
          {
            x: -10,
            y: 0,
          },
          {
            x: 0,
            y: 10,
          },
          {
            x: 10,
            y: 5,
          },
          {
            x: 0.5,
            y: 5.5,
          },
        ],
        backgroundColor: "rgb(17, 108, 135) ",
      },
    ],
  },
  options: {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
      },
    },
  },
});

// Polar area chart - s3
new Chart(ctxs3, {
  type: "polarArea",
  data: {
    labels: ["G1", "G2", "G3", "G4", "G5"],
    datasets: [
      {
        label: "My First Dataset",
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          "rgb(0,27,84)",
          "rgb(8, 67, 109)",
          "rgb(17, 108, 135)",
          "rgb(25, 149, 161)",
          "rgb(33,189,185)",
        ],
      },
    ],
  },
});

// --- MULTIPLE VIEW CHARTS --- //
//
new Chart(ctxm1, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Series 1",
        data: [10, 20, 15, 30, 25],
        borderColor: "rgb(8, 67, 109)",
        fill: false,
      },
      {
        label: "Series 2",
        data: [25, 15, 30, 10, 20],
        borderColor: "rgb(25, 149, 161)",
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  },
});

new Chart(ctxm2, {
  type: "bubble",
  data: {
    datasets: [
      {
        label: "Year 1",
        data: [
          {
            x: 20,
            y: 30,
            r: 15,
          },
          {
            x: 40,
            y: 10,
            r: 10,
          },
        ],
        backgroundColor: "rgb(0,27,84)",
      },
      {
        label: "Year 2",
        data: [
          {
            x: 50,
            y: 40,
            r: 15,
          },
          {
            x: 10,
            y: 10,
            r: 10,
          },
        ],
        backgroundColor: "rgb(17, 108, 135)",
      },
      {
        label: "Year 3",
        data: [
          {
            x: 20,
            y: 20,
            r: 15,
          },
          {
            x: 35,
            y: 35,
            r: 25,
          },
        ],
        backgroundColor: "rgb(33,189,185)",
      },
    ],
  },
});

new Chart(ctxm3, {
  type: "radar",
  data: {
    labels: [
      "Eating",
      "Drinking",
      "Sleeping",
      "Designing",
      "Coding",
      "Cycling",
      "Running",
    ],
    datasets: [
      {
        label: "Dataset 1",
        data: [100, 80, 90, 70, 90, 50, 80],
        fill: true,
        backgroundColor: "rgba(0, 27, 84, 0.2)",
        borderColor: "rgb(0,27,84)",
        pointBackgroundColor: "rgb(0,27,84)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(0,27,84)",
      },
      {
        label: "Dataset 2",
        data: [90, 80, 70, 0, 80, 90, 70],
        fill: true,
        backgroundColor: "rgba(33,189,185, 0.2)",
        borderColor: "rgb(33,189,185)",
        pointBackgroundColor: "rgb(33,189,185)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(33,189,185)",
      },
    ],
  },
  options: {
    elements: {
      line: {
        borderWidth: 3,
      },
    },
  },
});
