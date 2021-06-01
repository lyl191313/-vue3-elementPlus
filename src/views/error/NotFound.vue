<template>
  <div id="notfound-page" @click="$router.push('/')"></div>
</template>

<script>
export default {
  name: "notfound"
};
</script>

<style lang="less" scoped>
#notfound-page {
  height: 100%;
  background: url("../../assets/error.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
</style>
