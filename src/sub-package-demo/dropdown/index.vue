<template>
  <view class="page-wrapper" style="height: 2000px;">

    <demo-block title="基础用法">
      <vc-dropdown-menu>
        <vc-dropdown-item :value="value1" :options="list1" @change="handleChange"></vc-dropdown-item>
        <vc-dropdown-item :value="value2" :options="list2" @change="handleChange"></vc-dropdown-item>
        <vc-dropdown-item :value="value3" :options="list3" disabled @change="handleChange"></vc-dropdown-item>
      </vc-dropdown-menu>
    </demo-block>

    <view style="height: 200px;"></view>

    <demo-block title="向上展开">
      <vc-dropdown-menu direction="up">
        <vc-dropdown-item :value="value1" :options="list1" @change="handleChange"></vc-dropdown-item>
        <vc-dropdown-item :value="value2" :options="list2" @change="handleChange"></vc-dropdown-item>
      </vc-dropdown-menu>
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
      list1: [
        { text: '全部商品', value: 0 },
        { text: '全部商品1', value: 1 },
        { text: '全部商品2', value: 2 },
      ],
      list2: [
        { text: '2021年2月', value: '2' },
        { text: '2021年3月', value: '3' },
        { text: '2021年4月', value: '4', disabled: true },
        { text: '2021年5月', value: '5' },
        { text: '2021年6月', value: '6' },
        { text: '2021年7月', value: '7' },
        { text: '2021年8月', value: '8' },
        { text: '2021年9月', value: '9' },
        { text: '2021年10月', value: '10' },
        { text: '2021年11月', value: '11' },
        { text: '2021年12月', value: '12' },
      ],
      list3: [
        { text: '全部订单', value: 'a' },
        { text: '全部订单1', value: 'b' },
        { text: '全部订单2', value: 'c' },
      ],
      value1: 0,
      value2: '4',
      value3: 'a',
    }
  },
  methods: {
    handleChange(item, index) {
      console.log(`[debug] 第${ index + 1 }个菜单选择 >>>`, { ...item })
      this[`value${ index + 1}`] = item.value
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
