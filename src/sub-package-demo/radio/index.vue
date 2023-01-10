<template>
  <view class="page-wrapper">

    <demo-block title="单选框组" padding>
      <vc-radio-group v-model="radio">
        <vc-radio name="x" custom-style="margin-right: 8px;">单选框x</vc-radio>
        <vc-radio name="y" custom-style="margin-right: 8px;">单选框y</vc-radio>
        <vc-radio name="z">单选框z</vc-radio>
      </vc-radio-group>
    </demo-block>

    <demo-block title="单选框组 - 水平布局" padding>
      <vc-radio-group v-model="radio1" direction="horizontal">
        <vc-radio name="a" custom-style="margin-bottom: 8px;">单选框a</vc-radio>
        <vc-radio name="b" custom-style="margin-bottom: 8px;">单选框b</vc-radio>
        <vc-radio name="c">单选框c</vc-radio>
      </vc-radio-group>
    </demo-block>

    <demo-block title="单选框组 - 选项包裹" padding>
      <vc-radio-group v-model="radio1" direction="horizontal">
        <vc-radio name="a" custom-style="margin-bottom: 8px;">单选框a</vc-radio>
        <vc-cell custom-style="margin-bottom: 8px;">
          <vc-radio slot="title" name="b">单选框b - vc-cell 组件包裹</vc-radio>
        </vc-cell>
        <view>
          <vc-radio name="c">单选框c</vc-radio>
        </view>
      </vc-radio-group>
    </demo-block>

    <demo-block title="单选框组 - 禁用选项" padding>
      <vc-radio-group v-model="radio3">
        <vc-radio name="n" custom-style="margin-right: 8px;" disabled>单选框n - 禁用</vc-radio>
        <vc-radio name="y" custom-style="margin-right: 8px;" label-disabled>单选框y - 禁用文本</vc-radio>
        <vc-radio name="z" icon-disabled>单选框z - 禁用图标</vc-radio>
      </vc-radio-group>
    </demo-block>

    <demo-block title="单元格示例" padding background="#fff">
      <vc-radio-group v-model="radio2">
        <vc-cell title="单选框1" :title-width="0" border @click="onClick($event, '1')">
          <vc-radio slot="text" name="1"></vc-radio>
        </vc-cell>
        <vc-cell title="单选框2" :title-width="0" @click="onClick($event, '2')">
          <vc-radio slot="text" name="2"></vc-radio>
        </vc-cell>
      </vc-radio-group>
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
      radio: '',
      radio1: 'b',
      radio2: '2',
      radio3: '',
    }
  },
  methods: {
    onCheck(value) {
      this.radio1 = value
    },
    onClick(evt, name) {
      this.radio2 = name
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
