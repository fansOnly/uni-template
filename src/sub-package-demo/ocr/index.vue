<template>
  <view class="page-wrapper">
    <demo-block title="身份证识别" padding background="#fff">
      <view class="id-card-box">
        <!-- #ifdef MP-WEIXIN -->
        <ocr-navigator certificate-type="idCard" :opposite="false" @on-success="onIdCardFrontOCR">
          <vc-image :src="idCardInfo.frontFaceFile || 'idcard-front.png'" block static mode="widthFix" width="164">
          </vc-image>
        </ocr-navigator>
        <!-- #endif -->
        <view class="id-card-title">请上传人像面</view>
      </view>
      <view class="id-card-box">
        <!-- #ifdef MP-WEIXIN -->
        <ocr-navigator certificate-type="idCard" :opposite="true" @on-success="onIdCardBackOCR">
          <vc-image :src="idCardInfo.backFaceFile || 'idcard-front.png'" block static mode="widthFix" width="164">
          </vc-image>
        </ocr-navigator>
        <!-- #endif -->
        <view class="id-card-title">请上传国徽面</view>
      </view>
      <vc-cell-group border>
        <vc-cell title="姓名" :text="idCardInfo.name"></vc-cell>
        <vc-cell title="身份证号" :text="idCardInfo.id"></vc-cell>
        <vc-cell title="性别" :text="idCardInfo.gender"></vc-cell>
        <vc-cell title="出生日期" :text="idCardInfo.birth"></vc-cell>
        <vc-cell title="民族" :text="idCardInfo.nationality"></vc-cell>
        <vc-cell title="户籍地址" :text="idCardInfo.address"></vc-cell>
        <vc-cell title="发证机关" :text="idCardInfo.authority"></vc-cell>
        <vc-cell title="身份证有效期" :text="`${idCardInfo.validateFrom}-${idCardInfo.validateTo}`"></vc-cell>
      </vc-cell-group>
    </demo-block>

    <demo-block title="银行卡识别" padding background="#fff">
      <vc-cell title="银行卡" :text="bankCardNo" border>
        <template slot="extra">
          <!-- #ifdef MP-WEIXIN -->
          <!-- eslint-disable-next-line vue/attribute-hyphenation -->
          <ocr-navigator certificateType="bankCard" @on-success="onBankCardOCR">
            <vc-icon name="scan" :size="20"></vc-icon>
          </ocr-navigator>
          <!-- #endif -->
        </template>
      </vc-cell>
    </demo-block>
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
      idCardInfo: {
        id: '', // 身份证号码
        name: '', // 姓名
        gender: '', // 性别
        birth: '', // 生日
        address: '', // 地址
        nationality: '', // 国家
        authority: '', // 发证机关
        validateFrom: '', //有效期起始
        validateTo: '', //有效期结束
        frontFaceFile: '', // 身份证人像面照片
        backFaceFile: '', // 身份证国徽面照片
      },
      bankCardNo: ''
    }
  },
  async onLoad(options) { },
  methods: {
    onIdCardFrontOCR(evt) {
      this.idCardInfo.frontFaceFile = evt.detail.image_path
      this.idCardInfo.id = evt.detail.id.text
      this.idCardInfo.name = evt.detail.name.text
      this.idCardInfo.gender = evt.detail.gender.text
      this.idCardInfo.birth = evt.detail.birth.text
      this.idCardInfo.address = evt.detail.address.text
      this.idCardInfo.nationality = evt.detail.nationality.text
      console.log('[debug] 识别出的身份证信息1 >>>', this.idCardInfo)
    },
    onIdCardBackOCR(evt) {
      this.idCardInfo.backFaceFile = evt.detail.image_path
      this.idCardInfo.authority = evt.detail.authority.text
      // 识别出的时间格式为YYYYMMDD，需要转换下
      const [startDate, endDate] = evt.detail.valid_date.text.split('-')
      this.idCardInfo.validateFrom = `${startDate.substring(0, 4)}-${startDate.substring(4, 6)}-${startDate.substring(6)}`
      this.idCardInfo.validateTo = `${endDate.substring(0, 4)}-${endDate.substring(4, 6)}-${endDate.substring(6)}`
      console.log('[debug] 识别出的身份证信息2 >>>', this.idCardInfo)
    },
    onBankCardOCR(evt) {
      console.log('[debug] OCR 银行卡识别结果 >>>', evt)
      this.bankCardNo = evt.detail.number.text
    },
  },
}
</script>

<style lang='scss' scoped>
@import '@/common/demo.scss';

.id-card-box {
  width: 164px;
  margin: 0 auto;
}

.id-card-title {
  margin-top: 10px;
  text-align: center;
}
</style>
