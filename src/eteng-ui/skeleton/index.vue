<template>
<view class="et-skeleton">
  <view v-if="avatar" class="et-skeleton__avatar" :style="{ 'width': avatarSize+'px', 'height': avatarSize+'px', 'border-radius': avatarShape === 'round' ? '999px' : 0 }"></view>
  <view class="et-skeleton-right">
    <view v-if="title" class="et-skeleton__title" :style="{ 'width': titleWidth }"></view>
    <view v-for="(_, index) in rows" :key="index" class="et-skeleton__row" :style="{ 'width': isArray ? rowWidth[index] : rowWidth }"></view>
  </view>
</view>
</template>

<script>
export default {
  name: 'et-skeleton',
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
  data() {
    return {
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
.et-skeleton {
  display: flex;
  animation: blink 1.2s ease-in-out infinite;
}
.et-skeleton__avatar {
  margin-right: 16rpx;
  background: $uni-bg-skeleton;
}
.et-skeleton-right {
  flex: 1;
}
.et-skeleton__title {
  height: 32rpx;
  margin-top: 16rpx;
  background: $uni-bg-skeleton;
}
.et-skeleton__row {
  height: 32rpx;
  margin-top: 16rpx;
  background: $uni-bg-skeleton;
}
@keyframes blink {
  50% {
    opacity: .6;
  }
}
</style>
