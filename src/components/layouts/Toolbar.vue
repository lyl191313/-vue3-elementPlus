<template>
  <div id="header">
    <div
      :class="$store.state.isCollapse ? 'header-title-close' : 'header-title'"
    >
      Admin
    </div>

    <div class="header-info">
      <div class="header-promptinfo">
        <i
          :class="
            $store.state.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
          "
          @click="changeCollapse"
        ></i>
      </div>
      <div class="header-userinfo">
        <div>
          <i class="el-icon-message">
            <em class="message-info">4</em>
          </i>
        </div>
        <div>
          <i class="el-icon-bell">
            <em class="bell-info">10</em>
          </i>
        </div>
        <div>
          <i class="el-icon-ship">
            <em class="ship-info">9</em>
          </i>
        </div>

        <el-dropdown @command="handleCommand">
          <div class="header-userinfo-drop">
            <el-avatar shape="circle" :size="30" :src="url"></el-avatar>
            <span>我是一只皮皮虾</span>
          </div>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="personalCenter"
                ><i class="el-icon-user"></i>个人中心</el-dropdown-item
              >
              <el-dropdown-item command="set" disabled
                ><i class="el-icon-setting"></i>设置</el-dropdown-item
              >

              <el-dropdown-item command="logout">
                <i class="el-icon-switch-button"></i>退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, getCurrentInstance } from "vue";
import { mapState, mapGetters, mapActions, mapMutations, useStore } from "vuex";
export default {
  setup() {
    const url = ref(
      "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    );
    const show = ref(false);
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const logOut = () => {
      localStorage.removeItem("token");
      proxy.$message.success("正在退出....");
      setTimeout(() => {
        proxy.$router.push("/");
      }, 800);
    };
    const changeCollapse = computed(() => ({
      ...mapMutations(["changeCollapse"])
    })).value.changeCollapse.bind({ $store: store });

    const handleCommand = command => {
      switch (command) {
        case "personalCenter":
          console.log("个人中心");
          break;
        case "set":
          console.log("设置");

          break;
        case "logout":
          console.log("退出登录");
          logOut();
          break;

        default:
          break;
      }
    };
    return {
      url,
      show,
      store,
      logOut,
      changeCollapse,
      handleCommand
    };
  }
};
</script>

<style lang="less" scoped>
#header {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.header-title {
  height: 60px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3580a8;
  color: #fff;
  transition: width 0.39s ease;
}
.header-title-close {
  height: 60px;
  width: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3580a8;
  color: #fff;
  overflow: hidden;
  transition: width 0.39s ease;
}
.header-info {
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-right: 20px;
  background-color: #3c8ebb;
  margin-right: 20px;
  .header-promptinfo {
    // width: 120px;
    i {
      margin-left: 20px;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .header-userinfo {
    // width: 160px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    div {
      i {
        position: relative;
        font-size: 22px;
        margin: 0 12px;
        margin-top: 15px;
        em {
          position: absolute;
          top: -10px;
          right: -8px;
          // width: 10px;
          padding: 1px 4px;
          // height: 10px;
          display: block;
          text-align: center;
          line-height: 15px;
          font-size: 10px;
          color: #fff;
          border-radius: 4px;
        }
      }
      .message-info {
        background-color: #00a276;
      }
      .bell-info {
        background-color: #f09c3d;
      }
      .ship-info {
        background-color: #cd514c;
      }
    }

    .el-avatar {
      // width: 30px;
      // height: 30px;
      margin-left: 20px;
    }
    span {
      display: inline-block;
      margin: 0 5px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
    }
    // i {
    //   font-size: 20px;
    //   height: 40px;
    //   line-height: 40px;
    // }
  }
}
.header-userinfo-drop {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown-menu__item {
  padding: 0 15px !important;
  border-bottom: 1px solid #f0f0f0;
  i {
    margin-right: 10px;
  }
}
</style>
