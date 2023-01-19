<template>
  <view :class="['vc-progress-bar', visible ? 'is-fade' : null]" :style="style">
    <view :class="['vc-progress-bar--before', paused ? `is-${paused}` : null]"></view>
    <view v-if="done" class="vc-progress-bar--after"></view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'vc-progress-bar',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    color: String,
    height: Number,
    paused: {
      type: Boolean,
      default: false
    },
    done: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loaded: false
    }
  },
  computed: {
    ...mapGetters('app', ['navHeightValue']),
    show() {
      return this.visible && !this.loaded
    },
    style() {
      let style = ''
      if (this.navHeightValue) {
        style += `top: ${this.navHeightValue}px;`
      }
      if (this.color) {
        style += `color: ${this.color};`
      }
      if (this.height) {
        style += `height: ${this.height}px;`
      }
      return style
    }
  },
  async mounted() {
    this.loaded = true
  },
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/progress-bar.scss';
</style>
