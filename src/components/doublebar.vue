<template>
  <div class="chartCom" ref="testchart" v-dyx-resize="resizeFn"></div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted, watch } from "vue";
import * as echarts from "echarts";
const props = defineProps({
  barsData: {
    type: Array,
    default: () => [],
  },
});
let myChart: any = null;
let testchart = ref(null);
// 初始化之后排序的数据
let sortSeriesdata: any;
// 初始化之后排序的数据的 深拷贝
let newChartdata: any;
let color = ["#0076F6", "#6AC4D6", "#FFC876", "#29B1FF"];
const initChart = (seriesdata: any) => {
  if (!myChart) {
    myChart = echarts.init(testchart.value);
  }
  let option = {
    //你的代码
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: (param: any) => {
        //自定义tooltip内容
        // console.log("数据=========", param);
        var text = "";
        for (let i = 0; i < param.length; i++) {
          text += `
            <div style="background:#ffffff;margin:2px;padding:2px 4px;color:#000000;margint-bottom:10px">
              <b style="display:inline-block;border-radius:6px;width:10px;height:10px;background-color:${param[i].color}"></b>
              <span style="color:#989DAA;font-weight:600;">${param[i].seriesName} </span>
              <span style="float:right;font-weight:600;color:${param[i].color};">${param[i].value}
                <span style="color:#989DAA;font-weight:600;">桶</span>
              </span>
            </div>`;
        }
        return text;
      },
    },
    legend: {
      show: true,
      x: "right",
      y: "top",
      icon: "circle",
    },
    textStyle: {
      color: "#2C3E50",
    },
    grid: {
      top: "18%",
      right: "1%",
      bottom: "0%",
      left: "1%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: seriesdata[0].xdata,
        axisLabel: {
          color: "#606266",
          fontSize: 13,
          align: "center",
          lineHeight: -20,
          verticalAlign: "bottom",
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        nameTextStyle: {
          color: "#989DAA",
          fontSize: 12,
        },
        splitNumber: 4,
        axisLabel: {
          color: "#989DAA",
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#E5E6EB",
          },
        },
        axisLine: {
          show: false,
        },
      },
    ],
    color: color,
    series: seriesdata,
  };
  myChart.setOption(option, true);
};
const initData = async () => {
  sortSeriesdata = reSort(props.barsData, "all").map((it: any) =>
    Object.assign(it, {
      type: "bar",
      stack: "user",
    })
  );
  newChartdata = JSON.parse(JSON.stringify(sortSeriesdata));
  if (props.barsData.length) initChart(sortSeriesdata);
};
const resizeFn = () => {
  myChart && myChart.resize();
};
// 重排序
const reSort = (array: Array<any>, obj: any) => {
  let maps = new Map();
  let newArray: any = [];
  var tempV;
  let arr: any = arrydataSum(array, obj);
  console.log(arr);

  if (array && array.length && array[0].xdata) {
    for (let i = 0; i < array[0].xdata.length; i++) {
      maps.set(array[0]?.xdata[i], {
        value: array.map((it) => it.name + "+++" + it.data[i]),
      });
    }
  }
  array.forEach((it, i) => {
    newArray.push({
      name: it.name,
      xdata: arr.map((it: any) => it.xlabel),
      data: [],
    });
    arr.forEach((item: any, idx: number) => {
      newArray[i].data.push(maps.get(item.xlabel).value);
    });
  });
  newArray.forEach((it: any, i: number) => {
    it.data.forEach((item: any, iss: number) => {
      it.data[iss] = item.filter((res: any) => res.includes(it.name));
    });
  });
  newArray.forEach((it: any) => {
    for (let idx = 0; idx < it.data.length; idx++) {
      tempV = it.data[idx][0].split("+++")[1] - 0;
      it.data[idx] = tempV;
    }
  });
  return newArray;
};
// 总数相加和
function arrydataSum(array: Array<any>, objt: any) {
  let arr = [];
  if (objt === "all") {
    // 比较所有
    if (array && array.length && array[0].xdata) {
      for (let i = 0; i < array[0].xdata.length; i++) {
        let temp = 0;
        array.forEach((item) => {
          temp = temp + item.data[i];
        });
        arr.push({ value: temp, xlabel: array[0].xdata[i] });
      }
      arr.sort((a, b) => {
        return b.value - a.value;
      });
    }
    console.log(arr);
    return arr;
  } else {
    // 比较部分
    return arrydataSum(objt, "all");
  }
}

onMounted(() => {
  initData();
});
watch(
  () => props.barsData,
  (n) => {
    if (n && n.length) {
      initData();
      myChart &&
        myChart.on("legendselectchanged", (params: any) => {
          console.log("回调参数====》", params);
          // console.log("option=======>", option);
          if (!Object.values(params.selected).some((it) => it === false)) {
            // 全选
            if (props.barsData.length) initChart(sortSeriesdata);
          } else {
            // 没有全选
            if (props.barsData.length) {
              var newarr: any = [];
              for (const key in params.selected) {
                if (params.selected[key]) {
                  newarr.push(
                    newChartdata.filter((it: any) => it.name === key)[0]
                  );
                }
              }
              initChart(
                reSort(sortSeriesdata, newarr).map((it: any) =>
                  Object.assign(it, {
                    type: "bar",
                    stack: "user",
                  })
                )
              );
              for (const key in params.selected) {
                if (params.selected[key]) {
                  // echarts 图 legend 选中
                  myChart.dispatchAction({
                    type: "legendSelect",
                    name: key,
                  });
                } else {
                  // echarts 图 legend 不选中
                  myChart.dispatchAction({
                    type: "legendUnSelect",
                    name: key,
                  });
                }
              }
            }
          }
        });
    }
  },
  {
    deep: true,
  }
);
</script>
<style lang="scss" scoped>
.chartCom {
  width: 100%;
  height: 100%;
}
</style>
