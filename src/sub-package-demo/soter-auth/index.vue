<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding>
      <vc-button type="primary" @click="checkIsSupport">检查可支持方式</vc-button>
      <view class="gap-top">{{ isSupportFacial ? '人脸识别' : '' }} {{ isSupportFingerPrint ? '指纹识别' : '' }}</view>

      <template v-if="isSupportFacial || isSupportFingerPrint">
        <view class="gap"></view>
        <view class="gap"></view>
        <vc-button type="primary" @click="checkIsSoterEnrolled">检查是否录入</vc-button>
        <view class="gap"></view>
        <view v-if="isSupportFacial" class="demo-title">是否已录入指纹：{{ isFingerPrintEnrolled }}</view>
        <view v-if="isSupportFingerPrint" class="demo-title">是否已录入人脸：{{ isFacialEnrolled }}</view>
        <view class="gap"></view>
        <view class="gap"></view>
        <template v-if="isSupportFingerPrint">
          <vc-button type="primary" @click="startAuthFingerPrint">开始识别 - 指纹</vc-button>
        </template>
        <template v-if="isSupportFacial">
          <vc-button type="primary" @click="startAuthFacial">开始识别 - 人脸</vc-button>
        </template>
      </template>
    </demo-block>
  </view>
</template>

<script>
import DemoBlock from '@/components/demo-block'

import { getSupportedSoter, isSoterEnrolled, startSoter } from '@/common/hooks/use-wxapi'

export default {
  components: {
    DemoBlock
  },
  data() {
    return {
      platform: '',
      isSupportFacial: false,
      isSupportFingerPrint: false,
      isFacialEnrolled: false,
      isFingerPrintEnrolled: false,
    }
  },
  mounted() {
    const { platform = '' } = wx.getSystemInfoSync()
    this.platform = platform
  },
  methods: {
    async checkIsSupport() {
      const supportMode = await getSupportedSoter()
      this.isSupportFingerPrint = supportMode.includes('fingerPrint')
      this.isSupportFacial = supportMode.includes('facial')
    },
    async checkIsSoterEnrolled() {
      if (this.isSupportFingerPrint) {
        const isEnrolled = await isSoterEnrolled('fingerPrint')
        this.isFingerPrintEnrolled = isEnrolled
      } else if (this.isSupportFacial) {
        const isEnrolled = await isSoterEnrolled('facial')
        this.isFacialEnrolled = isEnrolled
      } else {
        console.log('[info] 当前设备未录入生物认证信息')
      }
    },
    async startAuthFingerPrint() {
      const params = {
        requestAuthModes: ['fingerPrint'],
        challenge: '123456',
        authContent: '请用指纹解锁',
      }
      const { success, locked } = await startSoter(params)
      console.log('[info] 指纹识别结果 >>> ', success, locked)
    },
    async startAuthFacial() {
      const params = {
        requestAuthModes: ['facial'],
        challenge: '123456',
        authContent: '请用人脸解锁',
      }
      const { success, locked } = await startSoter(params)
      console.log('[info] 人脸识别结果 >>> ', success, locked)
    }
  },
}
</script>
