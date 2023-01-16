<template>
  <view :class="['vc-steps', 'is-' + direction]">
    <view v-for="(item, index) in options" :key="index"
      :class="['vc-steps__item', current >= 0 && index <= current ? 'is-active' : null]">
      <view v-if="item[labelProp]" class="vc-steps__label"
        :style="{ 'color': current >= 0 && index <= current && color ? color : '' }">{{ item[labelProp]}}</view>
      <view class="vc-steps__dot-container"
        :style="{ 'color': current >= 0 && index <= current && color ? color : '' }">
        <vc-icon v-if="inactiveIcon && index > current" :name="inactiveIcon" />
        <vc-icon v-else-if="activeIcon && current >= 0 && index <= current" :name="activeIcon"
          style="color: currentColor" />
        <view v-else class="vc-steps__dot"></view>
      </view>
      <view :class="['vc-steps__line', index < current ? 'is-active' : null]"
        :style="{ 'background-color': current >= 0 && index < current && color ? color : '' }"></view>
      <view class="vc-steps__title" :style="{ 'color': current >= 0 && index <= current && color ? color : '' }">
        {{ item[titleProp] }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'vc-steps',
  props: {
    // 渲染源数据
    options: {
      type: Array,
      default: () => []
    },
    // 高亮索引
    current: {
      type: Number,
      default: -1
    },
    // 布局方向 / 水平 - horizontal 垂直 - vertical
    direction: {
      type: String,
      default: 'horizontal'
    },
    // 高亮颜色
    color: {
      type: String
    },
    // 默认图标
    inactiveIcon: {
      type: String,
    },
    // 高亮图标
    activeIcon: {
      type: String,
    },
    // 标题属性映射
    titleProp: {
      type: String,
      default: 'title'
    },
    // 文本属性映射
    labelProp: {
      type: String,
      default: 'desc'
    }
  },
  computed: {
    colorStyled() {
      let style = ''
      if (this.activeColor) {
        style += `color: ${this.activeColor};`
      }
      return style
    },
    bgColorStyled() {
      let style = ''
      if (this.activeColor) {
        style += `background-color: ${this.activeColor};`
      }
      return style
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/steps.scss';
</style>
