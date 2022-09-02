<template>
  <view class="vc-calender">
    <view class="vc-calender-bar">
      <et-icon name="arrow-left" @click="onChangePrev" />
      <view class="vc-calender__subtitle">{{subtitle}}</view>
      <et-icon name="arrow-right" @click="onChangeNext" />
      <view class="vc-calendar__today et-hairline--surround" :class="{'is-show': notCurrent}" @click="backCurrent">今日</view>
    </view>
    <view class="vc-calender__week">
      <view v-for="item in WEEKS" :key="item" class="vc-calender__week-text">{{ item }}</view>
    </view>
    <view class="vc-calender__body" :style="{'background': background}">
      <vc-month :value="value" :year-month="yearMonth" @click="onClick"></vc-month>
    </view>
  </view>
</template>

<script>
import VcMonth from './components/month'
import { formatDate } from '../common/util'
import { WEEKS, getPrevYearMonth, getNextYearMonth, getDateDiff, getOffsetDate } from './util'
import props from './props'

export default {
  name: 'vc-calendar',
  components: {
    VcMonth
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
      yearMonth: '',
    }
  },
  computed: {
    subtitle() {
      return formatDate(this.yearMonth, 'YYYY年MM月')
    },
    notCurrent() {
      return this.yearMonth !== this.getCurrentYearMonth()
    }
  },
  watch: {
    value: {
      handler(val) {
        let current = ''
        if (val.length) {
          current = Array.isArray(val) ? val[0] : val
        }
        const newYearMonth = formatDate(current, 'YYYY-MM')
        if (this.yearMonth !== newYearMonth) {
          this.yearMonth = newYearMonth
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
        this.$emit('change', item.value)
      } else if (this.type === 'multiple') {
        const selected = this.value.map(v => formatDate(v, 'YYYY-MM-DD'))
        const hasIndex = selected.indexOf(item.value)
        if (hasIndex === -1) {
          selected.push(item.value)
        } else {
          selected.splice(hasIndex, 1)
        }
        this.$emit('change', selected.sort())
      } else if (this.type === 'range') {
        let [startDate = '', endDate = ''] = this.value.map(v => formatDate(v, 'YYYY-MM-DD'))
        const currentDate = item.value

        if (startDate && !endDate) {
          // 判断当前日期是否在起始日期之前
          if (currentDate < startDate) {
            startDate = currentDate
          } else if (currentDate > startDate) {
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
        this.$emit('change', [startDate, endDate].filter(Boolean))
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
.vc-calender {
  overflow: hidden;
}
.vc-calender-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #fff;
}
.vc-calender__subtitle {
  height: 88rpx;
  font-weight: 500;
  line-height: 88rpx;
  text-align: center;
}
.vc-calendar__today {
  position: absolute;
  right: -100%;
  top: 50%;
  width: 40px;
  height: 24px;
  margin-top: -12px;
  border-radius: 2em 0 0 2em;
  color: #737373;
  color: #f60;
  font-size: 12px;
  line-height: 24px;
  text-align: center;
  transition: right ease 300ms;
  &.is-show {
    right: 0;
  }
}
.vc-calender__week {
  display: flex;
  align-items: center;
  position: relative;
  background: #fff;
  box-shadow: 0 4px 5px rgba(0,0,0,.05);
  z-index: 2;
}
.vc-calender__week-text {
  flex: 1;
  text-align: center;
  font-size: 24rpx;
  line-height: 60rpx;
}
</style>
