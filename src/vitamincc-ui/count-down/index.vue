<template>
  <view class="vc-count-down">
    <slot>{{ countDownText }}</slot>
  </view>
</template>

<script>
export default {
  name: 'vc-count-down',
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
      value: this.time
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
      if (this.counting) return
      this.counting = true

      if (this.millisecond) {
        this.mstick()
      } else {
        this.tick()
      }
    },
    pause() {
      this.counting = false
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
    tick() {
      this.timer = setInterval(() => {
        this.value -= 1000
        if (this.value === 0) {
          this.pause()
          this.$emit('done')
        }
      }, 1000)
    },
    mstick() {
      this.timer = setInterval(() => {
        this.value -= 16
        if (this.value === 0) {
          this.pause()
          this.$emit('done')
        }
      }, 16)
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
      this.$emit('change', this.parseDate({ day, hour, minute, second, millisecond }))

      return format.replace(/DD/g, this.padZero(day))
        .replace(/HH|hh/g, this.padZero(hour))
        .replace(/mm/g, this.padZero(minute))
        .replace(/ss/g, this.padZero(second))
        .replace(/SSS/g, this.padZero(millisecond, 3))
    },
    parseDate({ day, hour, minute, second, millisecond }) {
      return {
        day: this.padZero(day),
        hour: this.padZero(hour),
        minute: this.padZero(minute),
        second: this.padZero(second),
        millisecond: this.padZero(millisecond)
      }
    },
    padZero(str, len = 2) {
      return String(str).padStart(len, '0')
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
