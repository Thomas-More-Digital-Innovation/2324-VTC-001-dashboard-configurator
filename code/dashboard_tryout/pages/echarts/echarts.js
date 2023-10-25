HorizontalBarChart("s1");
StackedAreaChart("s2");
ScrollablePieChart("s3");
MultipleBarChart("m1");
MultiplePieChart("m2");
CustomExpansion("m3");

function StackedAreaChart(idref) {
  var chart = echarts.init(document.getElementById(idref), {
    width: 500,
    height: 500,
  });

  chart.setOption(
    (option = {
      color: [
        "rgb(0,27,84)",
        "rgb(8, 67, 109)",
        "rgb(17, 108, 135)",
        "rgb(25, 149, 161)",
        "rgb(33,189,185)",
      ],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: ["10-20j", "20-30j", "30-40j", "40-50j", "50-60j"],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["2017", "2018", "2019", "2020", "2021", "2022", "2023"],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "10-20j",
          type: "line",
          stack: "Total",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(0,27,84,1)",
              },
              {
                offset: 1,
                color: "rgba(0,27,84,0.8)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [140, 232, 101, 264, 90, 340, 250],
        },
        {
          name: "20-30j",
          type: "line",
          stack: "Total",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(8, 67, 109,1)",
              },
              {
                offset: 1,
                color: "rgba(8, 67, 109 ,0.8)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [120, 282, 111, 234, 220, 340, 310],
        },
        {
          name: "30-40j",
          type: "line",
          stack: "Total",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(17, 108, 135,1)",
              },
              {
                offset: 1,
                color: "rgba(17, 108, 135,0.8)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [320, 132, 201, 334, 190, 130, 220],
        },
        {
          name: "40-50j",
          type: "line",
          stack: "Total",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(25, 149, 161,1)",
              },
              {
                offset: 1,
                color: "rgba(25, 149, 161,0.8)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [220, 402, 231, 134, 190, 230, 120],
        },
        {
          name: "50-60j",
          type: "line",
          stack: "Total",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          label: {
            show: true,
            position: "top",
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(33,189,185,1)",
              },
              {
                offset: 1,
                color: "rgba(33,189,185,0.8)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [220, 302, 181, 234, 210, 290, 150],
        },
      ],
    })
  );
}

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
}

