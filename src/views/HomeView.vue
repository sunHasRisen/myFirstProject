<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
const rrr = () => {
  console.log("rrr");
};
</script>

<template>
  <main>
    <TheWelcome />
    <div class="cssinit" v-dyx-click-wave>
      <div>www</div>
      <button>111111</button>
      尝试点击
    </div>
  </main>
</template>
<style lang="scss" scoped>
main {
  padding: 20px;
}
.cssinit {
  height: 150px;
  width: 100px;
  border-radius: 40%;
  background-color: rgb(38, 183, 240);
  text-align: center;
  position: relative;
}
</style>
