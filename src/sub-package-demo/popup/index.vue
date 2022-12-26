<template>
  <view class="page-wrapper" style="height: 2000px">

    <demo-block title="基础用法 - 锁定滚动穿透" padding>
      <vc-cell title="弹窗 - 淡入" is-link border @click="(visible4 = true)"></vc-cell>
      <vc-cell title="弹窗 - 顶部弹出" is-link border @click="(position = 'top', visible = true)"></vc-cell>
      <vc-cell title="弹窗 - 左侧弹出" is-link border @click="(position = 'left', visible = true)"></vc-cell>
      <vc-cell title="弹窗 - 右侧弹出" is-link border @click="(position = 'right', visible = true)"></vc-cell>
      <vc-cell title="弹窗 - 底部弹出" is-link @click="(position = 'bottom', visible = true)"></vc-cell>
    </demo-block>

    <demo-block title="进阶用法" padding>
      <vc-cell title="弹窗 - 底部 - 圆角弹窗" is-link border @click="(position = 'bottom', visible2 = true)"></vc-cell>
      <vc-cell title="弹窗 - 底部 - 携带标题" is-link border @click="visible3 = true"></vc-cell>
      <vc-cell title="弹窗 - 居中 - 携带标题" is-link @click="visible5 = true"></vc-cell>
    </demo-block>

    <vc-popup :visible.sync="visible4" position="center">
      <view class="box"></view>
    </vc-popup>

    <vc-popup :visible.sync="visible5" title="暂时只支持绑定下列银行" position="center" round border>
      <view class="bank-popup-wrapper">
        <view class="">这里是银行卡列表</view>
        <view class="">这里是银行卡列表</view>
        <view class="">这里是银行卡列表</view>
        <view class="">这里是银行卡列表</view>
        <view class="">这里是银行卡列表</view>
      </view>
    </vc-popup>
    <vc-popup :visible.sync="visible" :position="position">
      <view style="line-height: 100px;">这里是银行卡列表11</view>
      <view style="line-height: 100px;">这里是银行卡列表22</view>
      <view style="line-height: 100px;">这里是银行卡列表33</view>
      <view style="line-height: 100px;">这里是银行卡列表44</view>
      <view style="line-height: 100px;">这里是银行卡列表55</view>
      <view style="line-height: 100px;">这里是银行卡列表66</view>
      <view style="line-height: 100px;">这里是银行卡列表77</view>
    </vc-popup>
    <vc-popup :visible.sync="visible2" :position="position" round>
      <scroll-view scroll-y :style="style">
      </scroll-view>
    </vc-popup>
    <vc-popup :visible.sync="visible3" position="bottom" round title="标题" closeable>
      <view class="content">
        1、中国税收居民是指在中国境内有住所，或者无住所而在境内居住满一年的个人。在中国境内有住所是指因户籍、家庭、经济利益关系而在中国境内习惯性居住。在境内居住满一年，是指在一个纳税年度中在中国境内居住365日。临时离境的，不扣减日数。临时离境，是指在一个纳税年度中一次不超过30日或者多次累计不超过90日的离境。
        2、非中国税收居民是指中国税收居民以外的个人。</view>
    </vc-popup>
  </view>
</template>

<script>
import DemoBlock from '@/sub-package-demo/components/demo-block'
export default {
  components: {
    DemoBlock
  },
  data() {
    return {
      visible: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      position: 'center',
    }
  },
  computed: {
    style() {
      return ['top', 'bottom'].includes(this.position)
        ? 'height:200px;'
        : 'width:100px;'
    },
  },
}
</script>

<style lang="scss" scoped>
.box {
  width: 100px;
  height: 100px;
  background: #fff;
}

.content {
  box-sizing: border-box;
  width: 100%;
  padding: 24rpx 48rpx 72rpx;
}

.bank-popup-wrapper {
  width: 85vw;
}
</style>
