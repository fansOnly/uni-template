<template>
  <view class="vc-skeleton">
    <view v-if="avatar" class="vc-skeleton__avatar"
      :style="{ 'width': avatarSize + 'px', 'height': avatarSize + 'px', 'border-radius': avatarShape === 'round' ? '999px' : 0 }">
    </view>
    <view class="vc-skeleton__content">
      <view v-if="title" class="vc-skeleton__row" :style="{ 'width': titleWidth }"></view>
      <view v-for="(_, index) in rows" :key="index" class="vc-skeleton__row"
        :style="{ 'width': isArray ? rowWidth[index] : rowWidth }"></view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'vc-skeleton',
  props: {
    row: {
      type: Number,
      default: 0
    },
    rowWidth: {
      type: [String, Array],
      default: '100%'
    },
    title: {
      type: Boolean,
      default: false
    },
    titleWidth: {
      type: String,
      default: '40%'
    },
    avatar: {
      type: Boolean,
      default: false
    },
    avatarSize: {
      type: Number,
      default: 32
    },
    avatarShape: {
      type: String,
      default: 'round'
    }
  },
  computed: {
    rows() {
      return new Array(this.row)
    },
    isArray() {
      return this.rowWidth instanceof Array
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/skeleton.scss';
</style>
