<template>
  <el-container>
    <el-header>
      <Toolbar />
    </el-header>
    <el-container>
      <el-aside><Navmenu /></el-aside>
      <el-main>
        <Breadcrumb />
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Navmenu from "./Navmenu";
import Breadcrumb from "./Breadcrumb";
import Toolbar from "./Toolbar";
export default {
  components: {
    Navmenu,
    Breadcrumb,
    Toolbar
  }
};
</script>

<style lang="less" scoped>
.el-header {
  color: #333;
  line-height: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 0%;
  background-color: #3c8ebb;
}

.el-aside {
  color: #333;
  line-height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 100%;
  height: 100%;
}

body .el-container {
  height: 100%;
  line-height: 100%;
}
.el-main {
  padding: 0;
  text-align: start;
  .content {
    padding: 5px 0px;
    height: 100%;
    .el-empty {
      height: 100%;
    }
  }
}
</style>
