<template>
  <view class="et-tab-bar et-hairline--top" :style="styled">
    <view v-for="(item, index) in tabBarList" :key="index" class="et-tab-bar-item" @click="onSwitchTab(item)">
      <et-image :src="`/${current === item.pagePath ? item.selectedIconPath : item.iconPath}`" width="24" height="24" full-path />
      <view class="et-tab-bar__text" :style="{'color': current === item.pagePath ? tabBarStyle.selectedColor : tabBarStyle.color}">{{ item.text }}</view>
    </view>
  </view>
</template>

<script>
import cssVariables from '@/common/lib/theme';
import { tabBarList, tabBarStyle } from '../common/tab-bar';

export default {
  name: 'et-tab-bar',
  data() {
    return {
      tabBarList: Object.freeze(tabBarList),
      tabBarStyle: Object.freeze(tabBarStyle)
    };
  },
  computed: {
    current() {
      const pages = getCurrentPages();
      if (!pages.length) return;
      const { route } = pages[pages.length - 1];
      return route;
    },
    styled() {
      let style = `z-index: ${+cssVariables.tabBarZIndex};`;
      style += `background: ${tabBarStyle.backgroundColor};`;
      style += `border-color: ${tabBarStyle.borderStyle};`;
      return style;
    },
  },
  methods: {
    onSwitchTab({ pagePath }) {
      uni.switchTab({ url: '/' + pagePath });
    }
  },
};
</script>

<style lang="scss" scoped>
.et-tab-bar {
  display: flex;
  align-items: center;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  height: $uni-tab-bar-height;
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 0 10rpx 0 rgba(0, 0, 0, 0.05);
}

.et-tab-bar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.et-tab-bar__text {
  margin-top: 10rpx;
  font-size: 12px;
  color: $uni-text-color-sub;
  line-height: 1;
}
</style>