function ScrollablePieChart(idref) {
  var chart = echarts.init(document.getElementById(idref), {
    width: 600,
    height: 400,
  });

  chart.setOption(
    (option = {
      title: {
        text: "Gevoel over leefklimaat",
        subtext: "N = 762",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        type: "scroll",
        orient: "vertical",
        right: 10,
        top: 20,
        bottom: 20,
        data: [
          "Heel tevreden",
          "Tevreden",
          "Neutraal",
          "Ontevreden",
          "Teleurgesteld",
        ],
      },
      series: [
        {
          type: "pie",
          radius: "55%",
          center: ["40%", "50%"],
          data: [
            {
              name: "Heel tevreden",
              value: 50,
              itemStyle: { color: "rgb(0,27,84)" },
            }, // Custom color for 'a'
            {
              name: "Tevreden",
              value: 180,
              itemStyle: { color: "rgb(8, 67, 109)" },
            }, // Custom color for 'b'
            {
              name: "Neutraal",
              value: 300,
              itemStyle: { color: "rgb(17, 108, 135)" },
            }, // Custom color for 'c'
            {
              name: "Ontevreden",
              value: 132,
              itemStyle: { color: "rgb(25, 149, 161)" },
            }, // Custom color for 'd'
            {
              name: "Teleurgesteld",
              value: 100,
              itemStyle: { color: "rgb(33,189,185)" },
            }, // Custom color for 'e'
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    })
  );
}

function MultipleBarChart(idref) {
  var chart = echarts.init(document.getElementById(idref), {
    width: 600,
    height: 400,
  });

  chart.setOption(
    (option = {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ["product", "2015", "2016", "2017"],
          ["Matcha Latte", 43.3, 85.8, 93.7],
          ["Milk Tea", 83.1, 73.4, 55.1],
          ["Cheese Cocoa", 86.4, 65.2, 82.5],
          ["Walnut Brownie", 72.4, 53.9, 39.1],
        ],
      },
      xAxis: { type: "category" },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [
        {
          type: "bar",
          itemStyle: {
            color: "rgb(0,27,84)", // Custom color for the first series
          },
        },
        {
          type: "bar",
          itemStyle: {
            color: "rgb(17, 108, 135)", // Custom color for the second series
          },
        },
        {
          type: "bar",
          itemStyle: {
            color: "rgb(33,189,185)", // Custom color for the third series
          },
        },
      ],
    })
  );
}

function MultiplePieChart(idref) {
  var chart = echarts.init(document.getElementById(idref), {
    width: 600,
    height: 400,
  });

  chart.setOption({
    dataset: [
      {
        source: [
          ["Product", "Sales", "Price", "Year"],
          ["Optie 1", 123, 32, 2011],
          ["Optie 2", 231, 14, 2011],
          ["Optie 3", 235, 5, 2011],
          ["Optie 4", 341, 25, 2011],
          ["Optie 5", 122, 29, 2011],
          ["Optie 1", 143, 30, 2012],
          ["Optie 2", 201, 19, 2012],
          ["Optie 3", 255, 7, 2012],
          ["Optie 4", 241, 27, 2012],
          ["Optie 5", 102, 34, 2012],
          ["Optie 1", 153, 28, 2013],
          ["Optie 2", 181, 21, 2013],
          ["Optie 3", 395, 4, 2013],
          ["Optie 4", 281, 31, 2013],
          ["Optie 5", 92, 39, 2013],
          ["Optie 1", 223, 29, 2014],
          ["Optie 2", 211, 17, 2014],
          ["Optie 3", 345, 3, 2014],
          ["Optie 4", 211, 35, 2014],
          ["Optie 5", 72, 24, 2014],
        ],
      },
      {
        transform: {
          type: "filter",
          config: { dimension: "Year", value: 2011 },
        },
      },
      {
        transform: {
          type: "filter",
          config: { dimension: "Year", value: 2012 },
        },
      },
      {
        transform: {
          type: "filter",
          config: { dimension: "Year", value: 2013 },
        },
      },
    ],
    series: [
      {
        type: "pie",
        radius: 50,
        center: ["50%", "25%"],
        datasetIndex: 1,
      },
      {
        type: "pie",
        radius: 50,
        center: ["50%", "50%"],
        datasetIndex: 2,
      },
      {
        type: "pie",
        radius: 50,
        center: ["50%", "75%"],
        datasetIndex: 3,
      },
    ],
    // Optional. Only for responsive layout:
    color: [
      "rgb(0,27,84)",
      "rgb(8, 67, 109)",
      "rgb(17, 108, 135)",
      "rgb(25, 149, 161)",
      "rgb(33,189,185)",
    ],
    media: [
      {
        query: { minAspectRatio: 1 },
        option: {
          series: [
            { center: ["25%", "50%"] },
            { center: ["50%", "50%"] },
            { center: ["75%", "50%"] },
          ],
        },
      },
      {
        option: {
          series: [
            { center: ["50%", "25%"] },
            { center: ["50%", "50%"] },
            { center: ["50%", "75%"] },
          ],
        },
      },
    ],
  });
}

function CustomExpansion(idref) {
  const treeDataURI = "vtclogo.png";
  const beginYear = 1973;
  const endYear = 2023;
  const lineCount = 6;

  // Make fake data.
  function makeCategoryData() {
    var categoryData = [];
    for (var i = 0; i < lineCount; i++) {
      categoryData.push(i + "a");
    }
    return categoryData;
  }
  function makeSeriesData(year, negative) {
    // make a fake value just for demo.
    const r = (year - beginYear + 1) * 10;
    const seriesData = [];
    for (let i = 0; i < lineCount; i++) {
      let sign = negative
        ? -1 * (i % 3 ? 0.9 : 1)
        : 1 * ((i + 1) % 3 ? 0.9 : 1);
      seriesData.push({
        value:
          sign *
          (year <= beginYear + 1
            ? Math.abs(i - lineCount / 2 + 0.5) < lineCount / 5
              ? 5
              : 0
            : (lineCount - Math.abs(i - lineCount / 2 + 0.5)) * r),
        symbolOffset: i % 2 ? ["50%", 0] : undefined,
      });
    }
    return seriesData;
  }
  // Set dynamic data.
  var currentYear = beginYear;
  setInterval(function () {
    currentYear++;
    if (currentYear > endYear) {
      currentYear = beginYear;
    }
    chart.setOption({
      xAxis: {
        name: currentYear,
      },
      series: [
        {
          data: makeSeriesData(currentYear),
        },
        {
          data: makeSeriesData(currentYear, true),
        },
      ],
    });
  }, 800);

  var chart = echarts.init(document.getElementById(idref), {
    width: 600,
    height: 400,
  });
  chart.setOption({
    title: {
      text: "Deelnemers over de jaren",
      left: "center",
    },
    color: ["#e54035"],
    xAxis: {
      axisLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      name: beginYear + "",
      nameLocation: "middle",
      nameGap: 40,
      nameTextStyle: {
        color: "rgb(0,27,84))",
        fontSize: 50,
        fontFamily: "Arial",
      },
      min: -2800,
      max: 2800,
    },
    yAxis: {
      data: makeCategoryData(),
      show: false,
    },
    grid: {
      top: "center",
      height: 280,
    },
    series: [
      {
        name: "all",
        type: "pictorialBar",
        symbol: "image://" + treeDataURI,
        symbolSize: [30, 55],
        symbolRepeat: true,
        data: makeSeriesData(beginYear),
        animationEasing: "elasticOut",
      },
      {
        name: "all",
        type: "pictorialBar",
        symbol: "image://" + treeDataURI,
        symbolSize: [30, 55],
        symbolRepeat: true,
        data: makeSeriesData(beginYear, true),
        animationEasing: "elasticOut",
      },
    ],
  });
}
