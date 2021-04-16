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
      top: 20,
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
      bottom: 10,
    },
    series: {
      type: 'pie',
      data,
    },
  }
}

function MapCommonOptions() {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br/>{c} (p / km2)',
    },
    visualMap: {
      min: 800,
      max: 50000,
      text: ['High', 'Low'],
      realtime: false,
      calculable: true,
      inRange: {
        color: ['lightskyblue', 'yellow', 'orangered'],
      },
    },
    series: [
      {
        name: '香港18区人口密度',
        type: 'map',
        map: 'HK', // 自定义扩展图表类型
        label: {
          show: true,
        },
        data: [
          { name: '中西区', value: 20057.34 },
          { name: '湾仔', value: 15477.48 },
          { name: '东区', value: 31686.1 },
          { name: '南区', value: 6992.6 },
          { name: '油尖旺', value: 44045.49 },
          { name: '深水埗', value: 40689.64 },
          { name: '九龙城', value: 37659.78 },
          { name: '黄大仙', value: 45180.97 },
          { name: '观塘', value: 55204.26 },
          { name: '葵青', value: 21900.9 },
          { name: '荃湾', value: 4918.26 },
          { name: '屯门', value: 5881.84 },
          { name: '元朗', value: 4178.01 },
          { name: '北区', value: 2227.92 },
          { name: '大埔', value: 2180.98 },
          { name: '沙田', value: 9172.94 },
          { name: '西贡', value: 3368 },
          { name: '离岛', value: 806.98 },
        ],
        // 自定义名称映射
        nameMap: {
          'Central and Western': '中西区',
          Eastern: '东区',
          Islands: '离岛',
          'Kowloon City': '九龙城',
          'Kwai Tsing': '葵青',
          'Kwun Tong': '观塘',
          North: '北区',
          'Sai Kung': '西贡',
          'Sha Tin': '沙田',
          'Sham Shui Po': '深水埗',
          Southern: '南区',
          'Tai Po': '大埔',
          'Tsuen Wan': '荃湾',
          'Tuen Mun': '屯门',
          'Wan Chai': '湾仔',
          'Wong Tai Sin': '黄大仙',
          'Yau Tsim Mong': '油尖旺',
          'Yuen Long': '元朗',
        },
      },
    ],
  }
}

function MapChinaCommonOptions(data) {
  return {
    legend: {
      orient: 'vertical',
      y: 'bottom',
      x: 'right',
      textStyle: {
        color: '#fff',
      },
    },
    geo: {
      map: 'CN',
      roam: true,
      center: [104.114129, 35.950339],
      label: {
        show: true,
      },
      zoom: 1.2,
      itemStyle: {
        color: '#B1D0EC',
        shadowBlur: 5,
        shadowColor: '#333',
        borderColor: '#6dbee0',
      },
    },
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        data: data || [],
        silent: true,
        large: true,
      },
    ],
  }
}

export {
  lineCommonOptions,
  BarCommonOptions,
  PieCommonOptions,
  MapCommonOptions,
  MapChinaCommonOptions,
}
