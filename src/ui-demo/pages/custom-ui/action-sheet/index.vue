<template>
  <view class="page-wrapper">
    <demo-block title="基础用法" padding>
      <vc-cell title="基础用法" is-link border @click="visible = true"></vc-cell>
        <vc-cell title="取消按钮" is-link border @click="visible2 = true"></vc-cell>
        <vc-cell title="禁用选项" is-link border @click="visible3 = true"></vc-cell>
        <vc-cell title="圆角" is-link @click="visible4 = true"></vc-cell>
    </demo-block>

    <vc-action-sheet :visible.sync="visible" :value="value" :data="list" @select="onSelect" @close="onClose"></vc-action-sheet>
    <vc-action-sheet :visible.sync="visible2" :value="value2" show-cancel :data="list" @select="onSelect2" @cancel="onCancel"></vc-action-sheet>
    <vc-action-sheet :visible.sync="visible3" :value="value3" :data="list2" @select="onSelect3"></vc-action-sheet>
    <vc-action-sheet :visible.sync="visible4" :value="value3" :data="list2" round @select="onSelect3"></vc-action-sheet>
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
      list: [
        { title: '选项一', value: '1' },
        { title: '选项二', value: '2' },
        { title: '选项三', value: '3' },
      ],
      list2: [
        { title: '选项一', value: '1' },
        { title: '选项二', value: '2' },
        { title: '选项三', value: '3', disabled: true },
      ],
      visible: false,
      visible2: false,
      visible3: false,
      visible4: false,
      value: '2',
      value2: '',
      value3: '',
    }
  },
  methods: {
    onSelect(item) {
      console.log('[debug] 选项>>>', { ...item })
      this.value = item.value
    },
    onSelect2(item) {
      console.log('[debug] 选项>>>', { ...item })
      this.value2 = item.value
    },
    onSelect3(item) {
      console.log('[debug] 选项>>>', { ...item })
      this.value3 = item.value
    },
    onClose() {
      console.log('[debug] action-sheet 关闭')
    },
    onCancel() {
      console.log('[debug] action-sheet 点击了取消')
      wx.showToast({
        title: '弹窗点击了取消按钮',
        icon: 'success',
        mask: true
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@p/assets/styles/index.scss';
</style>
