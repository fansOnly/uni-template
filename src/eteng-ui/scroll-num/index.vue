<template>
  <view class="et-scroll-num-wrapper">
    <view v-for="(i, k) in numbers" :key="k" class="et-scroll-num">
      <animation-num v-if="isNumber(i)" :value="i" :once="once" :height="height" :custom-class="customClass" :custom-style="customStyle"></animation-num>
      <view v-else class="et-scroll-dot">{{i}}</view>
    </view>
  </view>
</template>

<script>
import AnimationNum from './num.vue';
export default {
  name: 'et-scroll-num',
  components: {
    AnimationNum,
  },
  props: {
    // 组件高度 - 透传
    height: {
      type: [String, Number],
      default: 30,
    },
    // 数值
    value: {
      type: Number,
      default: '',
    },
    // 是否立即执行 - 透传
    once: {
      type: Boolean,
      default: true,
    },
    // 动画时长 ms - 透传
    duration: {
      type: Number,
      default: 100,
    },
    // 自定义 class - 透传
    customClass: null,
    // 自定义 style，作用于字体内容 - 透传
    customStyle: null,
  },
  computed: {
    numbers() {
      return String(this.value).split('');
    },
  },
  methods: {
    isNumber(val) {
      return !Number.isNaN(+val) && typeof +val === 'number';
    },
  },
};
</script>

<style lang="scss" scoped>
  .et-scroll-num-wrapper {
    display: inline-flex;
    align-items: center;
  }
</style>
