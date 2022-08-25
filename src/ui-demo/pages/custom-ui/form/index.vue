<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding background="#fff">
      <et-form ref="form" v-model="form" :rules="rules" @validate="val => formValid = val">
        <et-form-item label="姓名">
          <et-input name="name" type="text" placeholder="请输入姓名" border />
        </et-form-item>
        <view class="gap"></view>
        <et-form-item label="邮箱">
          <et-input name="email" type="text" placeholder="请输入邮箱" border />
        </et-form-item>
        <view class="gap"></view>
        <et-form-item label="手机号" :rules="{required: false, message: 'not empty'}">
          <et-input name="phone" type="text" placeholder="请输入手机号" border />
        </et-form-item>
        <view class="gap"></view>
        <et-form-item label="职业">
          <et-input name="job" type="text" placeholder="请输入职业" border />
        </et-form-item>

        <view class="gap"></view>
        <et-button type="primary" block :disabled="!formValid" @click="onSubmit('form')">submit</et-button>
        <view class="gap"></view>
        <et-button block @click="onReset('form')">reset</et-button>
      </et-form>
    </demo-block>

    <demo-block title="基础用法 - 输入校验" padding background="#fff">
      <et-form ref="form3" v-model="form3" :rules="rules3" validate-trigger="input">
        <et-form-item label="姓名">
          <et-input name="name" type="text" placeholder="请输入姓名" border />
        </et-form-item>

        <view class="gap"></view>
        <et-button type="primary" block :disabled="!formValid3" @click="onSubmit3('form3')">submit</et-button>
        <view class="gap"></view>
        <et-button block @click="onReset('form3')">reset</et-button>
      </et-form>
    </demo-block>

    <demo-block title="基础用法 - 提交校验" padding background="#fff">
      <et-form ref="form2" v-model="form2" :rules="rules2" validate-trigger="submit">
        <et-form-item label="姓名">
          <et-input name="name" type="text" placeholder="请输入姓名" border />
        </et-form-item>
        <view class="gap"></view>
        <et-form-item label="邮箱">
          <et-input name="email" type="text" placeholder="请输入邮箱" border />
        </et-form-item>

        <view class="gap"></view>
        <et-button type="primary" block :disabled="!formValid2" @click="onSubmit2('form2')">submit</et-button>
        <view class="gap"></view>
        <et-button block @click="onReset('form2')">reset</et-button>
      </et-form>
    </demo-block>

  </view>
</template>

<script>
import DemoBlock from '@p/components/demo-block'
import { checkEmail, checkName } from '@/shared'
export default {
  components: {
    DemoBlock
  },
  data() {
    return {
      checkEmail,
      checkName,
      form: {
        email: '',
        name: '112312321',
        phone: '',
        job: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名' },
          { validator: 'checkName', message: '姓名格式有误' },
        ],
        email: [
          { required: true, message: '请输入邮箱' },
          { validator: 'checkEmail', message: '请输入正确的邮箱' },
        ],
        phone: [
          { required: true, message: '请输入手机号' },
        ],
      },
      form3: {
        name: '',
      },
      rules3: {
        name: [
          { required: true, message: '请输入姓名' },
          { validator: 'checkName', message: '姓名格式有误' },
        ],
      },
      form2: {
        email: '',
        name: '9999',
      },
      rules2: {
        name: [
          { required: true, message: '请输入姓名' },
          { validator: 'checkName', message: '姓名格式有误' },
        ],
        email: [
          { required: true, message: '请输入邮箱' },
          { validator: 'checkEmail', message: '请输入正确的邮箱' },
        ],
      },
      formValid: false,
      formValid2: true,
    }
  },
  methods: {
    onSubmit(formName) {
      this.$nextTick(() => {
        console.log('form1 value: ', this[formName])
      })
    },
    onSubmit3(formName) {
      this.$nextTick(() => {
        console.log('form3 value: ', this[formName])
      })
    },
    onSubmit2(formName) {
      this.$refs[formName].validate((valid) => {
        console.log('valid: ', valid)
        console.log('form2 value: ', this[formName])
        if (valid) {
          console.log('success')
        }
      })
    },
    onReset(formName) {
      this.$refs[formName].reset()
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
