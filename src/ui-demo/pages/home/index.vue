<template>
  <view class="page-wrapper is-custom-tab-bar">
    <et-page-progress-bar :percent="progressBarPercent"></et-page-progress-bar>
    <template v-if="pageReady">
      <view>子工程 vuex 数据: {{ msg }}</view>
      <et-cell title="弹窗 - 底部 - 圆角弹窗" is-link border @click="visible2 = true"></et-cell>
      <e-test msg="hello mini component"></e-test>
      <et-popup :visible.sync="visible2" position="bottom" round>
        <scroll-view scroll-y style="height:200px;">
        </scroll-view>
      </et-popup>
      <view v-for="(group, gIndex) in list" :key="gIndex" class="demo-group">
        <view class="gap"></view>
        <view class="demo-title">{{ group.groupName }}</view>
        <view class="gap"></view>
        <view class="demo-body">
          <view class="demo-ui-bar">
            <view class="demo-ui-name">custom-ui</view>
            <view class="demo-ui-vs">vs</view>
            <view class="demo-ui-name">vant-ui</view>
          </view>
          <view v-for="(item, index) in group.list" :key="index" class="demo-group-list">
            <view class="custom-ui">
              <view class="demo-group-item"
                @click="handleRouter(`/project-demo/pages/custom-ui${item.prefix}${item.path}/index`)">
                <view class="demo-group-item__label">{{ item.title }}</view>
                <view class="demo-group-item__right-icon">
                  <et-icon name="arrow-right" size="20" />
                </view>
              </view>
            </view>
            <view style="width: 20px;"></view>
            <view class="vant-ui">
              <view class="demo-group-item"
                @click="handleRouter(`/project-demo/pages/vant-ui${item.prefix}${item.path}/index`)">
                <view class="demo-group-item__label">{{ item.title }}</view>
                <view class="demo-group-item__right-icon">
                  <et-icon name="arrow-right" size="20" />
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </template>
    <et-tab-bar></et-tab-bar>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import page from '@/mixins/page'
import list from '../config'
export default {
  components: {},
  mixins: [page],
  data() {
    return {
      list,
      visible2: false,
    }
  },
  computed: {
    ...mapState('p-state', ['msg'])
  },
  async onLoad() {
    await this.$onLaunched
  },
  async onShow() {
    await this.$onLaunched
  },
  methods: {
    handleRouter(url) {
      wx.navigateTo({ url })
      this.$setPageOptions({ a: 1, b: '"c": {d: "2"}' })
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
@import '@p/assets/styles/index.scss';

.demo-group-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}
.custom-ui, .vant-ui {
  flex: 1;
}
.demo-ui-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.demo-ui-name {
  flex: 1;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
}
.demo-ui-vs {
  font-size: 50px;
  color: $uni-color-primary;
  transform: translateY(-5px);
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
  width: 28px;
}
</style>
