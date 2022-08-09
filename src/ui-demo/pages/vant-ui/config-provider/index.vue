<template>
  <view class="page-wrapper">
    <demo-block title="默认主题">
      <van-cell-group>
        <van-field label="滑块" :border="false">
          <view slot="input" style="width: 100%">
            <van-slider :value="slider" data-key="slider" @change="onChange" />
          </view>
        </van-field>
      </van-cell-group>

      <view style="margin: 16px">
        <van-button round block type="primary">提交</van-button>
      </view>
    </demo-block>

    <demo-block title="定制主题">
      <van-config-provider :theme-vars="themeVars">
        <van-cell-group>
          <van-field label="滑块" :border="false">
            <view slot="input" style="width: 100%">
              <van-slider :value="slider" data-key="slider" @change="onChange" />
            </view>
          </van-field>
        </van-cell-group>

        <view style="margin: 16px">
          <van-button round block type="primary">提交</van-button>
        </view>
      </van-config-provider>
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
      slider: 50,
      themeVars: {
        sliderBarHeight: '4px',
        sliderButtonWidth: '20px',
        sliderButtonHeight: '20px',
        sliderActiveBackgroundColor: '#f44336',
        buttonPrimaryBorderColor: '#f44336',
        buttonPrimaryBackgroundColor: '#f44336',
      },
    }
  },
  methods: {
    onChange(event) {
      const { key } = event.currentTarget.dataset;
      this[key] = event.detail
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
