<template>
  <view class="page-wrapper">
    <demo-block title="基础用法" padding>
      <van-button type="primary" @click="onClickShow">
        显示遮罩层
      </van-button>
      <van-overlay :show="show" @click="onClickHide" />
    </demo-block>

    <demo-block title="嵌入内容" padding>
      <van-button type="primary" @click="onClickShowEmbedded">
        嵌入内容
      </van-button>
      <van-overlay :show="showEmbedded" @click="onClickHideEmbedded">
        <view class="wrapper">
          <div class="block" catch:tap="noop"></div>
        </view>
      </van-overlay>
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
      show: false,
      showEmbedded: false,
    }
  },
  methods: {
    onClickShow() {
      this.show = true
    },

    onClickHide() {
      this.show = false
    },

    onClickShowEmbedded() {
      this.showEmbedded = true
    },

    onClickHideEmbedded() {
      this.showEmbedded = false
    },

    noop() { },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

::v-deep .block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>
