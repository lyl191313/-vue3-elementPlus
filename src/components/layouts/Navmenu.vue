<template>
  <el-row class="tac" type="flex">
    <el-col :span="24">
      <el-menu
        :uniqueOpened="true"
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="select"
        background-color="#212e32"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse()"
        router
      >
        <el-row class="navmenu-head">
          <img
            src="../../assets/logo.png"
            alt=""
            class="head-portrait"
            @click="changeCollapse"
          />
          <div class="head-name" v-if="!isCollapse()">
            <div>Alexander Eli</div>
            <div class="online-status">
              <i></i>
              <span>Online</span>
            </div>
          </div>
        </el-row>
        <el-row class="navmenu-search" v-if="!isCollapse()">
          <input type="text" placeholder="Search..." v-model="searchValue" />
          <i class="el-icon-search" @click="searchMenu()"></i>
        </el-row>
        <el-row class="navmenu-title" v-if="!isCollapse()">
          MAIN NAVIGATION
        </el-row>
        <el-submenu :index="item.path" v-for="(item, i) in asyncRoute" :key="i">
          <template #title>
            <i
              :class="item.icon"
              :style="{
                color:
                  item.path == Active
                    ? 'rgb(255, 208, 75)'
                    : 'rgb(255, 255, 255)'
              }"
            ></i>
            <span
              :style="{
                color:
                  item.path == Active
                    ? 'rgb(255, 208, 75)'
                    : 'rgb(255, 255, 255)'
              }"
              >{{ item.name }}</span
            >
          </template>
          <el-item-group v-for="(childrenitem, k) in item.children" :key="k">
            <el-menu-item :index="childrenitem.path">{{
              childrenitem.name
            }}</el-menu-item>
          </el-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import { defineComponent, ref, computed, getCurrentInstance } from "vue";
import { mapState, mapGetters, mapActions, mapMutations, useStore } from "vuex";
import { useRouter } from "vue-router";
import { asyncRoute } from "../../router/index";
import testVue from "../../views/FormPage/test.vue";
export default {
  setup() {
    // 菜单激活
    const Active = ref("");
    const store = useStore();
    const value = ref(true);
    const router = useRouter();
    const searchValue = ref("");
    const testArr = ref([
      "工作台",
      "分析页",
      "基础表单",
      "分布表单",
      "高级表单"
    ]);
    const { proxy } = getCurrentInstance();
    const resetActiveRoute = newPath => {
      if (newPath) {
        Active.value = newPath;
      } else {
        Active.value = proxy.$route.matched[0].path;
      }
    };
    resetActiveRoute();
    //搜索菜单
    const searchMenu = () => {
      let arr = [];
      let arrx = [];
      asyncRoute.forEach((item, i) => {
        arr = arr.concat(item.children);
      });

      for (var i = 0; i < arr.length; i++) {
        if (arr[i].name.match(searchValue.value) !== null) {
          arrx.push(arr[i]);
        }
      }
      if ((arrx.length = 1)) {
        proxy.$router.replace(arrx[0].path);

        //  调转到匹配搜索的地址同时找打对应的菜单并且展开
        asyncRoute.filter((item, i) => {
          item.children.find(
            itemchildren => itemchildren.path == arrx[0].path
          ) && resetActiveRoute(item.path);
        });
      }
    };
    // 打开菜单
    const handleOpen = (key, keyPath) => {
      resetActiveRoute(key);
      proxy.$router.replace(key);
    };
    // 关闭菜单
    const handleClose = (key, keyPath) => {
      Active.value = "";
    };
    // 用于判断菜单栏折叠状态
    const isCollapse = computed(() => ({
      ...mapState(["isCollapse"])
    })).value.isCollapse.bind({ $store: store });

    // 更改菜单栏收起展开
    const changeCollapse = computed(() => ({
      ...mapMutations(["changeCollapse"])
    })).value.changeCollapse.bind({ $store: store });
    // 建立面包屑导航
    const setBreadCrumb = computed(() => ({
      ...mapMutations(["setBreadCrumb"])
    })).value.setBreadCrumb.bind({ $store: store });
    // 选择选项
    const select = (index, indexPath) => {};

    return {
      asyncRoute,
      Active,
      store,
      value,
      router,
      searchValue,
      testArr,
      proxy,
      resetActiveRoute,
      searchMenu,
      handleOpen,
      handleClose,
      isCollapse,
      changeCollapse,
      setBreadCrumb,
      select
    };
  }
};
</script>

<style lang="less" scoped>
.el-row.el-row--flex.tac {
  // min-width: 200px;
  height: 100% !important;
  background-color: #e9eef3;
}
.el-menu.el-menu-vertical-demo {
  height: 100% !important;
}
.el-menu-item {
  // min-width: 200px !important;
  // max-width: 200px;
}
.el-menu--collapse {
  border: none !important;
}
.navmenu-head {
  // width: 100%;
  height: 58px;
  transition: width 0.4s ease-in-out;
  color: #fff;

  .head-portrait {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fff;
    margin-left: 12px;
    margin-top: 12px;
  }
  .head-name {
    margin-top: 12px;
    width: 124px;
    height: 40px;
    // display: inline-block;
    // text-align: center;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: 24px;
    .online-status {
      margin-top: 5px;
      font-size: 14px;
      i {
        display: inline-block;
        width: 10px;
        background-color: #13ce66;
        height: 10px;
        border-radius: 50%;
      }
      span {
        margin-left: 5px;
        font-size: 12px;
      }
    }
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px; //宽度自己掌握
  height: 100%;
}
.navmenu-search {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    display: inline-block;
    width: 164px;
    height: 30px;
    margin: 5px 0;
    background-color: #374950;
    border: none;
    border-radius: 5px;
    outline: none;
    padding-left: 10px;
    &::-webkit-input-placeholder {
      // padding-left: 10px;
      color: #9ba7b0;
    }
  }
  i {
    position: absolute;
    right: 30px;
    color: #9ba7b0;
  }
}
.navmenu-title {
  margin: 5px 0;
  color: #5d6568;
  font-size: 12px;
  background-color: #1a2225;
  height: 30px;
  width: 1005;
  line-height: 30px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 18px;
}
</style>
