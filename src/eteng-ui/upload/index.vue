<!--
 * 本组件部分功能依赖于微信的 API 实现
-->
<template>
  <view :class="['et-upload-wrapper', disabled ? 'et-upload-wrapper--disabled' : null]">
    <template v-if="fileList.length">
      <view v-for="(item, index) in fileList" :key="index" class="et-upload__file" :style="style">
        <et-image :src="item.src" :mode="mode" :width="width" :height="height"></et-image>
        <view v-if="showRemove && (!showLoading || !loading || index < fileList.length - 1)" class="et-upload__file-remove" @click.stop="onRemove(index)">
          <view class="et-upload__remove-text">X</view>
        </view>
        <!-- 上传状态 -->
        <view v-if="showLoading && loading && index === fileList.length - 1" class="et-upload__loading">
          <et-loading type="shine" color="#fff" size="32" vertical><text style="color:#fff;">上传中</text></et-loading>
        </view>
        <!-- 上传失败状态 -->
        <view v-if="item.status === 'fail'" class="et-upload__loading">
          <et-icon name="fail" size="32" color="#fff" />
          <view class="et-upload__loading-text--fail">上传失败</view>
          <view class="et-upload__button-retry" @click="reUpload(index)">重新上传</view>
        </view>
        <!-- 上传成功状态 -->
        <view v-if="item.status === 'success'" class="et-upload__loading" @click="onClickItem(index)">
          <et-icon name="success" size="32" color="#fff" />
          <view class="et-upload__loading-text--fail">上传成功</view>
        </view>
      </view>
    </template>
    <view v-if="fileList.length < count" :class="['et-upload__button', icon ? 'et-upload__button--flex' : null]" :style="style" @click="onUpload(false)">
      <slot><et-icon name="upload" size="32" /></slot>
    </view>
    <!-- #ifdef H5 -->
    <!-- uni-app 会将 input type = file 渲染成 type = text ？？？？？？ -->
    <!-- <form method="post" enctype="multipart/form-data">
      <input ref="upload" type="file" name="file" accept="image/*" :multiple="count > 1" readonly @change="onUploadH5" />
    </form> -->
    <!-- #endif -->

    <!-- 重新上传 -->
    <et-action-sheet :visible.sync="visible" :data="options" show-cancel @select="onSelect"></et-action-sheet>
  </view>
</template>

<script>
import { wxChooseMedia, wxCompressImage, wxPreviewMedia } from '@/common/lib/weixin/API';
import { isEmpty } from '../common/validate';
import { addUnit } from '../common/util';

