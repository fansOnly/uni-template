<template>

<view class="demo-flex">
<view style="margin-right: 10px;">截止当前参与活动人数为</view>
<et-scroll-num :value="12861.36" :once="once" height="40" custom-style="font-size: 40rpx;font-weight: 500;"></et-scroll-num>
<view style="margin-left: 10px;">人</view>
</view>
</template>

<script>
  export default {
    data() {
      return {
        once: true
      }
    },
    onLoad() {
      setTimeout(() => {
        this.once = true
      }, 3000);
    }
  }
</script>

<style lang="scss" scoped>
.demo-flex {
  display: flex;
  align-items: center;
  font-size: 18px;
}
</style>
