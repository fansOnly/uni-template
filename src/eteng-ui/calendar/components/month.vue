<template>
  <view class="vc-calender-month">
    <view v-for="(item, index) in days" :key="index" class="vc-calender__days"
      :class="[item.type ? `is-${item.type}` : null]" :style="{ 'height': rowHeight + 'px' }" @click="onClick(item)">
      <view v-if="['selected', 'multiple-selected', 'start', 'end', 'start-end'].includes(item.type)" class="vc-calender__days-item"
        :style="{ 'background': color }">
        <view v-if="item.mark" class="vc-calender__mark">{{ item.mark }}</view>
        <view class="vc-calender__text">{{ item.text }}</view>
        <view v-if="lunar" class="vc-calender__lunar">{{ item.lunarText }}</view>
      </view>
      <view v-else-if="item.type === 'middle'" class="vc-calender__days-item"
        :style="{ 'background': colorLighter, 'color': color }">
        <view v-if="item.mark" class="vc-calender__mark">{{ item.mark }}</view>
        <view class="vc-calender__text">{{ item.text }}</view>
        <view v-if="lunar" class="vc-calender__lunar">{{ item.lunarText }}</view>
      </view>
      <view v-else class="vc-calender__days-item" :class="{'is-today': item.lunar.isToday}">
        <view v-if="item.mark" class="vc-calender__mark">{{ item.mark }}</view>
        <view class="vc-calender__text">{{ item.text }}</view>
        <view v-if="lunar" class="vc-calender__lunar" :class="[item.lunar.Term ? 'is-solar' : null]">{{ item.lunarText }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { formatDate } from '../../common/util';
import { ROW_HEIGHT, getMonthEndDay, hexToRgb, getPrevYearMonth, getNextYearMonth } from '../util';
import lunar from '../lunar';

export default {
  name: 'vc-month',
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
      hexToRgb,
      rowHeight: ROW_HEIGHT,
      days: [],
      color: '',
      lunar: false,
    };
  },
  computed: {
    colorLighter() {
      const [red, green, blue] = hexToRgb(this.color);
      return `rgba(${red}, ${green}, ${blue}, 0.2)`;
    }
  },
  watch: {
    value: {
      handler(val) {
        this.setDays();
      },
      immediate: true,
      deep: true
    },
    yearMonth: {
      handler(val) {
        if (!val) return;
        this.setDays();
      },
      immediate: true
    }
  },
  created() {
    this.rowHeight = this.calendar.rowHeight;
    this.color = this.calendar.color;
    this.lunar = this.calendar.lunar;
    this.solarTerm = this.calendar.solarTerm;
  },
  methods: {
    onClick(item) {
      if (item.type === 'disabled') return;
      this.$emit('click', item);
    },
    setDays() {
      const [year, month] = this.yearMonth.split('-');
      const days = this.generateDays(year, month);

      const { year: prevYear, month: prevMonth } = getPrevYearMonth(this.yearMonth);
      let prevMonthDays = this.generateDays(prevYear, prevMonth, true);

      const { year: nextYear, month: nextMonth } = getNextYearMonth(this.yearMonth);
      const nextMonthDays = this.generateDays(nextYear, nextMonth, true);

      const startDate = new Date(days[0].value);
      const endDate = new Date(days[days.length - 1].value);
      const monthStartWeekDay = startDate.getDay();
      if (monthStartWeekDay === 0) prevMonthDays = [];
      const monthEndWeekDay = endDate.getDay();

      this.days = [...prevMonthDays.slice(-monthStartWeekDay), ...days, ...nextMonthDays.slice(0, 6 - monthEndWeekDay)];
    },
    generateDays(year, month, disabled = false) {
      const days = [];
      const endDay = getMonthEndDay(year, month);
      for (let i = 1; i <= endDay; i++) {
        const date = formatDate(`${year}-${month}-${i}`, 'YYYY-MM-DD');
        const type = disabled ? 'disabled' : this.getDayType(date);
        const mark = disabled ? '' : this.getDayMark(type);
        const lunar = this.getDayLunar(year, month, i);
        const lunarText = lunar.isToday ? '今日' : lunar.Term ?? lunar.IDayCn;

        let item = {
          text: i, // 当前天
          value: date, // 日期值
          type, // 日期类型 start / end / middle / disabled
          lunar,
          lunarText, // 农历日期
          mark, // 备注
        };
        if (this.calendar.formatter) {
          item = this.calendar.formatter(item);
        }
        days.push(item);
      }
      return days;
    },
    getDayType(day) {
      const { type, minDate, maxDate } = this.calendar;
      if ((minDate && day < minDate) || (maxDate && day > maxDate)) {
        return 'disabled';
      }
      if (type === 'single') {
        return day === this.value ? 'selected' : '';
      }
      if (type === 'multiple') {
        return this.getMultiDayType(day);
      }
      if (type === 'range') {
        return this.getRangeDayType(day);
      }
      return '';
    },
    getMultiDayType(day) {
      if (!Array.isArray(this.value) || !this.value.length) return '';
      const selected = this.value.map(v => formatDate(v, 'YYYY-MM-DD'));
      return selected.includes(day) ? 'multiple-selected' : '';
    },
    getRangeDayType(day) {
      if (!Array.isArray(this.value) || !this.value.length) return '';
      const [startDate, endDate] = this.value.map(v => formatDate(v, 'YYYY-MM-DD'));
      if (day === startDate && startDate === endDate) {
        return 'start-end';
      }
      if (day === startDate) {
        return 'start';
      } else if (day === endDate) {
        return 'end';
      } else if (day > startDate && day < endDate) {
        return 'middle';
      }
      return '';
    },
    getDayLunar(year, month, day) {
      return lunar.solar2lunar(year, month, day);
    },
    getDayMark(type) {
      if (this.calendar.type === 'range') {
        if (type === 'start') {
          return '开始';
        } else if (type === 'end') {
          return '结束';
        } else if (type === 'start-end') {
          return '开始/结束';
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.vc-calender-month {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.vc-calender__days {
  width: calc(100% / 7);
  color: #252525;

  &.is-disabled {
    color: #c0c0c0;
    /* #ifdef H5 */
    cursor: pointer
      /* #endif */
  }

  &.is-selected,
  &.is-multiple-selected,
  &.is-start,
  &.is-start-end,
  &.is-end {
    color: #fff;

    & .vc-calender__lunar,
    & .vc-calender__mark {
      color: #fff;
    }
  }

  &.is-selected .vc-calender__days-item,
  &.is-start-end .vc-calender__days-item,
  &.is-multiple-selected .vc-calender__days-item {
    border-radius: 4px;
  }

  &.is-start .vc-calender__days-item {
    border-radius: 4px 0 0 4px;
  }

  &.is-end .vc-calender__days-item {
    border-radius: 0 4px 4px 0;
  }
}

.vc-calender__days-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  &.is-today {
    color: #f60;
    & .vc-calender__lunar {
      color: inherit;
    }
  }
}

.vc-calender__lunar {
  color: #B3B3B3;
  font-size: 12px;

  &.is-festival {
    color: #f60;
  }
  &.is-solar {
    color: #5f83da;
  }
}

.vc-calender__text {
  font-size: 18px;
  font-weight: 500;
  line-height: 1;
}

.vc-calender__mark {
  font-size: 12px;
  color: #737373;
}
</style>
