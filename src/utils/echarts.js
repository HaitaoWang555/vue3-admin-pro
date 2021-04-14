// common options
function lineCommonOptions(xData, yData, legend, seriesCon) {
  const series = []
  for (let index = 0; index < yData.length; index++) {
    const seriesConfig = Object.assign(
      {
        data: [],
        type: 'line',
        smooth: true,
        animationDuration: 2800,
        animationEasing: 'quadraticOut',
      },
      seriesCon || {}
    )
    seriesConfig.data = yData[index]
    if (legend && legend.length > 0) {
      seriesConfig.name = legend[index]
    }
    series.push(seriesConfig)
  }
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      padding: [5, 10],
    },
    legend: {
      data: legend || [],
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisTick: {
        show: false,
      },
      data: xData || [],
    },
    yAxis: {
      axisTick: {
        show: false,
      },
      type: 'value',
    },
    series,
  }
}
function BarCommonOptions(xData, yData, legend, seriesCon) {
  const series = []
  for (let index = 0; index < yData.length; index++) {
    const seriesConfig = Object.assign(
      {
        data: [],
        type: 'bar',
        smooth: true,
        emphasis: {
          focus: 'series',
        },
        animationDuration: 2800,
        animationEasing: 'quadraticOut',
      },
      seriesCon || {}
    )
    seriesConfig.data = yData[index]
    if (legend && legend.length > 0) {
      seriesConfig.name = legend[index]
    }
    series.push(seriesConfig)
  }
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      padding: [5, 10],
    },
    legend: {
      data: legend || [],
    },
    xAxis: {
      type: 'category',
      axisTick: {
        show: false,
      },
      data: xData || [],
    },
    yAxis: {
      axisTick: {
        show: false,
      },
      type: 'value',
    },
    series,
  }
}
function PieCommonOptions(data) {
  return {
    tooltip: {
      trigger: 'item',
      padding: [5, 10],
    },
    legend: {
      top: 'bottom',
    },
    series: {
      type: 'pie',
      radius: [50, 250],
      data,
    },
  }
}

export { lineCommonOptions, BarCommonOptions, PieCommonOptions }
