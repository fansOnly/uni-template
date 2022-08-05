<template>
  <view class="page-wrapper">
    <demo-block title="基础用法" padding>
      <van-row>
        <van-image width="100" height="100" :src="src" />
      </van-row>
    </demo-block>

    <demo-block title="填充模式" padding>
      <van-row gutter="20">
        <van-col v-for="(fit, index) in fits" :key="index" span="8">
          <van-image :fit="fit" width="100%" height="27vw" :src="src" />
          <view class="text">{{ fit }}</view>
        </van-col>
      </van-row>
    </demo-block>

    <demo-block title="圆形图片" padding>
      <van-row gutter="20">
        <van-col v-for="(fit, index) in fits" :key="index" span="8">
          <van-image round :fit="fit" width="100%" height="27vw" :src="src" />
          <view class="text">{{ fit }}</view>
        </van-col>
      </van-row>
    </demo-block>

    <demo-block title="加载中提示" padding>
      <van-row gutter="20">
        <van-col span="8">
          <van-image width="100%" height="27vw" />
          <view class="text">默认提示</view>
        </van-col>

        <van-col span="8">
          <van-image width="100%" height="27vw" use-loading-slot>
            <van-loading slot="loading" type="spinner" size="20" vertical />
          </van-image>
          <view class="text">自定义提示</view>
        </van-col>
      </van-row>
    </demo-block>

    <demo-block title="加载失败提示" padding>
      <van-row gutter="20">
        <van-col span="8">
          <van-image width="100%" height="27vw" src="x" />
          <view class="text">默认提示</view>
        </van-col>

        <van-col span="8">
          <van-image width="100%" height="27vw" src="x" use-error-slot>
            <text slot="error">加载失败</text>
          </van-image>
          <view class="text">自定义提示</view>
        </van-col>
      </van-row>
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
      fits: [
        'contain',
        'cover',
        'fill',
        'none',
        'scale-down',
        'widthFix',
        'heightFix',
      ],
      src: 'https://img.yzcdn.cn/vant/cat.jpeg',
    }
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.text{color:#7d7e80;font-size:14px;margin:5px 0 20px;text-align:center;width:100%}
</style>
