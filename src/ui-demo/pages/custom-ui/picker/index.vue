<template>
  <view class="page-wrapper">
    <view class="gap"></view>
    <view class="demo-title">基础用法</view>
      <view class="demo-content">
        <et-button type="primary" block :radius="4" @click="visible1 = true">单栏 picker</et-button>
        <view v-if="selected1.value">{{selected1.text}} - {{selected1.value}}</view>
        <view class="gap"></view>
        <et-button type="primary" block :radius="4" @click="visible2 = true">两栏 - 不关联 picker</et-button>
        <view v-for="(item, index) in selected2" :key="index">{{item.text}} - {{item.value}}</view>
        <view class="gap"></view>
        <et-button type="primary" block :radius="4" @click="visible3 = true">两栏 - 关联 picker</et-button>
        <view v-for="(item, index) in selected3" :key="index">{{item.text}} - {{item.value}}</view>
    </view>

    <view class="gap"></view>
    <view class="demo-title">分步选择器</view>
    <view class="demo-content">
      <et-button type="primary" block :radius="4" @click="handleOpenStepPicker">分步选择器</et-button>
      <view v-if="stepPickerValues.length">{{stepPickerValues[0].text}}/{{stepPickerValues[1].text}}/{{stepPickerValues[2].text}}</view>
      <view v-for="(item, index) in stepPickerValues" :key="index">{{item.text}} - {{item.value}}</view>
      <view v-if="selectedStepPicker.value">默认回回显的值：{{selectedStepPicker.text}} - {{selectedStepPicker.value}}</view>
    </view>

    <!-- 单栏 picker -->
    <et-picker :visible.sync="visible1" :values="singlePickerValues" :options="[singlePickerOption]" title="单栏选择器" @confirm="handleSinglePickerConfirm"></et-picker>

    <!-- 两栏 - 不关联 picker -->
    <et-picker :visible.sync="visible2" :values="doublePickerValues" :options="doublePickerOptions" title="两栏选择器" @confirm="handleDoublePickerConfirm"></et-picker>

    <!-- 两栏 - 关联 picker -->
    <et-picker :visible.sync="visible3" title="两栏选择器" :values="values3" :options="[column1, column2]" :config="[{column: 0, rollback: true}]" cascade @update="onUpdate" @confirm="handleDoublePickerConfirm2"></et-picker>

    <!-- 分步选择器  -->
    <et-steps-picker :visible.sync="visible12" :values="stepPickerValues" :options="stepPickerOptions" :range="[0, 2]" :step="step" :has-next="hasNext" closeable cascade @update="onParentChange" @next="handleNext" @back="handleBack" @confirm="handleStepsPickerConfirm" @close="handleResetStepsPicker"></et-steps-picker>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 单栏 picker
        singlePickerOption: [
          { text: '选项一', value: '1' },
          { text: '选项二', value: '2' },
          { text: '选项三', value: '3' },
          { text: '选项四', value: '4' },
        ],
        visible1: false,
        singlePickerValues: [''],
        selected1: {},
        // 两栏 - 不关联 picker
        doublePickerOptions: [
          [
            { text: '周一', value: '1' },
            { text: '周二', value: '2' },
            { text: '周三', value: '3' },
            { text: '周四', value: '4' },
          ],
          [
            { text: '上午', value: 'a' },
            { text: '下午', value: 'b' },
          ],
        ],
        visible2: false,
        doublePickerValues: [],
        selected2: [],
        // 两栏 - 关联 picker
        column1: [
          { text: '身高', value: 'hight' },
          { text: '血型', value: 'blood' },
        ],
        column2: [],
        visible3: false,
        values3: [],
        selected3: [],
        // 分步选择器 - 假设机构有三级
        visible12: false,
        stepPickerOptions: [], // 选择器的渲染源数据
        // 一级机构数据
        level1: [
          { text: '全部', value: 'every' },
          { text: '上海', value: '02' },
          { text: '安徽', value: '03' },
          { text: '北京', value: '01' },
          { text: '江苏', value: '04' },
        ],
        // 二级机构数据
        level2: [
          { text: '北京市', value: '0101' },
          { text: '上海市', value: '0201' },
          { text: '合肥', value: '0301' },
          { text: '芜湖', value: '0302' },
          { text: '蚌埠', value: '0303' },
          { text: '马鞍山', value: '0304' },
          { text: '南京市', value: '0401' },
          { text: '徐州市', value: '0402' },
          { text: '宿迁市', value: '0403' },
        ],
        // 三级机构数据
        level3: [
          { text: '东城区', value: '010102' },
          { text: '海淀区', value: '010103' },
          { text: '黄浦区', value: '020101' },
          { text: '静安区', value: '020102' },
          { text: '浦东新区', value: '020103' },
          { text: '蜀山区', value: '030101' },
          { text: '高新区', value: '030102' },
          { text: '瑶海区', value: '030103' },
          { text: '庐阳区', value: '030104' },
        ],
        // 选择项
        stepPickerValues: [
          // { key: 'level1', text: '上海', value: '02' },
          // { key: 'level2', text: '上海市', value: '0201' },
          // { key: 'level3', text: '静安区', value: '020102' }
        ],
        hasNext: false,
        step: 1,
        stepValue: 1,
        selectedStepPicker: {}, // 值应该为选中的最后一项的值
      }
    },
    created() {
      const val = this.values3.length ? this.value3[0] : this.column1[0].value
      this.column2 = this.getDataFromParent(val)
    },
    methods: {
      handleOpenStepPicker() {
        // 初始化步骤选择器
        const value1 = this.stepPickerValues[0]?.value || this.level1[0].value
        const value2 = this.stepPickerValues[1]?.value
        this.initStepPicker(value1, value2)
        if (this.stepValue > this.step) {
          this.hasNext = false
        }
        this.step = this.stepValue
        this.visible12 = true
      },
      initStepPicker(value1, value2) {
        this.hasNext = false
        let level2 = []
        if (value1) {
          level2 = this.getChildColumns(this.level2, value1)
          this.stepPickerOptions = [
            { key: 'level1', data: this.level1 },
            { key: 'level2', data: level2 },
          ]
        }
        value2 = value2 || level2[0].value
        console.log('value2: ', value2);
        const level3 = this.getChildColumns(this.level3, value2, false)
        if (level3.length) {
          this.hasNext = true
          this.stepPickerOptions.push({
            key: 'level3', data: level3
          })
        } else {
          this.stepPickerOptions.length = 2
        }
      },
      onParentChange(column, index) {
        // console.log(`[info] >>> 第${column}列，第${index}项`)
        if (this.step === 1) {
          const value = this.stepPickerOptions[column].data[index].value
          if (column == 0) {
            this.initStepPicker(value)
          } else {
            this.initStepPicker('', value)
          }
        }
      },
      handleNext() {
        this.step = 2
        this.hasNext = false
      },
      handleBack() {
        this.step = 1
        this.hasNext = true
      },
      handleStepsPickerConfirm(arr) {
        console.log('[info] 分步选择器的值>>>: ')
        arr.map(v => console.log({...v}))

        this.stepPickerValues = this.stepPickerOptions.map(({key, data}) => {
          const selected = arr.find(v => v.key === key)
          return { key, ...data[selected ? selected.value : 0] }
        })
        // 去除全部选项
        const values = this.stepPickerValues.filter(v => v.value !== 'all')
        this.selectedStepPicker = values[values.length - 1]
        this.stepValue = this.step
        this.step = 1
      },
      getChildColumns(arr, value, fillAll = true) {
        if (!value) return []
        let res = []
        if (value !== 'all') {
          res = arr.filter(v => v.value.startsWith(value))
        }
        fillAll && res.unshift({ text: '全部', value: 'all' })
        return res
      },
      handleResetStepsPicker() {
        this.step = 1
        const value1 = this.stepPickerValues[0]?.value || this.level1[0].value
        const value2 = this.stepPickerValues[1]?.value
        this.initStepPicker(value1, value2)
      },
      handleSinglePickerConfirm(data) {
        console.log('[info] 单栏 picker 选中的值 >>>', data)
        this.selected1 = data[0]
        this.singlePickerValues = data.map((v) => v.value)
      },
      handleDoublePickerConfirm(data) {
        console.log('[info] 两栏 - 不关联 picker 选中的值 >>>', data)
        this.selected2 = data
        this.doublePickerValues = data.map((v) => v.value)
      },
      handleDoublePickerConfirm2(data) {
        console.log('[info] 两栏 - 关联 picker 选中的值 >>>', data)
        this.selected3 = data
        this.values3 = data.map((v) => v.value)
      },
      onUpdate(column, index) {
        console.log(`[info] >>> 当前操作第${column}列，第${index}项`)
        if (column === 0) {
          const val = this.column1[index].value
          this.column2 = this.getDataFromParent(val)
        }
      },
      getDataFromParent(value) {
        if (value === 'hight') {
          return [
            { text: '190cm', value: '1' },
            { text: '180cm', value: '2' },
            { text: '170cm', value: '3' },
            { text: '160cm', value: '4' },
            { text: '155cm', value: '5' },
          ]
        } else if (value === 'blood') {
          return [
            { text: 'A型血', value: 'a' },
            { text: 'B型血', value: 'b' },
            { text: 'AB型血', value: 'ab' },
            { text: 'O型血', value: 'o' },
          ]
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
@import '@p/assets/styles/index.scss';
</style>
