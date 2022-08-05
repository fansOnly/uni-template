<template>
  <view class="page-wrapper">
    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">基础用法</view>
      <view class="demo-body">
        <et-upload :files="[file]" width="164" height="108" :icon="false" @remove="handleSingleRemove" @success="handleSingleUpload">
          <et-image src="banner.png" ></et-image>
        </et-upload>
      </view>
    </view>

    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">多文件上传</view>
      <view class="demo-body">
        <et-upload :files="files" :count="5" @remove="handleRemove" @success="handleMultiUpload"></et-upload>
      </view>
    </view>

    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">上传状态</view>
      <view class="demo-body">
        <et-upload :files="files2" :count="5" showLoading @remove="handleRemove" @success="handleMultiUpload"></et-upload>
      </view>
    </view>

    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">禁用上传</view>
      <view class="demo-body">
        <et-upload :files="localFile" :count="2" disabled></et-upload>
      </view>
    </view>
  </view>
</template>

<script>
// import EtUpload from '@/components/upload'
// import EtImage from '@/components/image'
export default {
  components: {
    // EtUpload,
    // EtImage
  },
  data() {
    return {
      file: {},
      files: [{ src: 'http://tmp/ojF8AQxKEl3Feaf7880f96426896b78b3e79af29fe85.jpg', status: 'success' }],
      files2: [],
      localFile: [{ src: '/static/images/id-card-img.png' }],
    }
  },
  methods: {
      handleSingleUpload(data) {
        this.file = data[0]
        console.log('[info] 上传图片 >>>', this.file)
      },
      handleSingleRemove() {
        this.file = {}
        console.log('[info] 删除图片 >>>', this.file)
      },
      handleMultiUpload(data) {
        this.files = data
        console.log('[info] 上传成功 >>>', data)
        console.log('[info] this.files: ', this.files);
      },
      handleRemove(index) {
        this.files.splice(index, 1)
        console.log('[info] 删除图片 this.files: ', this.files);
      }
  }
}
</script>

<style lang="scss" scoped>
@import '@p/assets/styles/index.scss';
</style>
