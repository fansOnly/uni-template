<template>
  <view class="page-wrapper">
    <demo-block title="基础用法">
      <van-area :value="value" :loading="loading" :area-list="areaList" @change="onChange"
        @confirm="onConfirm" @cancel="onCancel" />
    </demo-block>
    <van-toast id="van-toast" />

  </view>
</template>


<script>
import DemoBlock from '@p/components/demo-block'
import Toast from '@vantui/toast/toast';
import { areaList } from '@vant/area-data'
export default {
  components: {
    DemoBlock
  },
  data() {
    return {
      areaList,
      loading: true,
      value: 330302,
    }
  },
  onReady() {
    this.loading = false
  },
  methods: {
    onChange(event) {
      const { values } = event.detail;
      Toast({
        context: this,
        message: values.map((item) => item.name).join('-'),
      });
    },
    onConfirm(event) {
      console.log(event);
    },
    onCancel(event) {
      console.log(event);
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
