<template>
  <view class="page-wrapper">
    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">基础用法 - {{ value1 }}</view>
      <view class="demo-body">
        <et-input name="name" v-model="value1" :height="40" border :radius="10" placeholder="请输入内容" :rules="rules.name"
          clear-trigger="always" @clear="handleClear"></et-input>
      </view>
    </view>

    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">自定义类型</view>
      <view class="">
        <et-input-cell title="文本" v-model="val1" type="text" border placeholder="文本输入键盘" :rules="rules.required">
        </et-input-cell>
        <et-input-cell title="数字" type="number" v-model="val2" border placeholder="数字输入键盘"></et-input-cell>
        <et-input-cell title="身份证" type="idcard" v-model="val3" border placeholder="身份证输入键盘"></et-input-cell>
        <et-input-cell title="小数点" type="digit" v-model="val4" border placeholder="带小数点的数字键盘"></et-input-cell>
        <et-input-cell title="数字" type="number" v-model="val5" border placeholder="数字输入键盘"></et-input-cell>
        <et-input-cell title="密码" type="text" v-model="val6" password placeholder="密码输入键盘"></et-input-cell>
        <et-input-cell title="安全密码" type="safe-password" v-model="val7" placeholder="密码安全输入键盘"></et-input-cell>
      </view>
    </view>
    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">自定义校验</view>
      <view class="">
        <et-input-cell title="邮箱" v-model="email" type="text" border placeholder="请输入邮箱" :rules="rules.email">
        </et-input-cell>
        <et-input-cell title="姓名" v-model="name" type="text" placeholder="请输入姓名"
          :rules="{ required: true, message: '请输入姓名' }"></et-input-cell>
      </view>
    </view>
    <view class="gap"></view>

    <view class="demo-block">
      <view class="demo-title">操作按钮</view>
      <view class="">
        <et-input-cell title="验证码" type="number" :maxlength="6" placeholder="请输入内容">
          <et-button slot="extra" type="text" custom-class="et-input-cell--code">获取验证码</et-button>
        </et-input-cell>
      </view>
    </view>

    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">禁用状态</view>
      <view class="">
        <et-input-cell title="文本" type="text" disabled placeholder="请输入内容"></et-input-cell>
      </view>
    </view>

    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">文本域</view>
      <view class="">
        <et-input-cell title="文本域" v-model="content" type="textarea" auto-height show-limit :maxlength="200" placeholder="请输入内容"></et-input-cell>
      </view>
    </view>
    <view class="gap"></view>

    <view class="demo-block">
      <view class="demo-title">文本右对齐</view>
      <view class="">
        <et-input-cell title="文本" type="text" input-style="text-align:right;" placeholder="请输入内容"></et-input-cell>
      </view>
    </view>
  </view>
</template>

<script>
import { checkEmail, checkName } from '@/shared'
export default {
  data() {
    return {
      checkEmail,
      checkName,
      rules: {
        name: [
          { required: true, message: '请输入姓名' },
          { validator: 'checkName', message: '姓名格式有误' }
        ],
        email: [
          { required: true, message: '请输入邮箱' },
          { validator: 'checkEmail', message: '请输入正确的邮箱' }
        ],
        required: { required: true, message: '不能为空' }
      },
      value1: '',
      email: '',
      name: '',
      note: '',
      val1: '',
      val2: '',
      val3: '',
      val4: '',
      val5: '',
      val6: '',
      val7: '',
      content: ''
    }
  },
  methods: {
    handleClear() {
      console.log('====handleClear===')
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@p/assets/styles/index.scss';
</style>
