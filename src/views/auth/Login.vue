<template>
  <div id="all">
    <div id="login-box">
      <h1>Login</h1>
      <div class="form">
        <div class="item">
          <i class="el-icon-user" aria-hidden="true"></i>
          <el-input v-model="name" type="text" placeholder="admin"></el-input>
        </div>
        <div class="item">
          <i class="el-icon-key" aria-hidden="true"></i>
          <el-input
            v-model="password"
            placeholder="admin123"
            show-password
            class="aa"
          ></el-input>
        </div>
      </div>
      <Debounce :time="1000" isDebounce>
        <button @click="register()" @keyup.enter="register">Login</button>
      </Debounce>
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from "vue";
// import { debounce } from "../../composition/useDebounce";
export default {
  setup() {
    const name = ref("");
    const password = ref("");
    const { proxy, appContext } = getCurrentInstance();
    // 导出挂载的$debounce
    const { $debounce } = appContext.config.globalProperties;
    const keyupEnter = () => {
      document.onkeydown = e => {
        let body = document.getElementsByTagName("body")[0];
        let pwdInput = document.getElementsByClassName("el-input__inner")[1];
        if (
          e.keyCode === 13 &&
          e.target.baseURI.match(/login/) &&
          (e.target === body || e.target === pwdInput)
        ) {
          console.log("enter"); // match(此处应填写文件在浏览器中的地址，如 '/home/index')

          register();
        }
      };
    };
    keyupEnter();
    const register = $debounce(() => {
      if (name.value == "admin" && password.value === "admin123") {
        proxy.$message.success("登陆成功，正在跳转...");
        localStorage.setItem(
          "token",
          "qwheqwbfuafubasuifbaiuhwfiahwfianufihwa"
        );
        setTimeout(() => {
          proxy.$router.push("/index");
        }, 800);
      } else if (!name.value || !password.value) {
        proxy.$message.error("请输入账号密码");
      } else {
        proxy.$message.error("登陆失败，请重试!");
      }
    }, 500);
    return {
      keyupEnter,
      name,
      password,
      proxy,
      appContext,
      register
    };
  }
};
</script>

<style lang="less" scoped>
#login-box {
  width: 30%;
  height: auto;
  margin: 0 auto;
  //   margin-top: 10%;
  position: relative;
  top: 30%;
  text-align: center;
  background: #00000080;
  padding: 20px 50px;
  border-radius: 10px;
}

#login-box h1 {
  color: #ffffff;
}

#login-box .form {
  margin-top: 50px;
}

#login-box .form i {
  font-size: 18px;
  color: #ffffff;
  margin-right: 5px;
}

#login-box .form .item {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.el-input {
  width: 200px;
}

/deep/ .el-input__inner {
  width: 180px;
  font-size: 18px;
  border: 0;
  border-bottom: 2px solid #ffffff;
  padding: 5px 10px;
  background: #ffffff00;
  color: #ffffff;
  outline: none;
}
#login-box button {
  margin-top: 25px;
  width: 200px;
  height: 30px;
  font-size: 20px;
  font-weight: 700;
  border: 0;
  background-image: linear-gradient(
    to right,
    #b8cbb8 0%,
    #b8cbb8 0%,
    #ddbaee 0%,
    #e8a8ee 33%,
    #b8d9f8 66%,
    #59bcf5 100%
  );
  border-radius: 15px;
}
html {
  height: 100%;
}
body {
  height: 100%;
}
#all {
  height: 100%;
  //   background: url(../../assets/wallhaven-2em38y.jpeg);
  background: url("../../assets/wallhaven-2em38y.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
