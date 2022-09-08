<template>
  <view class="page-wrapper">

    <demo-block title="单选框组" padding>
      <view>{{ radio }}</view>
      <et-radio-group v-model="radio">
        <et-radio name="x" custom-style="margin-bottom: 8px;">单选框x</et-radio>
        <et-radio name="y" custom-style="margin-bottom: 8px;" label-disabled>单选框y - 只能点击图标</et-radio>
        <et-radio name="z" icon-disabled>单选框z - 只能点击文本</et-radio>
      </et-radio-group>
    </demo-block>

    <demo-block title="单选框组 - 水平布局" padding>
      <view>{{ radio1 }}</view>
      <et-radio-group v-model="radio1" direction="horizontal">
        <et-radio name="a" custom-style="margin-right: 8px;">单选框a</et-radio>
        <et-radio name="b">单选框b - et-cell 组件包裹</et-radio>
        <et-radio name="c">单选框c</et-radio>
      </et-radio-group>
    </demo-block>

    <demo-block title="单选框组 - 选项包裹" padding>
      <view>{{ radio1 }}</view>
      <et-radio-group v-model="radio1" direction="horizontal">
        <et-radio name="a" custom-style="margin-right: 8px;">单选框a</et-radio>
        <et-cell>
          <et-radio slot="title" name="b">单选框b - et-cell 组件包裹</et-radio>
        </et-cell>
        <view>
          <et-radio name="c">单选框c</et-radio>
        </view>
      </et-radio-group>
    </demo-block>

    <demo-block title="单选框组 - 禁用选项" padding>
      <view>{{ radio3 }}</view>
      <et-radio-group v-model="radio3">
        <et-radio name="m" custom-style="margin-bottom: 8px;">单选框m</et-radio>
        <et-radio name="n" disabled>单选框n</et-radio>
      </et-radio-group>
    </demo-block>

    <demo-block title="单元格示例" padding background="#fff">
      <view>{{ radio2 }}</view>
      <et-radio-group v-model="radio2">
        <et-cell title="单选框1" :title-width="0" border @click="onClick($event, '1')">
          <et-radio slot="text" name="1"></et-radio>
        </et-cell>
        <et-cell title="单选框2" :title-width="0" @click="onClick($event, '2')">
          <et-radio slot="text" name="2"></et-radio>
        </et-cell>
      </et-radio-group>
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
