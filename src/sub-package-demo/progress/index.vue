<template>
  <view class="page-wrapper">
    <view class="gap"></view>

    <vc-button style="margin-right:12px;" @click="increment">递增 +10</vc-button>
    <vc-button @click="decrement">递减 -10</vc-button>

    <demo-block title="基础用法" padding background="#fff">
      <vc-progress :percentage="value" />
    </demo-block>

    <demo-block title="自定义样式" padding background="#fff">
      <vc-progress :percentage="value" stroke-width="26" text-inside />
      <view class="gap"></view>
      <vc-progress :percentage="value" stroke-width="26" color="#f60" text-inside />
    </demo-block>

    <demo-block title="格式化文本" padding background="#fff">
      <vc-progress :percentage="value" stroke-width="26" text-inside :format="formatter" />
    </demo-block>

    <demo-block title="自定义插槽" padding background="#fff">
      <vc-progress :percentage="value">
        <template #default="{ percentage }">已完成{{ percentage }}%</template>
      </vc-progress>
    </demo-block>

  </view>
</template>

<script>
import DemoBlock from '@/sub-package-demo/components/demo-block'

export default {
  components: {
    DemoBlock
  },
  data() {
    return {
      value: 10,
      value2: 57,
      value3: 87,
    }
  },
  methods: {
    formatter(val) {
      return val >= 50 ? '小' : '大'
    },
    increment() {
      if (this.value + 10 >= 100) {
        this.value = 100
      } else {
        this.value += 10
      }
    },
    decrement() {
      if (this.value - 10 <= 0) {
        this.value = 0
      } else {
        this.value -= 10
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
