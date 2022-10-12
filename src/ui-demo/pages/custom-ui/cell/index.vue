<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding>
      <vc-cell title="标题长度自适应自适应自适应自适应自适应自适应" border></vc-cell>
      <vc-cell title="标题" text="内容长度自适应自适应自适应自适应自适应自适应" title-width="80"></vc-cell>
    </demo-block>

    <demo-block title="标签组" padding>
      <vc-cell-group title-class="title111" title-style="font-size:10px;" border custom-style="border-color: #f00;">
        <vc-cell title="姓名" text="章三"></vc-cell>
        <view>
          <vc-cell title="姓名" text="里斯本"></vc-cell>
        </view>
        <vc-cell title="姓名" text="章三" :border="false"></vc-cell>
      </vc-cell-group>
    </demo-block>

    <demo-block title="导航样式" padding>
      <vc-cell title="标题" is-link border></vc-cell>
      <vc-cell title="标题222222" text="内容" is-link></vc-cell>
    </demo-block>

    <demo-block title="自定义插槽" padding>
      <vc-cell class="vc-cell-move--right" title="自定义内容" border>
        <view slot="text">这是自定义的内容</view>
      </vc-cell>
      <vc-cell title="自定义图标" is-link>
        <vc-icon slot="icon" name="facial" size="20"></vc-icon>
      </vc-cell>
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
