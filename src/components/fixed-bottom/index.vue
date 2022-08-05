<template>
  <view>
    <view class="fixed-placeholder-block" :style="styled"></view>
    <view class="iphone-inset-bottom--fixed" :style="{background}">
      <slot />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'fixed-bottom',
    props: {
      height: {
        type: [Number, String],
        default: 50,
      },
      background: {
        type: String,
        default: '#fff',
      },
    },
    computed: {
      styled() {
        let style = '';
        const { height, addUnit } = this;
        style += `height: ${addUnit(height)};`;
        return style;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .iphone-inset-bottom--fixed {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>
