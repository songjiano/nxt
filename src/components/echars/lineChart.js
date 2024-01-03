import * as echarts from "echarts/core";
import {
  ToolboxComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
} from "echarts/components";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  ToolboxComponent,
]);

export const lineChart=(id)=>{
  let chartDom = document.getElementById(id);
  let myChart = echarts.init(chartDom);
  const dateList = jsJso.map(function (item) {
    return item[0];
  });
  const valueList = jsJso.map(function (item) {
    return item[1];
  });
  let option = {
    visualMap: [
      {
        show: false,
        type: "continuous",
        seriesIndex: 0,
        min: 0,
        max: 400,
      },
      {
        show: false,
        type: "continuous",
        seriesIndex: 1,
        dimension: 0,
        min: 0,
        max: dateList.length - 1,
      },
    ],
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
      },
    },
    calculable: true,
    title: [
      {
        left: "left",
        text: "出发车辆",
      },
      {
        top: "49%",
        left: "left",
        text: "到达车辆",
      },
    ],
    tooltip: {
      trigger: "axis",
    },
    xAxis: [
      {
        data: dateList,
      },
      {
        data: dateList,
        gridIndex: 1,
      },
    ],
    yAxis: [
      {},
      {
        gridIndex: 1,
      },
    ],
    grid: [
      {
        bottom: "60%",
      },
      {
        top: "60%",
      },
    ],
    series: [
      {
        type: "line",
        showSymbol: false,
        data: valueList,
      },
      {
        type: "line",
        showSymbol: false,
        data: valueList,
        xAxisIndex: 1,
        yAxisIndex: 1,
      },
    ],
  };
  option && myChart.setOption(option);
}