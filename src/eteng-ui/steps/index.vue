<template>
  <view :class="['et-steps', 'et-steps--'+direction]">
    <view v-for="(item, index) in options" :key="index" :class="['et-step-item', 'et-step-item--' + direction]">
      <view v-if="item[descProp]" class="et-step__desc" :style="{'color': index <= active ? activeColor : '#909090'}">{{
      item[descProp] }}</view>
      <view class="et-step__circle"
        :style="{'background': index <= active ? activeColor : '#d4d4d4', 'color': index <= active ? activeColor : '#d4d4d4'}">
      </view>
      <view v-if="index < options.length - 1" class="et-step__line"
        :style="{'background': index < active ? activeColor : '#ebebeb'}"></view>
      <view class="et-step__title" :style="{'color': index <= active ? activeColor : '#909090'}">{{ item[textProp] }}
      </view>
    </view>
  </view>
</template>

<script>
import cssVariables from '@/shared/css-variables'
export default {
  name: 'et-steps',
  props: {
    // 渲染源数据
    options: {
      type: Array,
      default: () => []
    },
    // 高亮索引
    active: {
      type: Number,
      default: -1
    },
    // 布局方向 / 水平 - horizontal 垂直 - vertical
    direction: {
      type: String,
      default: 'horizontal'
    },
    // 高亮颜色
    activeColor: {
      type: String,
      default: cssVariables.primaryColor
    },
    // 标题属性映射
    textProp: {
      type: String,
      default: 'title'
    },
    // 文本属性映射
    descProp: {
      type: String,
      default: 'desc'
    }
  }
}
</script>

<style lang="scss" scoped>
.et-steps--horizontal {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.et-step-item--horizontal {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  z-index: 2;

  &:first-child {

    .et-step__circle,
    .et-step__title,
    .et-step__desc {
      transform: none;
    }
  }

  &:last-child {
    position: absolute;
    right: 0;
    width: auto;
    align-items: flex-end;

    .et-step__circle,
    .et-step__title,
    .et-step__desc {
      transform: none;
    }

    .et-step__line {
      width: 0;
    }
  }

  .et-step__desc {
    font-size: 24rpx;
    transform: translateX(-50%);
  }

  .et-step__title {
    font-size: 24rpx;
    color: #909090;
    transform: translateX(-50%);
  }

  .et-step__circle {
    box-sizing: border-box;
    width: 16rpx;
    height: 16rpx;
    margin: 4px 0;
    background: #D4D4D4;
    border-width: 4rpx;
    border-style: solid;
    border-radius: 100%;
    transform: translateX(-50%);
  }

  .et-step__line {
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    height: 4rpx;
    background: #D4D4D4;
    /* transform: translateY(50%); */
    /* transition: all ease 0.3s; */
    z-index: -1;
  }
}

.et-step-item--vertical {
  position: relative;
  padding-left: 42rpx;

  &:not(:last-child) {
    padding-bottom: 26rpx;
  }

  .et-step__desc,
  .et-step__title {
    color: #909090;
    font-size: $uni-font-size-14;
    line-height: 48rpx;
  }

  .et-step__circle {
    position: absolute;
    top: 15rpx;
    left: 0;
    width: 18rpx;
    height: 18rpx;
    border-radius: 100%;
    z-index: 2;
  }

  .et-step__line {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 9rpx;
    width: 1rpx;
    z-index: 1;
    transform: translateY(18rpx);
  }
}
</style>
