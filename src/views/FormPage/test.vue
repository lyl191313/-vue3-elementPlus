<template>
  <div>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <!-- {{ item }} -->
        <slot :itemx="item"></slot>
      </li>
    </ul>
    <p><slot :test="aa"> </slot></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: ["1", "2", "3"],
      aa: "123"
    };
  }
};
</script>

<style lang="less" scoped></style>
