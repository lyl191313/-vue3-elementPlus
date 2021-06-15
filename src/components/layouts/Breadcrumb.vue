<template>
  <div id="breadcrumb">
    <div class="breadcrumb-left-title">
      {{ routerName.matched[0].name }}
    </div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        :to="{ path: item.path }"
        v-for="(item, i) in routerName.matched"
        :key="i"
        >{{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { defineComponent, ref, computed, getCurrentInstance } from "vue";
import { mapState, mapGetters, mapActions, mapMutations, useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const { proxy } = getCurrentInstance();

    // 更改菜单栏收起展开
    const changeCollapse = computed(() => ({
      ...mapMutations(["changeCollapse"])
    })).value.changeCollapse.bind({ $store: store });
    // 当前路由信息
    const routerName = computed(() => {
      return proxy.$route;
    });

    return {
      proxy,
      routerName,
      store,
      changeCollapse
    };
  }
};
</script>

<style lang="less" scoped>
#breadcrumb {
  height: 50px;
  line-height: 50px;
  background-color: #ecf0f4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .breadcrumb-left-title {
    margin-left: 20px;
    font-size: 20px;
    color: #283260;
  }
  .el-breadcrumb {
    margin-right: 20px;
  }
}
</style>
