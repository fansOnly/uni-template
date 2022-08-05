<template>
  <view class="et-form">
    <slot />
  </view>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'et-form',
    props: {
      // 表单的初始值
      value: {
        type: Object,
        default: () => {}
      },
      // 表单的校验规则
      rules: {
        type: Object,
        default: () => []
      }
    },
    computed: {
      ...mapState('state', ['inputValid', 'activeInputName']),
      validateStatus({ inputValid, activeInputName }) {
        const valid = Object.values(inputValid).every(Boolean)
        this.$emit('validate', valid && !activeInputName)
        return valid && !activeInputName
      }
    },
    created() {
      let res = []
      for (let key in this.value) {
        if (key && this.rules[key].length) res.push({key, value: !!this.value[key]})
      }
      if (!res) return
      this.resetInputValid(res)
    },
    methods: {
      ...mapActions('state', ['resetInputValid']),
      validate(cb) {
        if (typeof cb === 'function') {
          cb(this.validateStatus)
        }
      }
    },
  }
</script>
