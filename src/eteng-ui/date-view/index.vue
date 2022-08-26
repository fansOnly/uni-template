<template>
  <view v-if="visible" class="et-date-view" :style="{ 'height': rowHeight * rows + 'px' }" @touchmove.stop="noop">
    <et-picker-column v-for="(item, index) in renderColumns" :key="index" class="et-picker-col" :options="item.data" :current="getCurrentValue(item.name)" option-key="value" :rows="rows" :row-height="rowHeight" :style="{'max-width': 'calc(100% / '+renderColumns.length+');'}" @change="onChange($event, index)"></et-picker-column>
    <template v-if="renderColumns.length">
      <view class="et-picker-mask" :style="{'background-size': '100% '+(rowHeight * (rows - 1)) / 2 + 'px'}"></view>
      <view :class="['et-picker-line et-hairline--top-bottom', rows % 2 === 0 ? null : 'adapt']" :style="{'height': rowHeight + 'px'}"></view>
    </template>
  </view>
</template>

<script>
import { TERMS, QUARTERS as ALL_QUARTERS, END_YEAR, createDays, createDate } from './date'
import { formatDate } from './util'

export default {
  name: 'et-date-view',
  props: {
    // 显示开关
    visible: {
      type: Boolean,
      default: false
    },
    /**
       * 选择器的类型
       * 1. 身份证日期 - ID-date
       * 2. 日期选择器 - date
       * 3. 时间选择器 - time
       * 4. 日期时间选择器 - datetime
       */
    type: {
      type: String,
      default: 'date'
    },
    /**
       * 日期的值，默认当前日期
       * 支持传入数组和字符串类型
       */
    values: null,
    /**
       * 选择器的粒度
       * 为日期选择器时 有效值 year, month, day(默认), quarter(季度选择器)
       * 为时间选择器时 有效值 hour, minute, second(默认)
       * 为日期时间选择器时 有效值 hour, minute, second(默认)
       */
    fields: null,
    // 表示有效日期范围的开始，字符串格式为"YYYY-MM-DD hh:mm:ss"
    start: null,
    // 表示有效日期范围的结束，字符串格式为"YYYY-MM-DD hh:mm:ss"
    end: null,
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
  },
  data() {
    return {
      dateValues: [], // 选择的日期值数组
      termValue: '', // 期限值
      yearValue: 0, // 年值
      quarterValue: 0, // 季度值
      monthValue: 0, // 月值
      dayValue: 0, // 日值
      hourValue: 0, // 小时值
      minuteValue: 0, // 分钟值
      secondValue: 0, // 秒值
      columnName: '', // 当前的操作列
    }
  },
  computed: {
    renderColumns({ type, fields, termValue }) {
      if (termValue === 'long') {
        return this.getTermLongData()
      }
      return this.getColumnData(type, fields)
    },
    getCurrentValue() {
      return function (name) {
        return this[`${name}Value`]
      }
    },
    dateRange({ type, start, end }) {
      // 校正时间区间
      let startDate = ''; let endDate = ''
      if (['datetime', 'date', 'ID-date'].includes(type)) {
        const startYear = new Date(true).getFullYear()
        startDate = start ? formatDate(start, 'YYYY-MM-DD') : `${startYear}-01-01`
        endDate = end ? formatDate(end, 'YYYY-MM-DD') : `${END_YEAR}-12-31`
      }
      return [startDate, endDate]
    },
    timeRange({ type, start, end }) {
      // 校正时间区间
      let startTime = ''; let endTime = ''
      if (['datetime', 'time'].includes(type)) {
        startTime = start ? formatDate(start, 'hh:mm:ss') : '00:00:00'
        endTime = end ? formatDate(end, 'hh:mm:ss') : '23:59:59'
      }
      return [startTime, endTime]
    },
    YEARS({ dateRange, type }) {
      if (!['date', 'datetime', 'ID-date'].includes(type)) return []

      const [startDate, endDate] = dateRange
      const [start] = startDate.split('-')
      const [end] = endDate.split('-')
      return createDate(start, end, '年')
    },
    QUARTERS({ type, fields, dateRange, yearValue, columnName }) {
      if (type !== 'date' || fields !== 'quarter') return []

      const [startDate, endDate] = dateRange
      let [startYear, startQuarter] = startDate.split('-')
      let [endYear, endQuarter] = endDate.split('-')

      // 传入月份转换成季度
      // const startQuarterValue = this.getQuarterByMonth(startMonth)
      // const endQuarterValue = this.getQuarterByMonth(endMonth)
      const startQuarterIdx = Math.max(ALL_QUARTERS.findIndex(v => v.value === startQuarter), 0)
      const endQuarterIdx = Math.max(ALL_QUARTERS.findIndex(v => v.value === endQuarter), 0)

      let start = 0; let end = 3
      if (yearValue == startYear) {
        start = +startQuarterIdx
      } else if (yearValue == endYear) {
        end = +endQuarterIdx
      }
      // 处理相同年份的范围
      if (startYear == endYear) {
        start = +startQuarterIdx
        end = +endQuarterIdx
      }
      const data = ALL_QUARTERS.slice(start, end + 1)
      this.fixQuarter(columnName, data)
      return data
    },
    MONTHS({ dateRange, type, yearValue, columnName }) {
      if (!['date', 'datetime', 'ID-date'].includes(type)) return []

      const [startDate, endDate] = dateRange
      const [startYear, startMonth] = startDate.split('-')
      const [endYear, endMonth] = endDate.split('-')

      let start = 1; let end = 12
      if (yearValue == startYear) {
        start = +startMonth
      } else if (yearValue == endYear) {
        end = +endMonth
      }
      // 处理相同年份的范围
      if (startYear == endYear) {
        start = +startMonth
        end = +endMonth
      }

      const data = createDate(start, end, '月')
      this.fixMonth(columnName, data)
      return data
    },
    DAYS({ type, fields, dateRange, yearValue, monthValue, columnName }) {
      if (!['date', 'datetime', 'ID-date'].includes(type)) return []
      if (type === 'date' && (fields && fields !== 'day')) return []

      const [startDate, endDate] = dateRange
      const [startYear, startMonth, startDay] = startDate.split('-')
      const [endYear, endMonth, endDay] = endDate.split('-')

      let start = 1; let end = 31
      if (yearValue == startYear && monthValue == startMonth) {
        start = +startDay
      } else if (yearValue == endYear && monthValue == endMonth) {
        end = +endDay
      }
      // 处理相同年份相同月份的范围
      if (startYear == endYear && startMonth == endMonth) {
        start = +startDay
        end = +endDay
      }

      const data = createDays(yearValue, monthValue, start, end)
      this.fixDay(columnName, data)
      return data
    },
    HOURS({ type, timeRange, dateRange, yearValue, monthValue, dayValue, columnName }) {
      if (!['time', 'datetime'].includes(type)) return []

      const [startTime, endTime] = timeRange
      const [startHour] = startTime.split(':')
      const [endHour] = endTime.split(':')
      let start = 0; let end = 23

      if (type === 'time') {
        start = +startHour
        end = +endHour
        return createDate(start, end, '时')
      } else if (type === 'datetime') {
        const [startDate, endDate] = dateRange
        let [startYear, startMonth, startDay] = startDate.split('-')
        let [endYear, endMonth, endDay] = endDate.split('-')

        if (startYear === yearValue && startMonth === monthValue && startDay === dayValue) {
          start = +startHour
        } else if (endYear === yearValue && endMonth === monthValue && endDay === dayValue) {
          end = +endHour
        }

        const data = createDate(start, end, '时')
        this.fixHour(columnName, data)
        return data
      }
      return []
    },
    MINUTES({ type, timeRange, dateRange, hourValue, yearValue, monthValue, dayValue, columnName }) {
      if (!['time', 'datetime'].includes(type)) return []

      const [startTime, endTime] = timeRange
      const [startHour, startMinute] = startTime.split(':')
      const [endHour, endMinute] = endTime.split(':')
      let start = 0; let end = 59

      if (type === 'time') {
        if (hourValue == startHour) {
          start = +startMinute
        } else if (hourValue == endHour) {
          end = +endMinute
        }
        if (startHour == endHour) {
          start = +startMinute
          end = +endMinute
        }
      } else if (type === 'datetime') {
        const [startDate, endDate] = dateRange
        let [startYear, startMonth, startDay] = startDate.split('-')
        let [endYear, endMonth, endDay] = endDate.split('-')

        if (startYear === yearValue && startMonth === monthValue && startDay === dayValue && hourValue == startHour) {
          start = +startMinute
        } else if (endYear === yearValue && endMonth === monthValue && endDay === dayValue && hourValue == endHour) {
          end = +endMinute
        }
        if (startYear === yearValue && startMonth === monthValue && startDay === dayValue && startHour == endHour) {
          start = +startMinute
          end = +endMinute
        }
      }

      const data = createDate(start, end, '分')
      this.fixDay(columnName, data)
      return data
    },
    SECONDS({ type, fields, timeRange, dateRange, hourValue, minuteValue, yearValue, monthValue, dayValue, columnName }) {
      if (!['time', 'datetime'].includes(type)) return []
      if (fields && fields !== 'second') return []

      const [startTime, endTime] = timeRange
      const [startHour, startMinute, startSecond] = startTime.split(':')
      const [endHour, endMinute, endSecond] = endTime.split(':')
      let start = 0; let end = 59

      if (type === 'time') {
        if (hourValue == startHour && minuteValue == startMinute) {
          start = +startSecond
        } else if (hourValue == endHour && minuteValue == endMinute) {
          end = +endSecond
        }
        // 处理相同年份相同月份的范围
        if (startHour == endHour && startMinute == endMinute) {
          start = +startSecond
          end = +endSecond
        }
      } else if (type === 'datetime') {
        const [startDate, endDate] = dateRange
        let [startYear, startMonth, startDay] = startDate.split('-')
        let [endYear, endMonth, endDay] = endDate.split('-')

        if (startYear === yearValue && startMonth === monthValue && startDay === dayValue && hourValue == startHour && minuteValue == startMinute) {
          start = +startSecond
        } else if (endYear === yearValue && endMonth === monthValue && endDay === dayValue && hourValue == endHour && minuteValue == endMinute) {
          end = +endSecond
        }
        // 处理相同年份相同月份的范围
        if (startYear === yearValue && startMonth === monthValue && startDay === dayValue && startHour == endHour && startMinute == endMinute) {
          start = +startSecond
          end = +endSecond
        }
      }

      const data = createDate(start, end, '秒')
      this.fixSecond(columnName, data)
      return data
    },
    columnValues({ type, fields, termValue, yearValue, quarterValue, monthValue, dayValue, hourValue, minuteValue, secondValue }) {
      // 当前选中的数据
      let values = [termValue, yearValue, monthValue, dayValue, hourValue, minuteValue, secondValue]
      switch (type) {
      case 'ID-date':
        values = values.slice(0, 4)
        break
      case 'time':
        if (fields === 'hour') {
          values = values.slice(4, 5)
        } else if (fields === 'minute') {
          values = values.slice(4, 6)
        } else {
          values = values.slice(4)
        }
        break
      case 'datetime':
        if (fields === 'hour') {
          values = values.slice(1, 5)
        } else if (fields === 'minute') {
          values = values.slice(1, 6)
        } else {
          values = values.slice(1)
        }
        break
      default:
        if (fields === 'year') {
          values = values.slice(1, 2)
        } else if (fields === 'month') {
          values = values.slice(1, 3)
        } else if (fields === 'quarter') {
          values = [yearValue, quarterValue]
        } else {
          values = values.slice(1, 4)
        }
        break
      }
      return values
    },
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          this.initRender()
        } else {
          setTimeout(() => {
            this.resetData()
          }, 0)
        }
      }
    },
  },
  methods: {
    onChange(value, index) {
      // console.log(`[debug] >>> 当前操作第${index}列`, value);
      const columnName = this.renderColumns[index].name
      this.columnName = columnName
      this[`${columnName}Value`] = value
      if (columnName === 'term') {
        if (value === 'long') {
          this.preYearValue = this.yearValue
          this.preMonthValue = this.monthValue
          this.preDayValue = this.dayValue
          this.yearValue = this.monthValue = this.dayValue = '--'
        } else {
          this.yearValue = this.preYearValue
          this.monthValue = this.preMonthValue
          this.dayValue = this.preDayValue
        }
      }

      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }

      this.timer = setTimeout(() => {
        this.emitChange()
      }, 60)
    },
    initRender(initValue = this.values) {
      if (typeof initValue === 'string') {
        initValue = initValue.match(/([a-zA-Z]+)|(\d{1,4})/g)
      }
      if (initValue && initValue.length) {
        for (let i = 0; i < this.renderColumns.length; i++) {
          const name = this.renderColumns[i].name
          const shouldBreak = this.initValueByName(name, initValue[i])

          if (shouldBreak === 'break') {
            break
          }
        }
        this.$nextTick(() => {
          this.emitChange()
        })
      } else {
        initValue = this.setNowAsDefault()
        this.initRender(initValue)
      }
    },
    emitChange() {
      const items = this.columnValues.reduce((acc, cur, i) => {
        const data = this.renderColumns[i].data
        return [...acc, data.find(v => v.value === cur)]
      }, [])
      this.$emit('change', this.columnValues, items)
    },
    initValueByName(name, value) {
      if (name === 'term') {
        this.termValue = value
        if (value === 'long') {
          this.yearValue = this.monthValue = this.dayValue = '--'
          return 'break'
        }
      } else {
        const columns = this[`${name.toUpperCase()}S`]
        const selected = columns.find(v => v.value === this.fixZero(value)) || columns[0]
        this[`${name}Value`] = selected.value
      }
    },
    getColumnData(type, fields) {
      let res = [
        { name: 'term', data: TERMS },
        { name: 'year', data: this.YEARS },
        { name: 'month', data: this.MONTHS },
        { name: 'day', data: this.DAYS },
        { name: 'hour', data: this.HOURS },
        { name: 'minute', data: this.MINUTES },
        { name: 'second', data: this.SECONDS }
      ]
      switch (type) {
      case 'ID-date':
        res = res.slice(0, 4)
        break
      case 'datetime':
        if (fields === 'hour') {
          res = res.slice(1, 5)
        } else if (fields === 'minute') {
          res = res.slice(1, 6)
        } else {
          res = res.slice(1)
        }
        break
      case 'time':
        if (fields === 'hour') {
          res = res.slice(4, 5)
        } else if (fields === 'minute') {
          res = res.slice(4, 6)
        } else {
          res = res.slice(4)
        }
        break
      default:
        if (fields === 'year') {
          res = res.slice(1, 2)
        } else if (fields === 'month') {
          res = res.slice(1, 3)
        } else if (fields === 'quarter') {
          res = [
            { name: 'year', data: this.YEARS },
            { name: 'quarter', data: this.QUARTERS },
          ]
        } else {
          res = res.slice(1, 4)
        }
      }
      return res
    },
    setNowAsDefault() {
      // 设置默认日期
      const date = new Date()
      const year = date.getFullYear() + ''
      const month = date.getMonth() + 1 + ''
      const quarter = this.getQuarterByMonth(month)
      const { type, fields } = this
      switch (type) {
      case 'ID-date':
        return 'short ' + formatDate('', 'YYYY-MM-DD')
      case 'datetime':
        if (fields === 'hour') {
          return formatDate('', 'YYYY-MM-DD hh')
        } else if (fields === 'minute') {
          return formatDate('', 'YYYY-MM-DD hh:mm')
        } else {
          return formatDate()
        }
      case 'time':
        if (fields === 'hour') {
          return formatDate('', 'hh')
        } else if (fields === 'minute') {
          return formatDate('', 'hh:mm')
        } else {
          return formatDate('', 'hh:mm:ss')
        }
      default:
        if (fields === 'year') {
          return formatDate('', 'YYYY')
        } else if (fields === 'month') {
          return formatDate('', 'YYYY-MM')
        } else if (fields === 'quarter') {
          return [year, quarter]
          // return formatDate('', 'YYYY-MM')
        } else {
          return formatDate('', 'YYYY-MM-DD')
        }
      }
    },
    fixQuarter(columnName, data) {
      // 年变化时 校正季度的值
      if (columnName === 'year') {
        const [min, max] = [data[0], data[data.length - 1]]
        if (this.quarterValue > max.value) {
          this.quarterValue = max.value
        } else if (this.quarterValue < min.value) {
          this.quarterValue = min.value
        }
      }
    },
    fixMonth(columnName, data) {
      // 年变化时 校正月份的值
      if (columnName === 'year') {
        const [min, max] = [data[0], data[data.length - 1]]
        if (this.monthValue > max.value) {
          this.monthValue = max.value
        } else if (this.monthValue < min.value) {
          this.monthValue = min.value
        }
      }
    },
    fixDay(columnName, data) {
      // 年、月变化时 校正天的值
      if (['year', 'month'].includes(columnName)) {
        const [min, max] = [data[0], data[data.length - 1]]
        if (this.dayValue > max.value) {
          this.dayValue = max.value
        } else if (this.dayValue < min.value) {
          this.dayValue = min.value
        }
      }
    },
    fixHour(columnName, data) {
      // 年月日变化时 校正时针的值
      if (['year', 'month', 'day'].includes(columnName)) {
        const [min, max] = [data[0], data[data.length - 1]]
        if (this.hourValue > max.value) {
          this.hourValue = max.value
        } else if (this.hourValue < min.value) {
          this.hourValue = min.value
        }
      }
    },
    fixSecond(columnName, data) {
      // 年 月 日 时 分 变化时 校正 秒 的值
      if (['year', 'month', 'day', 'hour', 'minute'].includes(columnName)) {
        const [min, max] = [data[0], data[data.length - 1]]
        if (this.secondValue > max.value) {
          this.secondValue = max.value
        } else if (this.secondValue < min.value) {
          this.secondValue = min.value
        }
      }
    },
    resetData() {
      this.termValue = this.yearValue = this.quarterValue = this.monthValue = this.dayValue = this.hourValue = this.minuteValue = this.secondValue = this.columnName = ''
    },
    getTermLongData() {
      const empty = [{ text: '--', value: '--' }]
      return [
        { name: 'term', data: TERMS },
        { name: 'year', data: empty },
        { name: 'month', data: empty },
        { name: 'day', data: empty },
      ]
    },
    getQuarterByMonth(month) {
      if (month < 4) {
        return '01'
      } else if (month < 7) {
        return '02'
      } else if (month < 10) {
        return '03'
      } else {
        return '04'
      }
    },
    fixZero(value) {
      return String(value).padStart(2, '0')
    },
    noop() {}
  }
}
</script>

<style lang="scss" scoped>
  .et-date-view {
    display: flex;
    justify-content: space-between;
    position: relative;
    background: #fff;
    overflow: hidden;
  }
  .et-picker-mask {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(180deg,hsla(0, 0%, 100%, 0.9),hsla(0, 0%, 100%, 0.4)),linear-gradient(0deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.4));
    background-repeat: no-repeat;
    background-position: top, bottom;
    backface-visibility: hidden;
    z-index: 2;
    pointer-events: none;
  }
  .et-picker-line {
    position: absolute;
    top: 50%;
    right: 0;
    width: 100%;
    z-index: 1;
    pointer-events: none;
    &.adapt {
      transform: translateY(-50%);
    }
  }
  .et-picker-col {
    flex: 1;
    overflow: hidden;
  }
</style>
