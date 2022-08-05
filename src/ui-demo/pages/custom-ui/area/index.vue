<template>
  <view class="page-wrapper">
    <view class="gap"></view>

    <view class="demo-title">地区选择器</view>
    <view class="demo-body">
      <et-button type="primary" block :radius="4" @click="visible5 = true">地区选择</et-button>
      <view v-if="selectedArea.length">{{selectedArea[0].text}}/{{selectedArea[1].text}}/{{selectedArea[2].text}}</view>
      <view v-for="(item, index) in selectedArea" :key="index">{{item.text}} - {{item.value}}</view>
    </view>

    <!-- 地区选择器 -->
    <et-area :visible.sync="visible5" :values="areaValues" @confirm="handleAreaConfirm"></et-area>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 地区选择器
        visible5: false, // 地区picker
        selectedArea: [], // 省市区的选择项
        areaValues: ['520000', '520100', '520102'], // 省市区的选择值 - value
      }
    },
    created() {
    },
    methods: {
      handleAreaConfirm(data) {
        console.log('[debug] 选择省市区的值>>>: ', data)
        this.selectedArea = data
        this.areaValues = this.selectedArea.map((v) => v.value)
        const value = data.map((v) => v.text).join('')
        const reg = new RegExp(
          /.*?(省|市|自治区|岛|九龙|新界|盟|自治州|县|区|旗|乡|镇)/,
          'g'
        )
        console.log('[debug]', value.match(reg))
      },
    },
  }
</script>

<style lang="scss" scoped>
@import '@p/assets/styles/index.scss';
</style>
