<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding background="#fff">
      <vc-form ref="form" v-model="form" :rules="rules" @validate="handleFormValidate('formValid', $event)">
        <vc-form-item label="帐号">
          <vc-input name="account" type="text" placeholder="字母 + 数字" />
        </vc-form-item>
        <view class="gap"></view>
        <vc-form-item label="邮箱">
          <vc-input name="email" type="text" placeholder="请输入邮箱" />
        </vc-form-item>
        <view class="gap"></view>
        <vc-form-item label="手机号" :rules="{ required: false, message: 'can be empty' }">
          <vc-input name="phone" type="text" placeholder="请输入手机号" />
        </vc-form-item>

        <view class="gap"></view>
        <vc-button type="primary" block :disabled="!formValid" @click="onSubmit('form')">提交</vc-button>
        <view class="gap"></view>
        <vc-button block @click="onReset('form')">重置</vc-button>
      </vc-form>
    </demo-block>

    <demo-block title="样式布局" padding background="#fff">
      <vc-form ref="form5" v-model="form5" label-width="80" label-align="right">
        <vc-form-item label="姓名：">
          <vc-input name="name5" type="text" placeholder="请输入姓名" />
        </vc-form-item>
        <view class="gap"></view>
        <vc-form-item label="邮箱：">
          <vc-input name="email5" type="text" placeholder="请输入邮箱" />
        </vc-form-item>

        <view class="gap"></view>
        <vc-button type="primary" block>提交</vc-button>
        <view class="gap"></view>
        <vc-button block @click="onReset('form5')">重置</vc-button>
      </vc-form>
    </demo-block>

    <demo-block title="输入校验" padding background="#fff">
      <vc-form ref="form3" v-model="form3" :rules="rules3" validate-trigger="input"
        @validate="handleFormValidate('formValid3', $event)">
        <vc-form-item label="帐号">
          <vc-input name="name3" type="text" placeholder="字母 + 数字" />
        </vc-form-item>

        <view class="gap"></view>
        <vc-button type="primary" block :disabled="!formValid3" @click="onSubmit3('form3')">提交</vc-button>
        <view class="gap"></view>
        <vc-button block @click="onReset('form3')">重置</vc-button>
      </vc-form>
    </demo-block>

    <demo-block title="提交校验" padding background="#fff">
      <vc-form ref="form2" v-model="form2" :rules="rules2" validate-trigger="submit">
        <vc-form-item label="姓名">
          <vc-input name="name2" type="text" placeholder="请输入姓名" />
        </vc-form-item>
        <view class="gap"></view>
        <vc-form-item label="邮箱">
          <vc-input name="email2" type="text" placeholder="请输入邮箱" />
        </vc-form-item>

        <view class="gap"></view>
        <vc-button type="primary" block @click="onSubmit2('form2')">提交</vc-button>
        <view class="gap"></view>
        <vc-button block @click="onReset('form2')">重置</vc-button>
      </vc-form>
    </demo-block>

  </view>
</template>

<script>
import DemoBlock from '@/sub-package-demo/components/demo-block'
import { validateEmail, validateName } from '@/common/hooks/use-validator'
export default {
  components: {
    DemoBlock
  },
  data() {
    return {
      validateEmail,
      validateName,
      form: {
        email: '',
        account: '112312321',
        phone: '',
      },
      rules: {
        account: [
          { required: true, message: '请输入帐号' },
          { validator: 'validateAccount', message: '格式有误' },
        ],
        email: [
          { required: false, message: '请输入邮箱' },
          { validator: 'validateEmail', message: '请输入正确的邮箱' },
        ],
        phone: [
          { required: true, message: '请输入手机号' },
        ],
      },
      form5: {
        name5: '',
        email5: ''
      },
      form3: {
        name3: '',
      },
      rules3: {
        name3: [
          { required: true, message: '请输入姓名' },
          { validator: 'validateAccount', message: '姓名格式有误' },
        ],
      },
      form2: {
        email: '',
        name: '9999',
      },
      rules2: {
        name2: [
          { required: true, message: '请输入姓名' },
          { validator: 'validateName', message: '姓名格式有误' },
        ],
        email2: [
          { required: true, message: '请输入邮箱' },
          { validator: 'validateEmail', message: '请输入正确的邮箱' },
        ],
      },
      formValid: false,
      formValid3: true,
    }
  },
  methods: {
    handleFormValidate(target, val) {
      console.log('== handleFormValidate ==', val)
      this[target] = val
    },
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
    },
    validateAccount(val) {
      return /^\d+[a-zA-Z]+$/.test(val)
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
