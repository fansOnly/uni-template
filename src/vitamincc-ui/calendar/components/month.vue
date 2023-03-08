<template>
  <view class="vc-calendar-month">
    <view v-for="(item, index) in days" :key="index"
      :class="['vc-calendar-month__days', item.type === 'disabled' ? 'is-disabled' : null]" @click="onClick(item)">
      <view v-if="['selected', 'start', 'end', 'start-end'].includes(item.type)"
        :class="['vc-calendar-month__day', 'is-active', `is-${item.type}`]">
        <view v-if="item.mark" class="vc-calendar-month__day-top">{{ item.mark }}</view>
        <view class="vc-calendar-month__day-text">{{ item.text }}</view>
        <view v-if="lunar" class="vc-calendar-month__day-bottom">{{ item.lunarText }}</view>
      </view>
      <view v-else-if="item.type === 'middle'" class="vc-calendar-month__day is-middle">
        <view v-if="item.mark" class="vc-calendar__day-top">{{ item.mark }}</view>
        <view class="vc-calendar-month__day-text">{{ item.text }}</view>
        <view v-if="lunar" class="vc-calendar-month__day-bottom">{{ item.lunarText }}</view>
      </view>
      <view v-else :class="['vc-calendar-month__day', item.lunar.isToday ? 'is-today' : null]">
        <view v-if="item.mark" class="vc-calendar-month__day-top">{{ item.mark }}</view>
        <view class="vc-calendar-month__day-text">{{ item.text }}</view>
        <view v-if="lunar" class="vc-calendar-month__day-bottom" :class="[item.lunar.Term ? 'is-solar' : null]">{{
          item.lunarText
        }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { getMonthEndDay, getPrevYearMonth, getNextYearMonth, formatDate } from '../utils'
import lunar from '../utils/lunar'

export default {
  name: 'month-panel',
  inject: ['calendar'],
  props: {
    value: {
      type: [String, Array],
      default: ''
    },
    yearMonth: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      days: [],
      color: '',
      lunar: false,
    }
  },
  watch: {
    value: {
      handler(val) {
        this.setDays()
      },
      immediate: true,
      deep: true
    },
    yearMonth: {
      handler(val) {
        if (!val) return
        this.setDays()
      },
      immediate: true
    }
  },
  created() {
    if (this.calendar) {
      this.color = this.calendar.color
      this.lunar = this.calendar.lunar
      // this.holiday = this.calendar.holiday
    }
  },
  methods: {
    onClick(item) {
      if (item.type === 'disabled') return
      this.$emit('click', item)
    },
    setDays() {
      const [year, month] = this.yearMonth.split('-')
      const days = this.generateDays(year, month)

      const { year: prevYear, month: prevMonth } = getPrevYearMonth(this.yearMonth)
      let prevMonthDays = this.generateDays(prevYear, prevMonth, true)

      const { year: nextYear, month: nextMonth } = getNextYearMonth(this.yearMonth)
      const nextMonthDays = this.generateDays(nextYear, nextMonth, true)

      const startDate = new Date(days[0].value)
      const endDate = new Date(days[days.length - 1].value)
      const monthStartWeekDay = startDate.getDay()
      if (monthStartWeekDay === 0) prevMonthDays = []
      const monthEndWeekDay = endDate.getDay()

      this.days = [...prevMonthDays.slice(-monthStartWeekDay), ...days, ...nextMonthDays.slice(0, 6 - monthEndWeekDay)]
    },
    generateDays(year, month, disabled = false) {
      const days = []
      const endDay = getMonthEndDay(year, month)
      for (let i = 1; i <= endDay; i++) {
        const date = formatDate(`${year}-${month}-${i}`, 'YYYY-MM-DD')
        const type = disabled ? 'disabled' : this.getDayType(date)
        const mark = disabled ? '' : this.getDayMark(type)
        const lunar = this.getDayLunar(year, month, i)
        const lunarText = lunar.isToday ? '今日' : lunar.Term ?? lunar.IDayCn
        // const holidayText = ''

        let item = {
          text: i, // 当前天
          value: date, // 日期值
          type, // 日期类型 start / end / start-end / middle / disabled
          lunar,
          lunarText, // 农历日期
          mark, // 备注
        }
        if (this.calendar.formatter) {
          item = this.calendar.formatter(item)
        }
        days.push(item)
      }
      return days
    },
    getDayType(day) {
      const { type, minDate, maxDate } = this.calendar
      if ((minDate && day < minDate) || (maxDate && day > maxDate)) {
        return 'disabled'
      }
      if (type === 'single') {
        return day === this.value ? 'selected' : ''
      }
      if (type === 'multiple') {
        return this.getMultiDayType(day)
      }
      if (type === 'range') {
        return this.getRangeDayType(day)
      }
      return ''
    },
    getMultiDayType(day) {
      if (!Array.isArray(this.value) || !this.value.length) return ''
      const selected = this.value.map(v => formatDate(v, 'YYYY-MM-DD'))
      return selected.includes(day) ? 'selected' : ''
    },
    getRangeDayType(day) {
      if (!Array.isArray(this.value) || !this.value.length) return ''
      const [startDate, endDate] = this.value.map(v => formatDate(v, 'YYYY-MM-DD'))
      if (day === startDate && startDate === endDate) {
        return 'start-end'
      }
      if (day === startDate) {
        return 'start'
      } else if (day === endDate) {
        return 'end'
      } else if (day > startDate && day < endDate) {
        return 'middle'
      }
      return ''
    },
    getDayLunar(year, month, day) {
      return lunar.solar2lunar(year, month, day)
    },
    getDayMark(type) {
      if (this.calendar.type === 'range') {
        if (type === 'start') {
          return '开始'
        } else if (type === 'end') {
          return '结束'
        } else if (type === 'start-end') {
          return '开始/结束'
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../theme-chalk/components/calendar-month.scss';
</style>
