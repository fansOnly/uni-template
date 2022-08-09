<template>
  <view class="page-wrapper">
    <demo-block card title="提示弹窗" padding>
      <van-cell title="提示弹窗" @click="onClickAlert" is-link />
      <van-cell title="提示弹窗（无标题）" @click="onClickAlert2" is-link />
      <van-cell title="确认弹窗" @click="onClickConfirm" is-link />
    </demo-block>

    <demo-block card title="圆角按钮样式" padding>
      <van-cell title="提示弹窗" @click="onClickThemeAlert" is-link />
      <van-cell title="提示弹窗（无标题）" @click="onClickThemeAlert2" is-link />
    </demo-block>

    <demo-block card title="异步关闭" padding>
      <van-cell title="异步关闭" @click="onClickAsyncClose" />
    </demo-block>

    <demo-block card title="组件调用" padding>
      <van-cell title="组件调用" @click="showCustomDialog" />
    </demo-block>

    <van-dialog use-slot title="标题" :show="show" show-cancel-button @close="onClose"
      confirm-button-open-type="getUserInfo" @getuserinfo="getUserInfo">
      <image class="demo-image"
        src="https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg" />
    </van-dialog>

    <van-dialog id="van-dialog" />

  </view>
</template>


<script>
import DemoBlock from '@p/components/demo-block'
import Dialog from '@vantui/dialog/dialog';
const message = '代码是写出来给人看的，附带能在机器上运行';
export default {
  components: {
    DemoBlock
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    showCustomDialog() {
      this.show = true
    },
    getUserInfo(event) {
      console.log(event.detail);
    },
    onClickThemeAlert() {
      Dialog.alert({
        context: this,
        title: '标题',
        theme: 'round-button',
        message,
      });
    },
    onClickThemeAlert2() {
      Dialog.alert({
        context: this,
        theme: 'round-button',
        message,
      });
    },
    onClickAlert() {
      Dialog.alert({
        context: this,
        title: '标题',
        message,
      });
    },
    onClickAlert2() {
      Dialog.alert({
        context: this,
        message,
      });
    },
    onClickConfirm() {
      Dialog.confirm({
        context: this,
        title: '标题',
        message,
      });
    },
    onClickAsyncClose() {
      const beforeClose = (action) => new Promise((resolve) => {
        setTimeout(() => {
          if (action === 'confirm') {
            resolve(true);
          }
          else {
            // 拦截取消操作
            resolve(false);
          }
        }, 1000);
      });
      Dialog.confirm({
        context: this,
        title: '标题',
        message,
        beforeClose,
      });
    },
    onClose() {
      this.show = false
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
