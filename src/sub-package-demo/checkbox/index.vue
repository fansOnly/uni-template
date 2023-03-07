<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding>
      <view style="margin-bottom:10px">v-model 双向绑定: {{ checkbox }}</view>
      <vc-checkbox v-model="checkbox">复选框</vc-checkbox>
    </demo-block>

    <demo-block title="复选框组" padding>
      <view style="height:30px;line-height:30px;"><text v-for="item in checkbox2" :key="item">{{ item }}</text></view>
      <vc-checkbox-group v-model="checkbox2">
        <vc-checkbox name="a" block>复选框a-块级</vc-checkbox>
        <vc-cell>
          <vc-checkbox slot="title" name="b">复选框b - 被 vc-cell 组件包裹</vc-checkbox>
        </vc-cell>
        <view>
          <vc-checkbox name="c">复选框c</vc-checkbox>
        </view>
      </vc-checkbox-group>
    </demo-block>

    <demo-block title="不可用状态" padding>
      <vc-checkbox v-model="checkbox2" disabled>不可用</vc-checkbox>
      <vc-checkbox v-model="checkbox4" icon-disabled>图标不可用</vc-checkbox>
      <vc-checkbox v-model="checkbox3" label-disabled>文本不可用</vc-checkbox>
    </demo-block>

    <demo-block title="高级用法" padding>
      <vc-checkbox v-model="checkbox4" block></vc-checkbox>
      <vc-checkbox v-model="checkbox4">复选框</vc-checkbox> === 我不换行
      <vc-checkbox v-model="checkbox4" block>这是个块级元素</vc-checkbox> ===我要换行了
      <vc-checkbox v-model="checkbox4" multiple>这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长</vc-checkbox>
    </demo-block>

    <demo-block title="自定义" padding>
      <vc-checkbox v-model="checkbox4" inactive-icon="checkbox-off" active-icon="checkbox-on-fill"
        block>自定义图标</vc-checkbox>
      <vc-checkbox v-model="checkbox4" inactive-color="#f60" active-color="#67c23a" block>自定义颜色</vc-checkbox>
    </demo-block>

    <demo-block title="单元格示例" padding>
      <vc-cell title="标题" @click="checkbox3 = !checkbox3">
        <vc-checkbox slot="text" :value="checkbox3"></vc-checkbox>
      </vc-cell>
    </demo-block>

  </view>
</template>

<script>
import DemoBlock from '@/sub-package-demo/components/demo-block'
export default {
  components: {
    DemoBlock
  },
  data() {
    return {
      checkbox: false,
      checkbox1: true,
      checkbox2: ['b'],
      checkbox3: false,
      checkbox4: false,
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
