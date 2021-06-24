<template>
  <div @click="requestData">
    <Card>
      测试用的ID是{{ testData }}
      <el-button>点我拿id</el-button>
    </Card>
  </div>
</template>

<script>
import { post } from "../../network/request";
import { ref, getCurrentInstance } from "vue";

export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const testData = ref(null);
    const requestData = () => {
      post("/users", {})
        .then(res => {
          let { data } = res;
          testData.value = data.id;
          console.log(123, res);
        })
        .catch(err => {
          console.log(321, err);
        });
    };
    return {
      proxy,
      testData,
      requestData
    };
  }
};
</script>

<style lang="less" scoped></style>
