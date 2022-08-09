<template>
  <view class="page-wrapper">
    <demo-block title="基本用法">
      <van-search :value="value" placeholder="请输入搜索关键词" @change="onChange" @search="onSearch" />
    </demo-block>

    <demo-block title="事件监听">
      <van-search :value="value" show-action placeholder="请输入搜索关键词" @change="onChange" @search="onSearch"
        @cancel="onCancel" @clear="onClear" />
    </demo-block>

    <demo-block title="搜索框内容对齐">
      <van-search :value="value" input-align="center" placeholder="请输入搜索关键词" @change="onChange" />
    </demo-block>

    <demo-block title="禁用搜索框">
      <van-search disabled :value="value" placeholder="请输入搜索关键词" />
    </demo-block>

    <demo-block title="自定义背景色">
      <van-search :value="value" shape="round" background="#4fc08d" placeholder="请输入搜索关键词" @change="onChange" />
    </demo-block>

    <demo-block title="自定义按钮">
      <van-search :value="value" label="地址" shape="round" placeholder="请输入搜索关键词" use-action-slot  @change="onChange"
        @search="onSearch">
        <view slot="action" @tap="onClick">搜索</view>
      </van-search>
    </demo-block>

  </view>
</template>


<script>
import DemoBlock from '@p/components/demo-block'
export default {
  components: {
    DemoBlock
  },
  data() {
    return {
      value: '',
    }
  },
  methods: {
    onChange(e) {
      this.value = e.detail
    },
    onSearch() {
      if (this.value) {
        wx.showToast({
          title: '搜索：' + this.value,
          icon: 'none',
        });
      }
    },
    onClick() {
      if (this.value) {
        wx.showToast({
          title: '搜索：' + this.value,
          icon: 'none',
        });
      }
    },
    onCancel() {
      wx.showToast({
        title: '取消',
        icon: 'none',
      });
    },
    onClear() {
      wx.showToast({
        title: '清空',
        icon: 'none',
      });
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
