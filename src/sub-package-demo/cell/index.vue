<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding>
      <vc-cell title="标题长度自适应自适应自适应自适应自适应自适应" :title-width="0" text="内容" border></vc-cell>
      <vc-cell title="标题" text="内容长度自适应自适应自适应自适应自适应自适应" :text-wrap="false"></vc-cell>
    </demo-block>

    <demo-block title="标签组" padding>
      <vc-cell-group title-class="title111" title-style="font-size:10px;" border inner-border
        custom-style="border-color: #f00;">
        <vc-cell title="姓名" text="章三"></vc-cell>
        <view>
          <vc-cell title="姓名" text="里斯本"></vc-cell>
        </view>
        <vc-cell title="姓名" text="章三" is-last></vc-cell>
      </vc-cell-group>
    </demo-block>

    <demo-block title="尺寸" padding>
      <vc-cell-group border>
        <vc-cell title="默认尺寸" text="内容"></vc-cell>
        <vc-cell title="小尺寸" text="内容" size="small"></vc-cell>
        <vc-cell title="大尺寸" text="内容" is-last size="large"></vc-cell>
      </vc-cell-group>
    </demo-block>

    <demo-block title="对齐" padding>
      <vc-cell-group border>
        <vc-cell title="居中" text="内容长度自适应自适应自适应自适应自适应自适应" :text-wrap="false"></vc-cell>
        <vc-cell title="居上" text="内容长度自适应自适应自适应自适应自适应自适应" align="start" :text-wrap="false"></vc-cell>
        <vc-cell title="居下" text="内容长度自适应自适应自适应自适应自适应自适应" align="end" is-last :text-wrap="false"></vc-cell>
      </vc-cell-group>
    </demo-block>

    <demo-block title="导航样式" padding>
      <vc-cell-group border>
        <vc-cell title="标题" is-link></vc-cell>
        <vc-cell title="标题222222" text="内容" is-link></vc-cell>
        <vc-cell title="标题-不可用" text="内容" disabled is-link is-last></vc-cell>
      </vc-cell-group>
    </demo-block>

    <demo-block title="自定义插槽" padding>
      <vc-cell-group border>
        <vc-cell class="vc-cell-move--right" title="自定义内容">
          <view slot="text">这是自定义的内容</view>
        </vc-cell>
        <vc-cell title="自定义图标" is-last>
          <vc-icon slot="extra" name="image" size="24"></vc-icon>
        </vc-cell>
      </vc-cell-group>
    </demo-block>

  </view>
</template>

<script>
import DemoBlock from '@/sub-package-demo/components/demo-block'

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
