<template>
  <view class="page-wrapper">
    <demo-block title="基础用法">
      <van-slider value="50" custom-class="slider" @change="onChange" />
    </demo-block>

    <demo-block title="双滑块">
      <van-slider range :value="[20, 60 ]" custom-class="slider" @change="onChange" />
    </demo-block>

    <demo-block title="指定选择范围">
      <van-slider custom-class="slider" min="-50" max="50" @change="onChange" />
    </demo-block>

    <demo-block title="禁用">
      <van-slider custom-class="slider" value="50" disabled />
    </demo-block>

    <demo-block title="指定步长">
      <van-slider custom-class="slider" value="50" step="10" @change="onChange" />
    </demo-block>

    <demo-block title="自定义样式">
      <van-slider value="50" custom-class="slider" bar-height="4px" active-color="#ee0a24" />
    </demo-block>

    <demo-block title="自定义按钮">
      <van-slider :value="currentValue" custom-class="slider" use-button-slot active-color="#ee0a24" @drag="onDrag">
        <view class="custom-button" slot="button">
          {{ currentValue }}
        </view>
      </van-slider>
    </demo-block>

    <demo-block title="垂直方向">
      <view style="height: 150px; padding-left: 30px;">
        <van-slider :value="50" vertical custom-class="slider" @change="onChange" />
        <van-slider :value="[20, 60]" vertical range custom-class="slider" @change="onChange" />
      </view>
    </demo-block>

  </view>
</template>


<script>
import DemoBlock from '@p/components/demo-block'
export default {
  components: {
    DemoBlock
  },
  data() {
    return {
      currentValue: 50,
    }
  },
  methods: {
    onChange(event) {
      wx.showToast({
        icon: 'none',
        title: `当前值：${event.detail}`,
      });
    },
    onDrag(event) {
      this.currentValue = event.detail.value
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .slider {
  margin: 0 15px 30px
}

.custom-button {
  background-color: #ee0a24;
  border-radius: 100px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  width: 26px
}
</style>