export default {
  name: 'et-upload',
  props: {
    // 默认的图片数据
    files: {
      type: Array,
      default: () => []
    },
    // 最多可以选择的文件个数
    count: {
      type: Number,
      default: 1
    },
    // 图片模式 - 透传 image 组件
    mode: {
      type: String,
      default: 'scaleToFill'
    },
    // 图片宽度 - 透传 image 组件
    width: {
      type: [String, Number],
      default: 100
    },
    // 图片高度 - 透传 image 组件
    height: {
      type: [String, Number],
      default: 100
    },
    // 显示加载效果
    showLoading: {
      type: Boolean,
      default: true
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 显示上传按钮图标
    icon: {
      type: Boolean,
      default: true
    },
    // 显示删除图标
    showRemove: {
      type: Boolean,
      default: false
    },
    // 是否开启压缩图片
    compress: {
      type: Boolean,
      default: true
    },
    // 压缩质量，范围0～100，数值越小，质量越低，压缩率越高（仅对jpg有效）
    quality: {
      type: Number,
      default: 80
    },
    // 文件类型
    mediaType: {
      type: Array,
      default: () => ['mix']
    },
    // 图片和视频选择的来源
    sourceType: {
      type: Array,
      default: () => ['album', 'camera']
    },
    // 仅对 mediaType 为 image 时有效，是否压缩所选文件
    sizeType: {
      type: Array,
      default: () => ['original', 'compressed']
    },
    // 拍摄视频最长拍摄时间，单位秒。时间范围为 3s 至 60s 之间。不限制相册
    maxDuration: {
      type: Number,
      default: 10
    },
    // 仅在 sourceType 为 camera 时生效，使用前置或后置摄像头
    camera: {
      type: String,
      default: 'back',
      validator(value) {
        return ['back', 'front'].includes(value);
      }
    },
    // 图片地址属性映射
    srcProp: {
      type: String,
      default: 'src'
    }
  },
  data() {
    return {
      fileList: this.files.filter(v => !isEmpty(v)),
      tempFiles: [], // 上传临时缓存文件
      loading: false,
      clickable: true,
      activeIdx: 0,
      visible: false,
      options: [
        // { title: '查看原图', value: 'preview' },
        { title: '重新上传', value: 'upload' },
      ],
      file: '', // h5 下上传
    };
  },
  computed: {
    style({ width, height }) {
      let style = '';
      style += `width: ${addUnit(width)};`;
      style += `height: ${addUnit(height)};`;
      style += `flex: ${width === '100%' ? '1' : '0 0 auto'};`;
      return style;
    },
    max() {
      return this.count - this.fileList.length;
    },
  },
  methods: {
    onClickItem(index) {
      this.activeIdx = index;
      this.visible = true;
    },
    onSelect({value}) {
      if (value === 'preview') {
        this.onPreview();
      } else if (value === 'upload') {
        this.onUpload(true);
      }
    },
    reUpload(index) {
      console.log('[info] retry upload >>>', index);
      this.activeIdx = index;
      this.onUpload(true);
    },
    onRemove(index) {
      if (this.disabled) return;
      this.fileList.splice(index, 1);
      this.$emit('remove', index);
    },
    async onPreview() {
      let sources = this.fileList.map((v) => ({ url: v[this.srcProp] }));
      const params = {
        sources,
        current: this.activeIdx,
      };
      await wxPreviewMedia(params);
    },
    async onUpload(replace = false) {
      /* #ifdef MP-WEIXIN */
      if (this.disabled) return;
      if (!this.clickable) return;
      this.clickable = false;
      try {
        const params = {
          count: this.max,
          mediaType: this.mediaType,
          sizeType: this.sizeType,
          sourceType: this.sourceType,
          maxDuration: this.maxDuration,
          camera: this.camera,
        };
        const { tempFiles = [] } = await wxChooseMedia(params);
        if (!tempFiles.length) return this.$emit('cancel');
        this.tempFiles = tempFiles;
        if (this.compress) {
          await this.compressFiles();
        }
        const files = this.tempFiles.map((v) => ({
          ...v,
          [this.srcProp]: v.tempFilePath,
        }));
        if (!replace) {
          this.fileList = this.fileList.concat(files);
        } else {
          this.fileList.splice(this.activeIdx, 1, files[0]);
        }
        this.loading = true;
        // 这里进行文件的真实上传
        // TODO 模拟上传失败
        this.fileList = this.fileList.map((file, index) => ({...file, status: index == 1 ? 'fail' : 'success'}));
        this.loading = false;
        this.$emit('success', this.fileList);
        this.clickable = true;
      } catch (error) {
        console.error('[debug] wxChooseMedia>>>', error);
        this.clickable = true;
      }
      /* #endif */
      /* #ifdef H5 */
      this.onUploadH5();
      /* #endif */
    },
    async compressFiles() {
      let promises = [];
      this.tempFiles.map(async (file) => {
        promises.push(
          wxCompressImage({ quality: this.quality, src: file.tempFilePath })
        );
      });
      const res = await Promise.all(promises);
      this.tempFiles.map((file, index) => {
        const newFile = res[index];
        if (newFile.errMsg === 'wxCompressImage:ok') {
          file.tempFilePath = newFile.tempFilePath;
        }
        return file;
      });
    },
  }
};
</script>

<style lang="scss" scoped>
  .et-upload-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  .et-upload-wrapper--disabled {
    opacity: .7;
    /* #ifdef H5 */
    cursor: not-allowed;
    /* #endif */
  }
  .et-upload__file {
    position: relative;
    background: #F6F6F6;
    &:not(:last-child) {
      margin: 0 24rpx 24rpx 0;
    }
  }
  .et-upload__file-remove {
    position: absolute;
    top: 0;
    right: 0;
    width: 25px;
    height: 25px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 0 0 0 25px;
    color: #fff;
    text-align: center;
    line-height: 25px;
    z-index: 3;
    /* #ifdef H5 */
    cursor: pointer;
    /* #endif */
  }
  .et-upload__remove-text {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 24rpx;
    line-height: 1;
    transform: translate(-2px, -9px);
  }
  .et-upload__remove-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-3px, -7px);
  }
  .et-upload__button {
    position: relative;
    background: #fff;
  }
  .et-upload__button--flex {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .et-upload__loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }
  .et-upload__loading-text--fail {
    margin-top: 8rpx;
    color: #fff;
    font-size: 28rpx;
  }
  .et-upload__button-retry {
    box-sizing: border-box;
    width: 79px;
    height: 23px;
    margin: 12rpx auto 0;
    border: 1px solid #fff;
    border-radius: 2em;
    color: #fff;
    font-size: 26rpx;
    text-align: center;
    line-height: 23px;
  }
</style>
