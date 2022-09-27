<template>
  <view class="page-wrapper">

    <demo-block title="基础用法">
      <view class="icon-wrap">
        <view v-for="(item, index) in iconList" :key="index" class="icon-item et-hairline--surround">
          <et-icon :name="item"></et-icon>
          <view class="icon-name">{{item}}</view>
        </view>
      </view>
    </demo-block>

    <demo-block title="自定义颜色/大小">
      <view class="icon-wrap">
        <view v-for="(item, index) in iconList" :key="index" class="icon-item et-hairline--surround">
          <et-icon :name="item" color="#f60" size="30"></et-icon>
          <view class="icon-name">{{item}}</view>
        </view>
      </view>
    </demo-block>

  </view>
</template>

<script>
import DemoBlock from '@p/components/demo-block';
export default {
  components: {
    DemoBlock
  },
  data() {
    return {
      iconList: ['home', 'success', 'fail', 'share', 'share-link', 'share-app', 'search', 'cloud-upload', 'cross', 'cross-blank', 'close-fill', 'radio-off', 'radio-on', 'arrow-right', 'arrow-left', 'arrow-up', 'arrow-down', 'eye-on', 'eye-off', 'caret-down', 'caret-up', 'checkbox-on', 'checkbox-off', 'selected', 'checkbox-on-circle-fill', 'checkbox-on-fill', 'image', 'image-fail', 'identity-card-front', 'identity-card-back',]
    };
  }
};
</script>

<style lang="scss" scoped>
.icon-wrap {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin-top: -14px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 6px;
  background: #fff;
}

.icon-name {
  margin-top: 8px;
  color: $uni-text-color-sub;
  font-size: 12px;
  text-align: center;
}
</style>
