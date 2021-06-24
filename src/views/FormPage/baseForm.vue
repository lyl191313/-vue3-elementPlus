<template>
  <div>
    <Card>
      基础表单
      <Test>
        <template #default="{ itemx }">
          <span :style="{ color: 'green' }">{{ itemx }}</span>
        </template>
      </Test>
    </Card>
  </div>
</template>

<script>
import Test from "./test";
export default {
  components: {
    Test
  }
};
</script>

<style lang="less" scoped></style>
