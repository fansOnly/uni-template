<template>
<view class="et-count-down">
{{countDownText}}
</view>
</template>

<script>
export default {
  name: 'et-count-down',
  props: {
    // 倒计时时长，毫秒
    time: {
      type: Number,
      default: 0
    },
    // 显示时间格式
    format: {
      type: String,
      default: 'HH:mm:ss'
    },
    // 自动开始
    autoStart: {
      type: Boolean,
      default: true
    },
    // 毫秒级
    millisecond: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: this.time,
    }
  },
  computed: {
    countDownText() {
      return this.formatDate()
    }
  },
  created() {
    if (this.autoStart) {
      this.start()
    }
  },
  destroyed() {
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    start() {
      if (this.timer) return
      this.timer = setInterval(() => {
        this.value -= 1000 / 30
        if (this.value === 0) {
          this.pause()
          this.$emit('done')
        }
      }, 30)
    },
    pause() {
      clearInterval(this.timer)
      this.timer = null
    },
    reset() {
      this.pause()
      this.value = this.time
      if (this.autoStart) {
        this.start()
      }
    },
    formatDate() {
      let format = this.format
      if (this.millisecond) {
        format += ':SSS'
      }

      const day = Math.floor(this.value / (60 * 60 * 24) / 1000)
      const hour = Math.floor(this.value / (60 * 60) / 1000) - (day * 24)
      const minute = Math.floor(this.value / 60 / 1000) - (day * 24 * 60) - (hour * 60)
      const second = Math.floor(this.value / 1000) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
      const millisecond = Math.floor(this.value % 1000)

      return format.replace(/DD/g, this.padZero(day))
        .replace(/HH|hh/g, this.padZero(hour))
        .replace(/mm/g, this.padZero(minute))
        .replace(/ss/g, this.padZero(second))
        .replace(/SSS/g, this.padZero(millisecond, 3))
    },
    padZero(str, len = 2) {
      return String(str).padStart(len, '0')
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
