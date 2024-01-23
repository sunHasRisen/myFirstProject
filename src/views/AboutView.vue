<template>
  <div class="home">
    <div class="mycharts mb10" ref="testchart" v-dyx-resize="www"></div>
    <div class="mycharts" v-if="vm.ipt1">
      <MyChart></MyChart>
    </div>
    <div class="mycharts" v-if="vm.ipt1">
      <DoubleBar :bars-data="vm.mockdataDoublebar"></DoubleBar>
    </div>
    <br />
    <div class="ipt">
      <el-input
        v-model="vm.ipt1"
        placeholder="自动聚焦"
        size="default"
        clearable
        v-dyx-focus
      ></el-input>
    </div>
    <div class="ipt">
      <el-input
        v-model="vm.ipt2"
        placeholder="自动聚焦"
        size="default"
        clearable
      ></el-input>
    </div>
    <div
      class="box"
      v-dyx-loading="vm.loading"
      v-if="vm.ipt1"
      v-dyx-long-press:2000="longpress"
      v-dyx-outside-click.strickly="shortClick"
    >
      <span>123</span>
      <h1>今天是个好天气！</h1>
    </div>
    <div
      class="box"
      v-dyx-loading="vm.loading"
      v-if="vm.ipt1"
      v-dyx-long-press:2000="longpress"
    >
      <span>123</span>
      <h1>今天是个好天气！</h1>
    </div>
    <button @click="refreshDIV">刷新上面的div的box</button>
    <input type="text" />
    <div class="txt" v-dyx-copy="testcopy">世界真好: the world is pretty!</div>
    <div class="txt" v-dyx-copy>世界真好: the world is pretty!</div>
    <div>
      <button
        v-dyx-long-press:2000="longpress"
        v-dyx-throttle:3500.immediate="shortClick"
        v-if="vm.ipt1"
        style="font-size: 20px"
      >
        <!-- 这里 2000 是传给指令的参数 -->
        长按出奇迹，短按节流
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  reactive,
  ref,
  watch,
  onMounted,
  onUnmounted,
  nextTick,
  defineAsyncComponent,
} from "vue";
import * as echarts from "echarts";
// 使用 defineAsyncComponent 创建一个异步组件
const MyChart = defineAsyncComponent(() => import("@/components/mychart.vue"));
const DoubleBar = defineAsyncComponent(
  () => import("@/components/doublebar.vue")
);

let testchart = ref(null);
let myChart: any = null;
let testcopy = ref<string>("测试复制");
const longpress = () => {
  vm.loading = true;
  setTimeout(() => {
    vm.loading = false;
    alert("触发长按回调函数！");
  }, 5000);
};
const shortClick = () => {
  console.log("请求接口！", new Date().getTime());
};
const vm = reactive<any>({
  ipt1: "21",
  ipt2: "",
  mockdataDoublebar: [],
  loading: false,
});
const initData = () => {
  setTimeout(() => {
    vm.mockdataDoublebar = [
      {
        name: "废矿物油",
        data: [90, 132, 101, 134, 220, 182, 191, 234, 191, 234, 132, 101],
        xdata: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
      },
      {
        name: "废油漆桶",
        data: [220, 182, 191, 234, 90, 132, 101, 134, 220, 191, 234, 191],
        xdata: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
      },
      {
        name: "废油桶",
        data: [150, 232, 90, 132, 101, 134, 220, 201, 154, 232, 90, 132],
        xdata: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
      },
      {
        name: "化验废液",
        data: [5, 232, 90, 32, 101, 134, 220, 201, 15, 754, 90, 132],
        xdata: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
      },
    ];
  }, 200);
};
const initChart = () => {
  if (!myChart) {
    myChart = echarts.init(testchart.value);
  }
  let option = {
    color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
    title: {
      text: "2023年",
    },
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
      data: ["Line 1", "Line 2", "Line 3", "Line 4", "Line 5"],
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
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Line 1",
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
              color: "rgb(128, 255, 165)",
            },
            {
              offset: 1,
              color: "rgb(1, 191, 236)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [140, 232, 101, 264, 90, 340, 250],
      },
      {
        name: "Line 2",
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
              color: "rgb(0, 221, 255)",
            },
            {
              offset: 1,
              color: "rgb(77, 119, 255)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [120, 282, 111, 234, 220, 340, 310],
      },
      {
        name: "Line 3",
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
              color: "rgb(55, 162, 255)",
            },
            {
              offset: 1,
              color: "rgb(116, 21, 219)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [320, 132, 201, 334, 190, 130, 220],
      },
      {
        name: "Line 4",
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
              color: "rgb(255, 0, 135)",
            },
            {
              offset: 1,
              color: "rgb(135, 0, 157)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [220, 402, 231, 134, 190, 230, 120],
      },
      {
        name: "Line 5",
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
              color: "rgb(255, 191, 0)",
            },
            {
              offset: 1,
              color: "rgb(224, 62, 76)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [220, 302, 181, 234, 210, 290, 150],
      },
    ],
  };
  myChart.setOption(option, true);
};
const www = (size: any) => {
  // console.log(size, "size1 变化之后执行的回调函数！size 是返回的参数。");
  myChart.resize();
};
const refreshDIV = () => {
  vm.loading = true;
  setTimeout(() => {
    vm.loading = false;
  }, 5000);
};
onMounted(() => {
  initChart();
  initData();
});
onUnmounted(() => {});
</script>
<style lang="scss" scoped>
.mb10 {
  margin-bottom: 10px;
}
.mycharts {
  height: 250px;
  width: 50vw;
  border: 1px solid;
  margin-left: 20px;
}
.ipt {
  width: 200px;
}
.txt {
  width: 200px;
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  border: 1px solid;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    color: #03f;
  }
}
.box {
  height: 20vh;
  width: 30vw;
  border: 1px solid;
  margin: 10px auto;
}
</style>