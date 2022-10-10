<template>
  <view v-if="display" :class="['vc-transition', classes]" :style="styled" @click="$emit('click')" @transitionend="onTransitionEnd">
    <slot />
  </view>
</template>

<script>
import transition from '../mixins/transition';

export default {
  name: 'vc-transition',
  mixins: [transition],
  props: {
    // 动画名称
    animationName: {
      type: String,
      default: 'fade'
    },
    // 自定义样式
    customStyle: null
  },
  computed: {
    styled() {
      let style = '';
      style += `transition-duration: ${this.currentDuration}ms;`;
      if (!this.display) style += 'display: none;';
      return style + this.customStyle;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../common/style/transition.scss";
</style>
