<template>
  <et-page :show="pageReady">
    <view class="page-wrapper is-custom-tab-bar">
      <view v-for="(group, gIndex) in list" :key="gIndex" class="demo-group">
        <demo-block :title="group.groupName" padding background="#fff">
          <view v-for="(item, index) in group.list" :key="index" class="demo-group-list">
            <view class="demo-group-item"
              @click="handleRouter(item)">
              <view class="demo-group-item__label">{{ item.title }}</view>
              <view class="demo-group-item__right-icon">
                <et-icon name="arrow-right" size="20" />
              </view>
            </view>
          </view>
        </demo-block>
      </view>
      <et-tab-bar></et-tab-bar>
    </view>
  </et-page>
</template>

<script>
import DemoBlock from '@p/components/demo-block';
import page from '@/mixins/page';
import list from '../config';
import { demo } from '@p/api/demo';
import { mapState } from 'vuex';

export default {
  components: {
    DemoBlock
  },
  mixins: [page],
  data() {
    return {
      list,
      visible2: false,
    };
  },
  computed: {
    ...mapState('app', ['windowHeight'])
  },
  async onLoad() {
    console.log('on home page load', this.$Route.query);
    console.log('=== app/windowHeight =====', this.windowHeight);
    await this.$onLaunched;

    await demo({ a: 1, b: 2 });
  },
  async onShow() {
    console.log('on home page show');
    await this.$onLaunched;
  },
  onReady() {
    console.log('on home page ready');
    this.pageReady = true;
  },
  onHide() {
    console.log('on home page hide');
  },
  methods: {
    handleRouter({ prefix, path }) {
      let url = '';
      if (prefix === 'sub-package-a') {
        url = `/ui-demo/sub-package-a${path}/index`;
      } else {
        url = `/ui-demo/pages/${prefix}${path}/index`;
      }
      if (path === '/navigation') {
        this.$Router.pushTab(url);
      } else {
        this.$Router.push(url);
      }
    },
    onShareAppMessage() {
      return {
        title: 'UI 组件库演示',
      };
    },
  },
};
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
