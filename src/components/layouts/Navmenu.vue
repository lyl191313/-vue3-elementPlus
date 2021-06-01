<template>
  <el-row class="tac" type="flex">
    <el-col :span="24">
      <el-menu
        :uniqueOpened="true"
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="select"
        background-color="#212e32"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse()"
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
          <input type="text" placeholder="Search..." />
          <i class="el-icon-search"></i>
        </el-row>
        <el-row class="navmenu-title" v-if="!isCollapse()">
          MAIN NAVIGATION
        </el-row>
        <el-submenu
          :index="i.toString()"
          v-for="(item, i) in routerList"
          :key="item"
        >
          <template #title>
            <i
              :class="item.icon"
              :style="{
                color: Active == i ? 'rgb(255, 208, 75)' : 'rgb(255, 255, 255)'
              }"
            ></i>
            <span
              :style="{
                color: Active == i ? 'rgb(255, 208, 75)' : 'rgb(255, 255, 255)'
              }"
              >{{ item.menu.name }}</span
            >
          </template>
          <el-menu-item-group
            v-for="(childrenitem, k) in item.children"
            :key="k"
          >
            <el-menu-item :index="i.toString() + '-' + k.toString()">{{
              childrenitem.name
            }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import { defineComponent, ref, computed, getCurrentInstance } from "vue";
import { mapState, mapGetters, mapActions, mapMutations, useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    // 默认激活
    const defaultActive = ref("0-0");
    // 菜单激活
    const Active = ref("0");
    const store = useStore();
    const value = ref(true);
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const routerList = ref([
      {
        icon: "el-icon-s-home",
        menu: { name: "Dashboard", path: "/index" },
        children: [
          { name: "工作台", path: "/workbench" },
          { name: "分析页", path: "/analysis" }
        ]
      },
      {
        icon: "el-icon-edit-outline",
        menu: { name: "表单页", path: "/formPage" },
        children: [
          { name: "基础表单", path: "/baseForm" },
          { name: "分布表单", path: "/distributionForm" },
          { name: "高级表单", path: "/advancedForm" }
        ]
      }

      // {
      //   icon: "el-icon-s-grid",
      //   name: "列表页",
      //   children: ["查询表格", "标准列表", "卡片列表", "搜索列表"]
      // },
      // {
      //   icon: "el-icon-document",
      //   name: "详情页",
      //   children: ["基础详情页", "高级详情页"]
      // },
      // {
      //   icon: "el-icon-success",
      //   name: "结果页",
      //   children: ["成功", "失败"]
      // }
    ]);
    // 打开菜单
    const handleOpen = (key, keyPath) => {
      let selectKey = "";
      let selectKeypathArr = [];
      Active.value = key.toString();
      defaultActive.value = key.toString() + "-" + "0";
      selectKeypathArr.push(key);
      selectKey = key + "-" + "0";
      selectKeypathArr.push(selectKey);
      select(selectKey, selectKeypathArr);
      // console.log(key, keyPath);
    };
    // 关闭菜单
    const handleClose = (key, keyPath) => {
      Active.value = "-1";
      // console.log(key, keyPath);
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
    const select = (index, indexPath) => {
      Active.value = indexPath[0];
      console.log(index, indexPath);
      let navList = new Array();
      let catalogue = routerList.value[+indexPath[1].split("-")[0]].menu;
      navList.push(catalogue);
      let subdirectory =
        routerList.value[+indexPath[1].split("-")[0]].children[
          +indexPath[1].split("-")[1]
        ];
      navList.push(subdirectory);
      setBreadCrumb(navList);
      proxy.$router.push(subdirectory.path);
    };
    handleOpen("0", ["0"]);

    return {
      defaultActive,
      Active,
      store,
      value,
      router,
      proxy,
      routerList,
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
  //   min-width: 200px !important;
  //   max-width: 200px;
}
.el-menu--collapse {
  border: none !important;
}
.navmenu-head {
  width: 100%;
  height: 58px;
  transition: width 0.39s ease;
  color: #fff;
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: center;
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
    padding-left: 12px;
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
    &::-webkit-input-placeholder {
      padding-left: 10px;
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
