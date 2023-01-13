<template>
  <view :class="['vc-loading', vertical ? 'is-vertical' : null]">
    <view v-if="type === 'shine'" class="vc-loading--shine" :style="styled">
      <view v-for="index in array4" :key="index" class="vc-loading--shine-item"></view>
    </view>
    <!-- slot icon for custom -->
    <slot v-else-if="type === 'custom'" name="icon"></slot>
    <view v-else :class="['vc-loading__content', 'vc-loading--' + type]" :style="styled">
      <template v-if="type === 'spinner'">
        <view v-for="index in array12" :key="index" class="vc-loading--spinner-item"></view>
      </template>
    </view>
    <view class="vc-loading__text">
      <!-- slot default -->
      <slot />
    </view>
  </view>
</template>

<script>
export default {
  name: 'vc-loading',
  props: {
    // 加载类型
    type: {
      type: String,
      default: 'circular',
      validator(value) {
        return ['circular', 'spinner', 'shine'].includes(value)
      }
    },
    // 垂直布局
    vertical: {
      type: Boolean,
      default: false
    },
    // 图标及文案颜色
    color: null,
    // 图标大小
    size: {
      type: Number,
      default: 20
    },
  },
  data() {
    return {
      array4: Array.from({ length: 4 }),
      array12: Array.from({ length: 12 }),
    }
  },
  computed: {
    styled() {
      let style = ''
      style += `width: ${this.size}px; height: ${this.size}px;`
      if (this.color) {
        style += `color: ${this.color};`
      }
      return style
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/loading.scss';
</style>
