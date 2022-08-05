<template>
  <view v-show="initialized" :class="['et-transition', customClass, classes]" :style="styled" @click="$emit('click')" @transitionend="onTransitionEnd">
    <slot />
  </view>
</template>

<script>
  import transition from '@/mixins/transition'
  export default {
    name: 'et-transition',
    mixins: [transition],
    props: {
      // 动画名称
      animationName: {
        type: String,
        default: 'fade'
      },
      // 自定义 class
      customClass: null,
      // 自定义样式
      customStyle: null
    },
    computed: {
      styled() {
        let style = ''
        style += `transition-duration: ${this.currentDuration}ms;`
        if (!this.display) style += 'display: none;'
        return this.mergeStyles([style, this.customStyle])
      }
    }
  }
</script>

<style lang="scss" scoped>
.et-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}
</style>
