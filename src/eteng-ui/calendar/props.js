
import cssVariables from '../common/style/var.scss'
import { ROW_HEIGHT } from './util'

export default {
  /**
   * 默认值
   * @property value
   * @param {string} [type = 'single']
   * @param {Array} [type = 'multiple' || type = 'range']
   */
  value: {
    type: [String, Array],
    default: ''
  },
  /**
   * @property {string}
   *  @value [default = single]  单个日期
   *  @value multiple  多个日期
   *  @value range  日期区间
   */
  type: {
    type: String,
    default: 'single'
  },
  // 起始日期
  minDate: {
    type: String,
    default: ''
  },
  // 结束日期
  maxDate: {
    type: String,
    default: ''
  },
  // 最多选择日期数量
  maxRange: {
    type: Number,
    default: -1
  },
  // 日历月份行高
  rowHeight: {
    type: Number,
    default: ROW_HEIGHT
  },
  // 日历月份背景色
  background: {
    type: String,
    default: cssVariables.colorWhite
  },
  // 选中的日期颜色
  color: {
    type: String,
    default: cssVariables.colorPrimary
  },
  // 显示农历
  lunar: {
    type: Boolean,
    default: true
  },
  // 月份背景
  mark: {
    type: Boolean,
    default: true
  },
  // 日期范围可以为同一天
  allowSameDay: {
    type: Boolean,
    default: false
  },
  // 显示节假日
  // solarTerm: {
  //   type: Boolean,
  //   default: true
  // },
  // 格式化日期文案
  formatter: {
    type: Function,
    default: null
  }
}
