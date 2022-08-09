<template>
  <view class="page-wrapper">
    <view v-for="(group, gIndex) in list" :key="gIndex" class="demo-group">
      <demo-block :title="group.groupName" padding background="#fff">
        <view v-for="(item, index) in group.list" :key="index" class="demo-group-list">
          <view class="demo-group-item" @click="handleRouter(`/ui-demo/pages/vant-ui${item.prefix}${item.path}/index`)">
            <view class="demo-group-item__label">{{ item.title }}</view>
            <view class="demo-group-item__right-icon">
              <van-icon name="arrow" custom-class="demo-home-nav__icon" />
            </view>
          </view>
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script>
import DemoBlock from '@p/components/demo-block'
import list from '../config'
export default {
  components: {
    DemoBlock
  },
  data() {
    return {
      list
    }
  },
  methods: {
    handleRouter(url) {
      wx.navigateTo({ url })
    },
    onShareAppMessage() {
      return {
        title: 'UI 组件库演示',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.demo-group-list+.demo-group-list {
  margin-top: 10px;
}

.demo-group-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  margin-top: 8px;
  padding: 0 5px 0 15px;
  background: #F6F6F6;
  border-radius: 6px;
}

.demo-group-item__label {
  color: #222;
  font-size: 14px;
  font-weight: 500;
}

.demo-group-item__right-icon {
  width: 22px;
}
::v-deep .demo-home-nav__icon {
  color: rgb(182, 195, 210);
  font-weight: 900 !important;
}
</style>
