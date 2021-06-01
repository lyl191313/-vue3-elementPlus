<template>
  <div id="breadcrumb">
    <div class="breadcrumb-left-title">
      {{ routerName.name }}
    </div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        :to="{ path: item.path }"
        v-for="(item, i) in breadCrumb()"
        :key="i"
        >{{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { mapState, mapGetters, mapActions, mapMutations, useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const breadCrumb = computed(() => ({
      ...mapState(["breadCrumb"])
    })).value.breadCrumb.bind({ $store: store });
    // 更改菜单栏收起展开
    const changeCollapse = computed(() => ({
      ...mapMutations(["changeCollapse"])
    })).value.changeCollapse.bind({ $store: store });
    // 当前路由名
    const routerName = computed(() => {
      let index = breadCrumb().length - 1;
      return breadCrumb()[index];
    });
    console.log(22132, breadCrumb());
    return {
      breadCrumb,
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
