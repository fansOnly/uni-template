<template>
  <view class="page-wrapper">
    <view class="demo-block">
      <view class="demo-title">基础用法</view>
      <view class="demo-content">
        <view class="demo-row--flex">
          <view class="mgr12"><vc-button type="primary" @click="checkIsSupport">检查可支持方式</vc-button></view>
          <view v-if="isSupportFacial || isSupportFingerPrint" class="mgr12"><vc-button type="primary" @click="checkIsSoterEnrolled">检查是否录入</vc-button></view>
        </view>
        <view class="demo-row--flex">
          <view v-if="isSupportFingerPrint" class="mgr12"><vc-button type="primary" @click="startAuthFingerPrint">开始识别 - 指纹</vc-button></view>
          <view v-if="isSupportFacial" class="mgr12"><vc-button type="primary" @click="startAuthFacial">开始识别 - 人脸</vc-button></view>
        </view>
      </view>
    </view>
    <view class="demo-title">当前运行设备：{{platform}}</view>
    <view class="demo-title">本机支持的 SOTER 生物认证方式</view>
    <view class="demo-title">{{isSupportFacial ? '人脸识别' : ''}} {{ isSupportFingerPrint && isSupportFacial ? '&&' : ''}} {{isSupportFingerPrint ? '指纹识别' : ''}}</view>
    <view class="demo-title">是否已录入指纹：{{isFingerPrintEnrolled}}</view>
    <view class="demo-title">是否已录入人脸：{{isFacialEnrolled}}</view>
  </view>
</template>

<script>
import { wxCheckIsSoterEnrolledInDevice, wxCheckIsSupportSoterAuthentication, wxStartSoterAuthentication } from '@/common/lib/weixin/API';
export default {
  data() {
    return {
      platform: '',
      isSupportFacial: false,
      isSupportFingerPrint: false,
      isFacialEnrolled: false,
      isFingerPrintEnrolled: false,
    };
  },
  mounted() {
    const { platform = '' } = wx.getSystemInfoSync();
    this.platform = platform;
  },
  methods: {
    async checkIsSupport() {
      const { supportMode = [] } = await wxCheckIsSupportSoterAuthentication();
      this.isSupportFingerPrint = supportMode.includes('fingerPrint');
      this.isSupportFacial = supportMode.includes('facial');
    },
    async checkIsSoterEnrolled() {
      if (this.isSupportFingerPrint) {
        const res = await wxCheckIsSoterEnrolledInDevice('fingerPrint');
        this.isFingerPrintEnrolled = res.isEnrolled;
      } else if (this.isSupportFacial) {
        const res = await wxCheckIsSoterEnrolledInDevice('facial');
        this.isFacialEnrolled = res.isEnrolled;
      } else {
        console.log('[info] 当前设备未录入生物认证信息');
      }
    },
    async startAuthFingerPrint() {
      const params = {
        requestAuthModes: ['fingerPrint'],
        challenge: '123456',
        authContent: '请用指纹解锁',
      };
      const data = await wxStartSoterAuthentication(params);
      console.log('[info] 指纹识别结果 >>> ', data);
    },
    async startAuthFacial() {
      const params = {
        requestAuthModes: ['facial'],
        challenge: '123456',
        authContent: '请用人脸解锁',
      };
      const data = await wxStartSoterAuthentication(params);
      console.log('[info] 人脸识别结果 >>> ', data);
    }
  },
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  padding: 16px;
}
.demo-block {
  padding: 0;
}
</style>
