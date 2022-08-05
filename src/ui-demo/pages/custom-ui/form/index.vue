<template>
  <view class="page-wrapper">
    <view class="gap"></view>
    <view class="demo-title">基础用法</view>

    <et-form ref="form" v-model="form" :rules="rules" @validate="val => formValid = val">
      <et-input-cell title="邮箱" v-model="form.email" name="email" type="text" border placeholder="请输入邮箱" :rules="rules.email"></et-input-cell>
      <et-input-cell title="姓名" v-model="form.name" name="name" type="text" placeholder="请输入姓名" :rules="{required: true, message: '请输入姓名'}"></et-input-cell>
      <view class="gap"></view>
      <et-button type="primary" block :disabled="!formValid" @click="onSubmit('form')">submit</et-button>
    </et-form>

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
            { validator: 'checkName', message: '姓名格式有误' },
          ],
          email: [
            { required: true, message: '请输入邮箱' },
            { validator: 'checkEmail', message: '请输入正确的邮箱' },
          ],
        },
        form: {
          email: '',
          name: '',
        },
        formValid: false,
      }
    },
    methods: {
      onSubmit(formEl) {
        this.$refs[formEl].validate((valid) => {
          console.log('valid: ', valid)
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
@import '@p/assets/styles/index.scss';
</style>
