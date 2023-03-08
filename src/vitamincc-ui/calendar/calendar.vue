<template>
  <view class="vc-calendar">
    <view class="vc-calendar__header">
      <vc-icon name="arrow-left" size="16" custom-style="font-weight: 800;" @click="onChangePrev" />
      <view class="vc-calendar__date">{{ subtitle }}</view>
      <vc-icon name="arrow-right" size="16" custom-style="font-weight: 800;" @click="onChangeNext" />
      <view :class="['vc-calendar__today', showToday ? 'is-show' : null]" @click="backCurrent">
        <vc-icon name="calendar" size="30" />
        <text class="vc-calendar__today-text">{{ today }}</text>
      </view>
    </view>
    <view class="vc-calendar__week">
      <view v-for="item in WEEKS" :key="item" class="vc-calendar__week-text">{{ item }}</view>
    </view>
    <view class="vc-calendar__body">
      <month-panel :value="value" :year-month="yearMonth" @click="onClick" />
    </view>
  </view>
</template>

<script>
import MonthPanel from './components/month'
import { WEEKS, getPrevYearMonth, getNextYearMonth, getDateDiff, getOffsetDate, formatDate } from './utils'
import props from './props'

export default {
  name: 'calendar-panel',
  components: {
    MonthPanel
  },
  provide() {
    return {
      calendar: this
    }
  },
  props,
  data() {
    return {
      WEEKS,
      yearMonth: formatDate('', 'YYYY-MM'),
      today: formatDate('', 'DD')
    }
  },
  computed: {
    subtitle() {
      return formatDate(this.yearMonth, 'YYYY-MM-DD')
    },
    showToday() {
      return this.yearMonth !== this.getCurrentYearMonth()
    }
  },
  watch: {
    value: {
      handler(val) {
        let current
        if (val?.length) {
          current = Array.isArray(val) ? val[0] ?? '' : val
        }
        if (current) {
          const newYearMonth = formatDate(current, 'YYYY-MM')
          if (this.yearMonth !== newYearMonth) {
            this.yearMonth = newYearMonth
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    onClick(item) {
      // console.log('[debug] 点击日期: ', item)
      if (this.type === 'single') {
        this.$emit('change', item.value, false)
      } else if (this.type === 'multiple') {
        const selected = this.value.map(v => formatDate(v))
        const hasIndex = selected.indexOf(item.value)
        if (hasIndex === -1) {
          if (selected.length >= this.maxRange) {
            uni.showToast({
              title: `选择天数不能超过 ${this.maxRange} 天`,
              icon: 'none',
            })
            this.$emit('over-range')
            return
          }
          selected.push(item.value)
        } else {
          selected.splice(hasIndex, 1)
        }
        this.$emit('change', selected.sort(), !selected.length)
      } else if (this.type === 'range') {
        let [startDate = '', endDate = ''] = this.value.map(v => formatDate(v))
        const currentDate = item.value

        if (startDate && !endDate) {
          // 判断当前日期是否在起始日期之前
          if (currentDate < startDate) {
            startDate = currentDate
          } else if (currentDate > startDate) {
            endDate = currentDate
          } else if (this.allowSameDay) {
            endDate = currentDate
          }
        } else {
          startDate = currentDate
          endDate = ''
        }
        if (this.maxRange > 1 && getDateDiff(startDate, endDate) > this.maxRange) {
          uni.showToast({
            title: `选择天数不能超过 ${this.maxRange} 天`,
            icon: 'none',
          })
          endDate = getOffsetDate(startDate, this.maxRange - 1)
          this.$emit('over-range')
        }
        this.$emit('change', [startDate, endDate].filter(Boolean), !startDate || !endDate)
      }
    },
    onChangePrev() {
      const { year, month } = getPrevYearMonth(this.yearMonth)
      this.yearMonth = `${year}-${month}`
    },
    onChangeNext() {
      const { year, month } = getNextYearMonth(this.yearMonth)
      this.yearMonth = `${year}-${month}`
    },
    getCurrentYearMonth() {
      return formatDate('', 'YYYY-MM')
    },
    backCurrent() {
      this.yearMonth = this.getCurrentYearMonth()
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../theme-chalk/components/calendar.scss';
</style>
