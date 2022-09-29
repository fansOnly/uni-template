<template>
  <view class="page-wrapper" :style="{'height': windowHeight +'px'}">
    <view class="gap"></view>
    <et-cell title="动画 Fade" is-link border @click="startTransition()"></et-cell>
    <et-cell title="动画 SlideUp" is-link border @click="startTransition('slide-up')"></et-cell>
    <et-cell title="动画 SlideDown" is-link border @click="startTransition('slide-down')"></et-cell>
    <et-cell title="动画 SlideLeft" is-link border @click="startTransition('slide-left')"></et-cell>
    <et-cell title="动画 SlideRight" is-link border @click="startTransition('slide-right')"></et-cell>

    <et-transition :visible.sync="visible" :animation-name="name">
      <view class="box"></view>
    </et-transition>
  </view>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      visible: false,
      name: 'fade'
    };
  },
  computed: {
    ...mapState('app', ['windowHeight'])
  },
  methods: {
    startTransition(name = 'fade') {
      this.name = name;
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped>
  .box {
    width: 100px;
    height: 100px;
    margin: auto;
    background: $uni-color-primary;
  }
</style>
