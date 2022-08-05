<template>
  <view class="et-input-cell">
    <et-cell :title="title" :title-width="titleWidth" size="small" :border="border" hover-class="" :custom-style="cellStyled" title-style="color: #252525;">
      <template slot="text">
        <slot name="text">
          <et-input ref="input" :name="name" :type="type" :value="value" :height="height" :placeholder="placeholder" :maxlength="maxlength" :auto-height="autoHeight" :show-limit="showLimit" :min-height="minHeight" :radius="radius" :rules="rules" :show-error="false" :password="password" :readonly="readonly" :disabled="disabled" :clearable="clearable" :clear-trigger="clearTrigger" :focus="focus" :support-view="supportView" :custom-style="inputCustomStyled" :input-style="inputStyle" :placeholder-style="placeholderStyle" :confirm-type="confirmType" :formatter="formatter" @focus="onFocus" @blur="onBlur" @input="onInput" @confirm="onConfirm" @validate="onValidate" @clear="onClear" @click="$emit('click')">
            <template slot="prefix">
              <slot name="prefix"></slot>
            </template>
          </et-input>
          <slot name="tip"></slot>
        </slot>
      </template>
      <template slot="extra">
        <slot name="extra"></slot>
      </template>
    </et-cell>
    <view v-show="error" class="et-input-error-wrapper">
      <view class="et-input-error">
        <view class="et-input-error__icon" :style="{'left': (titleWidth + 16) + 'px'}"></view>
        <view class="et-input-error__text">{{errorText}}</view>
      </view>
    </view>
  </view>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  const { mapActions } = createNamespacedHelpers('state')
  export default {
    name: 'et-input-cell',
    props: {
      // 左侧文本 - 透传 cell 组件
      title: null,
      // 左侧文本宽度 - 透传 cell 组件
      titleWidth: {
        type: [String, Number],
        default: 100
      },
      // 是否显示地边框
      border: {
        type: Boolean,
        default: false
      },
      // 输入框值 - 透传 input 组件
      value: null,
      // 输入框 name 属性 - 透传 input 组件
      name: null,
      // 输入框类型 - 透传 input 组件
      type: {
        type: String,
        default: 'text'
      },
      // 输入框高度 - 透传 input 组件
      height: {
        type: [String, Number],
        default: 26
      },
      // 输入最小框高度 - 透传 input 组件
      minHeight: {
        type: [Number, String],
        default: 26
      },
      // 校验规则 - 支持 array / object
      rules: null,
      // 圆角 - 透传 input 组件
      radius: {
        type: Number,
        default: 0
      },
      // 是否显示清除按钮 - 透传 input 组件
      clearable: {
        type: Boolean,
        default: true
      },
      // 触发清楚图标的时机 focus / always - 透传 input 组件
      clearTrigger: {
        type: String,
        default: 'focus'
      },
      // 限制输入长度 - 透传 input 组件
      maxlength: {
        type: Number,
        default: 40
      },
      // 是否开启标签转换 - 透传 input 组件
      supportView: {
        type: Boolean,
        default: false
      },
      // 输入框为空时占位符 - 透传 input 组件
      placeholder: null,
      // 将 input 切换为 view 标签 - 透传 input / cell 组件
      disabled: {
        type: Boolean,
        default: false
      },
      // 将 input 切换为 view 标签 - 透传 input 组件
      readonly: {
        type: Boolean,
        default: false
      },
      // 是否聚焦
      focus: {
        type: Boolean,
        default: false
      },
      // 是否自动增高 - 透传 input 组件
      autoHeight: {
        type: Boolean,
        default: false
      },
      // textarea 显示输入限制 - 透传 input 组件
      showLimit: {
        type: Boolean,
        default: false
      },
      // 设置键盘右下角按钮的文字，仅在type='text'时生效
      confirmType: {
        type: String,
        default: 'done'
      },
      // 是否是密码类型，type = textarea 时无效 - 透传 input 组件
      password: {
        type: Boolean,
        default: false
      },
      // 输入值格式化函数 - 透传 input 组件
      formatter: null,
      // 错误提示动画执行时间，设为 0 时无动画效果，单位 ms
      duration: {
        type: Number,
        default: 300,
      },
      // 指定 placeholder 的样式
      placeholderStyle: null,
      // 自定义单元格样式
      cellStyle: null,
      // 自定义组件样式
      customStyle: null,
      // 输入框自定义样式
      inputStyle: null
    },
    data() {
      return {
        errorHeight: 0,
        errorText: '', // 错误文本
        error: false, // 表单校验结果
        done: false, // 表单校验结束
      }
    },
    computed: {
      cellStyled() {
        let style = ''
        if (this.type === 'textarea') style += 'align-items: flex-start;'
        return this.mergeStyles([style, this.cellStyle])
      },
      inputCustomStyled() {
        let style = 'padding: 0;'
        return this.mergeStyles([style, this.customStyle])
      }
    },
    methods: {
      ...mapActions(['setInputValid']),
      onInput(value) {
        this.$emit('input', value)
        this.$emit('change', value)
      },
      async onBlur(value) {
        this.$emit('blur', value)
      },
      onFocus(evt) {
        this.$emit('focus', evt)
      },
      onValidate(errorText) {
        this.errorText = errorText
        this.error = !!errorText
      },
      onConfirm(value) {
        this.$emit('confirm', value)
      },
      onClear() {
        this.$emit('input', '')
        this.$emit('change', '')
        this.$emit('clear')
      },
      validateInput(value) {
        this.$refs.input.validateInput(value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .et-input-cell {
    transition: all 200ms ease 100ms;
  }
  .et-input-error-wrapper {
    margin-top: -14px;
    transition-property: height;
    transition-timing-function: ease;
    overflow: hidden;
  }
  .et-input-error {
    background: #fff;
  }
  .et-input-error__text {
    padding: 18rpx 32rpx;
    background: #FBEAE1;
    color: #ED3C2F;
    font-size: $uni-font-size-14;
  }
  .et-input-error__icon {
    position: relative;
    width: 1rpx;
    height: 14px;
  }
  .et-input-error__icon:after {
    content: '';
    position: absolute;
    top: -14px;
    top: 0;
    width: 0;
    height: 0;
    border-width: 7px;
    border-style: solid;
    border-color: transparent transparent #FBEAE1 transparent;
  }
</style>
