<template>
  <div class="stat-result text-start">
    <div class="border-bottom border-top bg-light">
      <h2 class="flex-fill">統計</h2>
      <el-button>重計</el-button>
    </div>
    <div>
      <span>壞</span>
      <div>{{bad_count}}</div>
    </div>
    <div>
      <span>好-分類1</span>
      <div>{{good_class1_count}}</div>
    </div>
    <div>
      <span>好-分類2</span>
      <div>{{good_class2_count}}</div>
    </div>
    <div>
      <span>好-分類3</span>
      <div>{{good_class3_count}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bad_count: {
      type: Number,
      default: 0
    },
    good_class1_count: {
      type: Number,
      default: 0
    },
    good_class2_count: {
      type: Number,
      default: 0
    },
    good_class3_count: {
      type: Number,
      default: 0
    },
  },
}
</script>

<style lang="scss" scoped>
.stat-result {
  margin-top: 100px;
  div {
    display: flex;
    flex-flow: row;
    background-color: rgb(218, 236, 222);
    span {
      font-size: 1.5rem;
      width: 120px;
    }
    div {
      font-size: 1.8rem;
    }
  }
}
</style>