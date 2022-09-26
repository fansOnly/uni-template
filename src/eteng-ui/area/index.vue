<template>
  <et-picker :visible="visible" :values="initialValues" :options="[PROVINCE_LIST, CITY_LIST, COUNTY_LIST]" option-key="index" :title="title" :rows="rows" :row-height="rowHeight" cascade :config="[{ column: 0, rollback: true }, { column: 1, rollback: true }]" :close-on-click-overlay="closeOnClickOverlay" @close="close" @update="onUpdate" @confirm="onConfirm"></et-picker>
</template>

<script>
import { PROVINCE_LIST, queryCity, queryCounty } from './areaUtil';
export default {
  name: 'et-area',
  props: {
    // 显示开关
    visible: {
      type: Boolean,
      default: false
    },
    // 省市区的值，默认 北京市-北京市-东城区
    values: {
      type: Array,
      default: () => []
    },
    // 选择器的标题
    title: {
      type: String,
      default: '选择地区'
    },
    // 每一项的高度
    rowHeight: {
      type: Number,
      default: 44
    },
    // 显示的行数
    rows: {
      type: Number,
      default: 7
    },
    // 点击遮罩是否关闭菜单
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      PROVINCE_LIST,
      CITY_LIST: [],
      COUNTY_LIST: [],
      // 处理后的默认值
      // 1. 未传入则默认为第一项 0
      // 2. 传入正确的值，查询对应的索引
      // 3. 传入错误的值，转换为第一项 0
      initialValues: new Array(this.values.length).fill(0),
    };
  },
  watch: {
    visible: {
      handler(val) {
        this.initDefaultValues(this.values);
      },
      immediate: true,
    }
  },
  methods: {
    onConfirm(data) {
      // console.log('[debug] 选择省市区的值>>>: ', data);
      this.$emit('confirm', data);
    },
    onUpdate(column, index) {
      // console.log(`[debug -------] >>> 当前操作第${column}列，第${index}项`);
      if (column === 0) {
        this.CITY_LIST = queryCity(this.PROVINCE_LIST[index].value);
        this.COUNTY_LIST = queryCounty(this.CITY_LIST[0].value);
      } else if (column === 1) {
        this.COUNTY_LIST = queryCounty(this.CITY_LIST[index].value);
      }
    },
    initDefaultValues(values) {
      // TODO: 这里的逻辑待优化
      if (values.length) {
        for (let i = 0; i < values.length; i++) {
          const val = values[i];
          if (i === 0) {
            this.updateProvince(val, i);
          } else if (i === 1) {
            this.updateCity(val, i);
          } else if (i === 2) {
            this.updateCountry(val, i);
          }
        }
      } else {
        // 默认地区 - 北京市-北京市-东城区
        const values = ['110000', '110100', '110101'];
        // const values = ['520000', '520100', '520102']
        this.initDefaultValues(values);
      }
    },
    updateProvince(val, index) {
      if (this.isEffective(val)) {
        const current = this.PROVINCE_LIST.findIndex((v) => v.value === val);
        this.initialValues.splice(index, 1, current === -1 ? 0 : current);
      } else {
        this.initialValues.splice(index, 1, 0);
      }
    },
    updateCity(val, index) {
      const provinceIdx = this.initialValues[0];
      this.CITY_LIST = queryCity(this.PROVINCE_LIST[provinceIdx].value);
      if (this.isEffective(val)) {
        const current = this.CITY_LIST.findIndex((v) => v.value === val);
        this.initialValues.splice(index, 1, current === -1 ? 0 : current);
      } else {
        this.initialValues.splice(index, 1, 0);
      }
    },
    updateCountry(val, index) {
      const cityIdx = this.initialValues[1];
      this.COUNTY_LIST = queryCounty(this.CITY_LIST[cityIdx].value);
      if (this.isEffective(val)) {
        const current = this.COUNTY_LIST.findIndex((v) => v.value === val);
        this.initialValues.splice(index, 1, current === -1 ? 0 : current);
      } else {
        this.initialValues.splice(index, 1, 0);
      }
    },
    isEffective(val) {
      return val !== undefined && val !== null;
    },
    close() {
      this.$emit('close');
      this.$emit('update:visible', false);
    },
  }
};
</script>
