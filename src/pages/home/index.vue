<template>
  <vc-page :show="pageReady">
    <vc-navigation slot="nav" title="UI 组件演示库" mode="dark" />
    <view v-show="isCustomNavMounted" :class="['page-wrapper', isCustomTabBar ? 'is-custom-tab-bar' : null]">
      <view v-for="(group, gIndex) in list" :key="gIndex" class="demo-group">
        <demo-block :title="group.groupName" padding background="#fff">
          <view v-for="(item, index) in group.list" :key="index" class="demo-group-list">
            <view class="demo-group-item" @click="handleRouter(item)">
              <view class="demo-group-item__label">{{ item.title }}</view>
              <view class="demo-group-item__right-icon">
                <vc-icon name="arrow-right" size="20" />
              </view>
            </view>
          </view>
        </demo-block>
      </view>
      <view class="gap"></view>
      <vc-button @click="toggleGray">{{ isGray ? '取消置灰' : '置灰页面' }}</vc-button>
    </view>
  </vc-page>
</template>

<script>
import DemoBlock from '@/components/demo-block'
import list from '../config'
import { demo } from '@/api/demo'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    DemoBlock
  },
  data() {
    return {
      pageReady: false,
      isGray: false,
      list,
      visible2: false,
    }
  },
  computed: {
    ...mapState('app', ['windowHeight', 'isCustomNavMounted']),
    ...mapGetters('app', ['isCustomTabBar'])
  },
  async onLoad() {
    console.log('on home page load', this.$Route.query)
    console.log('=== app/windowHeight =====', this.windowHeight)
    await this.$onLaunched

    await demo({ a: 1, b: 2 })
  },
  async onShow() {
    await this.$onLaunched
    console.log('on home page show', this.$Route.query)
  },
  onReady() {
    this.pageReady = true
    console.log('on home page ready', this.$Route.query)
  },
  methods: {
    ...mapActions('app', ['setGray']),
    toggleGray() {
      this.isGray = !this.isGray
      this.setGray(this.isGray)
    },
    handleRouter({ prefix, path }) {
      const url = `/${prefix}${path}/index`
      this.$Router.push(url)
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
.demo-group-list {
  margin-top: 10px;
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
  color: var(--vc-color-primary);
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
