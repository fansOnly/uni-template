<!--
 * 本组件需要配合微信的 API: onReachBottom 使用
-->
<template>
  <view class="scroll-list-wrap">
    <template v-if="!empty">
      <!-- 内容插槽 -->
      <slot></slot>

      <!-- 加载提示 -->
      <view class="scroll-list__load">
        <et-loading v-if="isLoading" type="spinner">{{loadingContent}}</et-loading>
        <view v-if="finished" class="scroll-list__load--finished">{{loadingContent}}</view>
      </view>
    </template>
    <view v-if="empty && !firstLoad" :style="emptyStyle">
      <et-empty :icon="icon" :tip="emptyText" />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'et-scroll-list',
    props: {
      // 初次加载数据
      firstLoad: {
        type: Boolean,
        default: true
      },
      // 是否加载中
      isLoading: {
        type: Boolean,
        default: false
      },
      // 数据加载是否已完成
      finished: {
        type: Boolean,
        default: false
      },
      // 是否空数据
      empty: {
        type: Boolean,
        default: false
      },
      // 是否空数据
      emptyText: {
        type: String,
        default: '暂无数据'
      },
      // 显示图标 - 透传 empty 组件
      icon: {
        type: String,
        default: 'icon/icon-empty.png'
      },
      // 请求完成显示文本
      finishText: {
        type: String,
        default: '没有更多了'
      },
      // 请求中显示文本
      loadingText: {
        type: String,
        default: '加载中...'
      },
      // 自定义空状态样式
      emptyStyle: {
        type: String,
        default: 'padding-top: 24rpx'
      }
    },
    computed: {
      loadingContent() {
        if (this.finished === true) {
          return this.finishText
        }

        return this.isLoading === true ? this.loadingText : '加载完成'
      },
    }
  }
</script>

<style lang="scss" scoped>
  .scroll-list-wrap {
    padding-bottom: env(safe-area-inset-bottom);
  }
  .scroll-list__load {
    padding: $uni-spacing-12 $uni-spacing-16;
    text-align: center;
  }
  .scroll-list__load--finished {
    color: $uni-text-color-sub;
    font-size: $uni-font-size-14;
    text-align: center;
  }
</style>
