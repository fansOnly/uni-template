<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding>
      <et-upload :files="[file]" width="164" height="108" :icon="false" @remove="handleSingleRemove"
        @success="handleSingleUpload">
        <et-image src="idcard-front.png" static></et-image>
      </et-upload>
    </demo-block>

    <demo-block title="多文件上传" padding>
      <et-upload :files="files" :count="5" @remove="handleRemove" @success="handleMultiUpload"></et-upload>
    </demo-block>

    <demo-block title="上传状态" padding>
      <et-upload :files="files2" :count="5" show-loading @remove="handleRemove" @success="handleMultiUpload">
      </et-upload>
    </demo-block>

    <demo-block title="禁用上传" padding>
      <et-upload :files="localFile" :count="2" disabled></et-upload>
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
      file: {},
      files: [{ src: 'http://tmp/ojF8AQxKEl3Feaf7880f96426896b78b3e79af29fe85.jpg', status: 'success' }],
      files2: [],
      localFile: [{ src: '/static/images/idcard-front.png' }],
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
      console.log('[info] this.files: ', this.files)
    },
    handleRemove(index) {
      this.files.splice(index, 1)
      console.log('[info] 删除图片 this.files: ', this.files)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
