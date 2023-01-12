<template>
  <view class="page-wrapper" :style="{ 'height': windowHeight + 'px' }">
    <view class="gap"></view>
    <vc-cell-group border>
      <vc-cell title="动画 Fade" is-link @click="startTransition()"></vc-cell>
      <vc-cell title="动画 SlideUp" is-link @click="startTransition('slide-up')"></vc-cell>
      <vc-cell title="动画 SlideDown" is-link @click="startTransition('slide-down')"></vc-cell>
      <vc-cell title="动画 SlideLeft" is-link @click="startTransition('slide-left')"></vc-cell>
      <vc-cell title="动画 SlideRight" is-link is-last @click="startTransition('slide-right')"></vc-cell>
    </vc-cell-group>

    <vc-transition :visible.sync="visible" :animation-name="name">
      <view class="box"></view>
    </vc-transition>
  </view>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      visible: false,
      name: 'fade'
    }
  },
  computed: {
    ...mapState('app', ['windowHeight'])
  },
  methods: {
    startTransition(name = 'fade') {
      this.name = name
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 100px;
  height: 100px;
  margin: auto;
  background: $uni-color-primary;
}
</style>
