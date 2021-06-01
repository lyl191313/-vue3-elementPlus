<template>
  <div class="home">
    <Layout />
  </div>
</template>

<script>
// @ is an alias to /src
import Layout from "../../components/layouts/index";
export default {
  name: "Dashboard",
  components: {
    Layout
  }
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
}
</style>
