<template>
  <view class="page-wrapper">

    <demo-block title="基础用法">
      <van-cell is-link title="选择单个日期" data-type="single" data-id="selectSingle"
        :value="formatFullDate(date.selectSingle)" @click="show" />

      <van-cell is-link title="选择多个日期" data-type="multiple" data-id="selectMultiple"
        :value="formatMultiple(date.selectMultiple)" @click="show" />

      <van-cell is-link title="选择日期区间" data-type="range" data-id="selectRange"
        :value="formatRange(date.selectRange)" @click="show" />
    </demo-block>

    <demo-block title="快捷选择">
      <van-cell is-link title="选择单个日期" data-type="single" data-id="quickSelect1"
        :value="formatFullDate(date.quickSelect1)" @click="show" />

      <van-cell is-link title="选择日期区间" data-type="range" data-id="quickSelect2"
        :value="formatRange(date.quickSelect2)" @click="show" />
    </demo-block>

    <demo-block title="自定义日历">
      <van-cell is-link title="自定义颜色" data-type="range" data-id="customColor"
        :value="formatRange(date.customColor)" @click="show" />

      <van-cell is-link title="自定义日期范围" data-type="single" data-id="customRange"
        :value="formatFullDate(date.customRange)" @click="show" />

      <van-cell is-link title="自定义按钮文字" data-type="range" data-id="customConfirm"
        :value="formatRange(date.customConfirm)" @click="show" />

      <van-cell is-link title="自定义日期文案" data-type="range" data-id="customDayText"
        :value="formatRange(date.customDayText)" @click="show" />

      <van-cell is-link title="自定义弹出位置" data-type="single" data-id="customPosition"
        :value="formatFullDate(date.customPosition)" @click="show" />

      <van-cell is-link title="日期区间最大范围" data-type="range" data-id="maxRange"
        :value="formatRange(date.maxRange)" @click="show" />
    </demo-block>

    <demo-block title="平铺展示">
      <van-calendar title="日历" :poppable="false" :show-confirm="false" :min-date="tiledMinDate" :max-date="tiledMaxDate"
        :first-day-of-week="firstDayOfWeek" class="tiled-calendar" />
    </demo-block>

    <van-calendar :show="showCalendar" :type="type" :color="color" :round="round" :position="position"
      :min-date="minDate" :max-date="maxDate" :max-range="maxRange" :formatter="formatter" :show-confirm="showConfirm"
      :confirm-text="confirmText" :confirm-disabled-text="confirmDisabledText" :first-day-of-week="firstDayOfWeek"
      @confirm="onConfirm" @select="onSelect" @unselect="onUnselect" @open="onOpen" @opened="onOpened" @close="onClose"
      @closed="onClosed">
    </van-calendar>

  </view>
</template>


<script>
import DemoBlock from '@p/components/demo-block'
export default {
  components: {
    DemoBlock
  },
  data() {
    return {
      date: {
        maxRange: [],
        selectSingle: null,
        selectRange: [],
        selectMultiple: [],
        quickSelect1: null,
        quickSelect2: [],
        customColor: [],
        customConfirm: [],
        customRange: null,
        customDayText: [],
        customPosition: null,
      },
      type: 'single',
      round: true,
      color: '',
      minDate: Date.now(),
      maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate()).getTime(),
      maxRange: undefined,
      position: 'bottom',
      formatter: undefined,
      showConfirm: false,
      showCalendar: false,
      tiledMinDate: new Date(2012, 0, 10).getTime(),
      tiledMaxDate: new Date(2012, 2, 20).getTime(),
      confirmText: '确定',
      confirmDisabledText: '确定',
      firstDayOfWeek: 0,
    }
  },
  methods: {
    onConfirm(event) {
      console.log(event);
      this.showCalendar = false
      this.date[this.id] = Array.isArray(event.detail) ? event.detail.map((date) => date.valueOf()) : event.detail.valueOf()
    },
    onSelect(event) {
      console.log(event);
    },
    onUnselect(event) {
      console.log(event);
    },
    onClose() {
      this.showCalendar = false
    },
    onOpen() {
      console.log('open');
    },
    onOpened() {
      console.log('opened');
    },
    onClosed() {
      console.log('closed');
    },
    resetSettings() {
      this.round = true
      this.color = ''
      this.minDate = Date.now()
      this.maxDate = new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate()).getTime()
      this.maxRange = undefined
      this.position = 'bottom'
      this.formatter = undefined
      this.showConfirm = true
      this.confirmText = '确定'
      this.confirmDisabledText = '确定'
    },
    show(event) {
      this.resetSettings();
      const { type, id } = event.currentTarget.dataset;
      const data = {
        id,
        type,
        showCalendar: true,
      };
      switch (id) {
        case 'quickSelect1':
        case 'quickSelect2':
          data.showConfirm = false;
          break;
        case 'customColor':
          data.color = '#07c160';
          break;
        case 'customConfirm':
          data.confirmText = '完成';
          data.confirmDisabledText = '请选择结束时间';
          break;
        case 'customRange':
          data.minDate = new Date(2010, 0, 1).getTime();
          data.maxDate = new Date(2010, 0, 31).getTime();
          break;
        case 'customDayText':
          data.minDate = new Date(2010, 4, 1).getTime();
          data.maxDate = new Date(2010, 4, 31).getTime();
          data.formatter = this.dayFormatter;
          break;
        case 'customPosition':
          data.round = false;
          data.position = 'right';
          break;
        case 'maxRange':
          data.maxRange = 3;
          break;
      }
      for (let key in data) {
        this[key] = data[key]
      }
    },
    dayFormatter(day) {
      const month = day.date.getMonth() + 1;
      const date = day.date.getDate();
      if (month === 5) {
        if (date === 1) {
          day.topInfo = '劳动节';
        }
        else if (date === 4) {
          day.topInfo = '五四青年节';
        }
        else if (date === 11) {
          day.text = '今天';
        }
      }
      if (day.type === 'start') {
        day.bottomInfo = '入店';
      }
      else if (day.type === 'end') {
        day.bottomInfo = '离店';
      }
      return day;
    },
    formatDate(date) {
      if (date) {
        date = new Date(date);
        return date.getMonth() + 1 + '/' + date.getDate();
      }
    },
    formatFullDate(date) {
      if (date) {
        date = new Date(date);
        return date.getFullYear() + '/' + this.formatDate(date);
      }
    },
    formatMultiple(dates) {
      if (dates.length) {
        return '选择了 ' + dates.length + '个日期';
      }
    },
    formatRange(dateRange) {
      if (dateRange.length) {
        return this.formatDate(dateRange[0]) + ' - ' + this.formatDate(dateRange[1]);
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.tiled-calendar {
  --calendar-height: 500px
}
</style>
