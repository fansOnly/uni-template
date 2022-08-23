<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding>
      <et-cell title="标题长度自适应自适应自适应自适应自适应自适应" border></et-cell>
      <et-cell title="标题" text="内容长度自适应自适应自适应自适应自适应自适应" title-width="80"></et-cell>
    </demo-block>

    <demo-block title="标签组" padding>
      <et-cell-group title-class="title111" title-style="font-size:10px;" border custom-style="border-color: #f00;">
        <et-cell title="姓名" text="章三"></et-cell>
        <view>
          <et-cell title="姓名" text="里斯本"></et-cell>
        </view>
        <et-cell title="姓名" text="章三" :border="false"></et-cell>
      </et-cell-group>
    </demo-block>

    <demo-block title="导航样式" padding>
      <et-cell title="标题" is-link border></et-cell>
      <et-cell title="标题222222" text="内容" is-link></et-cell>
    </demo-block>

    <demo-block title="自定义插槽" padding>
      <et-cell class="et-cell-move--right" title="自定义内容" border>
        <view slot="text">这是自定义的内容</view>
      </et-cell>
      <et-cell title="自定义图标" is-link>
        <et-icon slot="icon" name="facial" size="20"></et-icon>
      </et-cell>
    </demo-block>

  </view>
</template>

<script>
import DemoBlock from '@p/components/demo-block'

export default {
  components: {
    DemoBlock
  }
}
</script>

<style lang="scss" scoped>
::v-deep .title111 {
  color: #f00;
}
</style>
