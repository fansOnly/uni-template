<template>
  <view class="page-wrapper is-custom-tab-bar">
    <et-page-progress-bar :percent="progressBarPercent"></et-page-progress-bar>
    <template v-if="pageReady">
      <view v-for="(group, gIndex) in list" :key="gIndex" class="demo-group">
        <view class="gap"></view>
        <view class="demo-title">{{ group.groupName }}</view>
        <view class="gap"></view>
        <view class="demo-body">
          <view v-for="(item, index) in group.list" :key="index" class="demo-group-list">
            <view class="uni-ui">
              <view class="demo-group-item"
                @click="handleRouter(`/ui-demo/pages/uni-ui${item.prefix}${item.path}/index`)">
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
.uni-ui, .vant-ui {
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
