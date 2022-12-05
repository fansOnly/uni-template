<template>
  <view :class="['animation-num-wrapper', customClass]" :style="wrapperStyled">
    <view class="animation-num" :style="numStyled">
      <view v-for="(i, k) in numbers" :key="k" class="">{{ i }}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'animation-num',
  props: {
    // 组件高度
    height: {
      type: [String, Number],
      default: 30
    },
    // 数值
    value: {
      type: [String, Number],
      default: ''
    },
    // 是否立即执行
    once: {
      type: Boolean,
      default: true
    },
    // 动画时长 ms
    duration: {
      type: Number,
      default: 100
    },
    // 自定义 class
    customClass: null,
    // 自定义 style，作用于字体内容
    customStyle: null,
  },
  data() {
    return {
      numbers: new Array(10).fill(0).map((_, i) => i),
      start: 0,
      transformY: 0,
    }
  },
  computed: {
    wrapperStyled({ height }) {
      let style = ''
      style += `height: ${height}px; line-height: ${height}px;`
      return style
    },
    numStyled() {
      let style = ''
      style += `transform: translateY(-${this.transformY}px);`
      return style + this.customStyle
    },
  },
  watch: {
    once: {
      handler(val) {
        if (val) this.startTimer()
      },
      immediate: true,
    },
  },
  methods: {
    startTimer() {
      if (this.timer) return
      this.timer = setInterval(() => {
        if (this.start < this.value) {
          this.transformY = ++this.start * +this.height
        } else {
          clearTimeout(this.timer)
          this.start = 0
          this.timer = null
        }
      }, 100)
    },
  }
}
</script>

<style lang="scss" scoped>
.animation-num-wrapper {
  display: inline-flex;
  overflow: hidden;
}

.animation-num {
  transition: all ease 300ms;
}
</style>
