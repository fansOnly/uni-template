<template>
  <view class="page-wrapper" style="height: 2000px">

    <demo-block title="基础用法 - 锁定滚动穿透" padding>
      <vc-cell-group border>
        <vc-cell title="弹窗 - 淡入" is-link @click="(visible4 = true)"></vc-cell>
        <vc-cell title="弹窗 - 顶部弹出" is-link @click="(direction = 'ttb', visible = true)"></vc-cell>
        <vc-cell title="弹窗 - 左侧弹出" is-link @click="(direction = 'ltr', visible = true)"></vc-cell>
        <vc-cell title="弹窗 - 右侧弹出" is-link @click="(direction = 'rtl', visible = true)"></vc-cell>
        <vc-cell title="弹窗 - 底部弹出" is-link is-last @click="(direction = 'btt', visible = true)"></vc-cell>
      </vc-cell-group>
    </demo-block>

    <demo-block title="进阶用法" padding>
      <vc-cell-group border>
        <vc-cell title="弹窗 - 底部 - 左关闭" is-link @click="visible3 = true, closePosition = 'left'"></vc-cell>
        <vc-cell title="弹窗 - 底部 - 右关闭" is-link @click="visible3 = true, closePosition = 'right'"></vc-cell>
        <vc-cell title="弹窗 - 居中 - 携带标题" is-link is-last @click="visible5 = true"></vc-cell>
      </vc-cell-group>
    </demo-block>

    <vc-popup :visible.sync="visible4">
      <view class="box">13123</view>
    </vc-popup>
    <vc-popup :visible.sync="visible" :direction="direction" :auto-height="false">
      <view v-for="(item, index) in 'a'.repeat(20)" :key="index" style="line-height: 100px;">银行卡列表-{{ index }}</view>
    </vc-popup>
    <vc-popup :visible.sync="visible3" direction="btt" :z-index="99" round title="内容撑开高度" closeable
      :close-icon-position="closePosition">
      <view class="content">
        <view>
          1、中国税收居民是指在中国境内有住所，或者无住所而在境内居住满一年的个人。在中国境内有住所是指因户籍、家庭、经济利益关系而在中国境内习惯性居住。在境内居住满一年，是指在一个纳税年度中在中国境内居住365日。临时离境的，不扣减日数。临时离境，是指在一个纳税年度中一次不超过30日或者多次累计不超过90日的离境。
        </view>
        <view>2、非中国税收居民是指中国税收居民以外的个人。</view>
        <view>
          1、中国税收居民是指在中国境内有住所，或者无住所而在境内居住满一年的个人。在中国境内有住所是指因户籍、家庭、经济利益关系而在中国境内习惯性居住。在境内居住满一年，是指在一个纳税年度中在中国境内居住365日。临时离境的，不扣减日数。临时离境，是指在一个纳税年度中一次不超过30日或者多次累计不超过90日的离境。
        </view>
      </view>
    </vc-popup>

    <vc-popup :visible.sync="visible5" title="暂时只支持绑定下列银行" round offset="-10vh" :auto-height="false">
      <view class="bank-popup-wrapper">
        <view class="">
          1、中国税收居民是指在中国境内有住所，或者无住所而在境内居住满一年的个人。在中国境内有住所是指因户籍、家庭、经济利益关系而在中国境内习惯性居住。在境内居住满一年，是指在一个纳税年度中在中国境内居住365日。临时离境的，不扣减日数。临时离境，是指在一个纳税年度中一次不超过30日或者多次累计不超过90日的离境。
        </view>
        <view>2、非中国税收居民是指中国税收居民以外的个人。</view>
        <view class="">
          1、中国税收居民是指在中国境内有住所，或者无住所而在境内居住满一年的个人。在中国境内有住所是指因户籍、家庭、经济利益关系而在中国境内习惯性居住。在境内居住满一年，是指在一个纳税年度中在中国境内居住365日。临时离境的，不扣减日数。临时离境，是指在一个纳税年度中一次不超过30日或者多次累计不超过90日的离境。
        </view>
        <view>2、非中国税收居民是指中国税收居民以外的个人。</view>
      </view>
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
      visible3: false,
      visible4: false,
      visible5: false,
      direction: 'center',
      closePosition: 'left'
    }
  },
  computed: {
    style() {
      return ['ttb', 'btt'].includes(this.direction)
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
  padding: 16px;
}

.bank-popup-wrapper {
  box-sizing: border-box;
  width: 85vw;
  padding: 16px;
}
</style>
