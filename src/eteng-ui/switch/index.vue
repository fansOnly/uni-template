<template>
  <view :class="['et-switch', customClass, checked ? 'et-switch--on' : null, disabled ? 'et-switch--disabled' : null]" :style="styled" @tap="click">
    <view class="et-switch__node"></view>
    <template v-if="showText">
      <view v-show="checked" class="et-switch__text et-switch__text--active">
        <view :style="textStyled">{{activeText}}</view>
      </view>
      <view v-show="!checked" class="et-switch__text et-switch__text--inactive">
        <view :style="textStyled">{{inactiveText}}</view>
      </view>
    </template>
  </view>
</template>

<script>
  import cssVariables from '@/shared/css-variables'
  export default {
    name: 'et-switch',
    props: {
      // 默认值
      value: {
        type: [String, Number, Boolean],
        default: true
      },
      // 组件尺寸
      size: {
        type: [String, Number],
        default: 28
      },
      // 激活的值
      activeValue: {
        type: [String,Number,Boolean],
        default: true
      },
      // 未激活的值
      inactiveValue: {
        type: [String,Number,Boolean],
        default: false
      },
      // 高亮颜色
      activeColor: {
        type: String,
        default: cssVariables.primaryColor
      },
      // 未高亮的颜色
      inactiveColor: {
        type: String,
        default: '#fff'
      },
      // 是否禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否显示提示文案
      showText: {
        type: Boolean,
        default: false
      },
      // 开启文案
      activeText: {
        type: String,
        default: 'ON'
      },
      // 关闭文案
      inactiveText: {
        type: String,
        default: 'OFF'
      },
      // 自定义样式
      customClass: null
    },
    computed: {
      checked: {
        get() {
          return this.value === this.activeValue
        },
        set(val) {
          this.$emit('input', (val ? this.activeValue : this.inactiveValue) ?? val)
        }
      },
      styled() {
        let style = ''
        style += `background: ${this.checked ? this.activeColor : this.inactiveColor};`
        style += `font-size: ${this.addUnit(this.size)};`
        return style
      },
      textStyled() {
        let style = ''
        style += `color: ${this.checked ? this.inactiveColor : this.activeColor};`
        style += `font-size: ${this.addUnit(Math.max(Math.min(14, this.size / 2.5), 10))};`
        return style
      }
    },
    methods: {
      click() {
        if (this.disabled) return
        this.checked = !this.checked
      },
    }
  }
</script>

<style lang="scss" scoped>
  .et-switch {
    box-sizing: border-box;
    position: relative;
    display: inline-block;
    width: 2em;
    height: 1em;
    background: $uni-bg-white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 1em;
    transition: background-color 0.3s;
    vertical-align: top;
  }
  .et-switch__node {
    position: absolute;
    top: 1px;
    left: 1px;
    width: calc(1em - 4px);
    height: calc(1em - 4px);
    background: $uni-bg-white;
    border-radius: 100%;
    box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);
    transition: 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
    z-index: 1;
  }
  .et-switch--on {
    & .et-switch__node {
      transform: translateX(1em);
    }
  }
  .et-switch--disabled {
    opacity: 0.4;
  }
  .et-switch__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: 1px;
    width: calc(1em - 4px);
    height: calc(1em - 4px);
  }
  .et-switch__text--active {
    left: 1px;
    align-items: flex-end;
  }
  .et-switch__text--inactive {
    right: 1px;
    align-items: flex-start;
  }
</style>
