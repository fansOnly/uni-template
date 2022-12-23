<template>
  <view class="page-wrapper">
    <demo-block title="基础用法" padding>
      <vc-button type="primary" block :radius="4" @click="visible6 = true">日期选择</vc-button>
      <view>维度设置： fields = year / month / day(默认)</view>
      <view v-if="selectedDate.length">{{ selectedDate[0] }}年{{ selectedDate[1] }}月{{ selectedDate[2] }}日
      </view>

      <view class="gap"></view>
      <vc-button type="primary" block :radius="4" @click="visible10 = true">日期选择 - 日期范围</vc-button>
      <view v-if="selectedDate.length">{{ selectedDate[0] }}年{{ selectedDate[1] }}月{{ selectedDate[2] }}日
      </view>

      <view class="gap"></view>
      <vc-button type="primary" block :radius="4" @click="visible8 = true">时间选择</vc-button>
      <view>维度设置： fields = hour / minute / second(默认)</view>
      <view v-if="selectedDate8.length">
        {{ selectedDate8[0] }}时{{ selectedDate8[1] }}分{{ selectedDate8[2] }}秒</view>

      <view class="gap"></view>
      <vc-button type="primary" block :radius="4" @click="visible9 = true">日期时间选择</vc-button>
      <view>维度设置： fields = hour / minute / second(默认)</view>
      <view v-if="selectedDate9.length">
        {{ selectedDate9[0] }}年{{ selectedDate9[1] }}月{{ selectedDate9[2] }}日{{ selectedDate9[3] }}时{{
        selectedDate9[4]
        }}分{{ selectedDate9[5] }}秒
      </view>

      <view class="gap"></view>
      <vc-button type="primary" block :radius="4" @click="visible11 = true">季度选择</vc-button>
      <view v-if="selectedDate11.length">{{ selectedDate11[0] }}年{{ selectedDate11[1] }}</view>

      <view class="gap"></view>
      <vc-button type="primary" block :radius="4" @click="visible7 = true">日期选择 - 身份证日期</vc-button>
      <view v-if="selectedDate7.length">
        {{ selectedDate7[0] }}{{ selectedDate7[1] }}年{{ selectedDate7[2] }}月{{ selectedDate7[3] }}日
      </view>
    </demo-block>

    <demo-block title="date-view - 联动" padding>
      <vc-button type="primary" :radius="4" block @click="handleStart">起始</vc-button>
      <view v-if="date1.length" class="">{{ date1[0] }}-{{ date1[1] }}-{{ date1[2] }}</view>
      <view class="gap"></view>
      <vc-button type="primary" :radius="4" block @click="handleEnd">结束</vc-button>
      <view v-if="date2.length" class="">{{ date2[0] }}-{{ date2[1] }}-{{ date2[2] }}</view>
      <view class="gap"></view>
      <vc-button type="primary" :radius="4" block @click="handleClose">关闭</vc-button>
    </demo-block>

    <vc-date-view ref="dateView" :visible="visible" :values="dateValues" :start="start" :end="end"
      @change="handleChange"></vc-date-view>

    <!-- 日期选择器 -->
    <vc-date-picker :visible.sync="visible6" :values="dateValues1" @confirm="handleDateConfirm"></vc-date-picker>

    <!-- 日期选择器 - 日期范围 -->
    <vc-date-picker :visible.sync="visible10" :values="dateValues1" start="2020-03-03" end="2022-06-11"
      @confirm="handleDateConfirm"></vc-date-picker>

    <!-- 时间选择器 -->
    <vc-date-picker :visible.sync="visible8" :values="timeValues" type="time" start="07:05:05" end="22:30:29"
      @confirm="handleTimeConfirm"></vc-date-picker>

    <!-- 日期时间选择器 -->
    <vc-date-picker :visible.sync="visible9" type="datetime" fields="minute" :values="dateTimeValues"
      start="2020-05-02 13:25:35" end="2022-06-17 19:06:11" @confirm="handleDateTimeConfirm"></vc-date-picker>

    <!-- 季度选择器 -->
    <vc-date-picker :visible.sync="visible11" type="date" fields="quarter" :values="quarterValues"
      @confirm="handleQuarterConfirm"></vc-date-picker>

    <!-- 日期选择器 - 身份证日期 -->
    <vc-date-picker :visible.sync="visible7" type="ID-date" :values="idDateValues" @confirm="handleIdDateConfirm">
    </vc-date-picker>

  </view>
</template>

<script>
import DemoBlock from '@/components/demo-block/index.vue';
export default {
  components: {
    DemoBlock
  },
  data() {
    return {
      // 日期选择器
      visible6: false,
      selectedDate: [], // 日期的选择项
      dateValues1: ['2000', '02', '27'], // 日期的选择值 - value
      // 日期选择器 - 日期范围
      visible10: false,
      // 日期选择器 - 身份证日期
      visible7: false,
      selectedDate7: [], // 日期的选择项
      idDateValues: ['short', '2000', '01', '31'], // 日期的选择值 - value
      // 时间选择器
      visible8: false,
      selectedDate8: [], // 时间的选择项
      timeValues: ['16', '05', '38'], // 时间的选择值 - value
      // 日期时间选择器
      visible9: false,
      selectedDate9: [], // 日期时间的选择项
      dateTimeValues: ['2022', '05', '19', '15', '05', '38'], // 日期时间的选择值 - value
      // 季度选择
      visible11: false,
      selectedDate11: [], // 选择项
      quarterValues: ['2022', '3'], // 选择值 - value
      // date-view
      visible: false,
      dateValues: [],
      date1: [],
      date2: [],
      start: '',
      end: '',
      active: 'start'
    };
  },
  methods: {
    handleQuarterConfirm(data) {
      console.log('[info] 季度选择的值>>>: ', data);
      this.selectedDate11 = data;
      this.quarterValues = data.map((v) => v);
    },
    handleDateConfirm(data) {
      console.log('[info] 选择日期的值>>>: ', data);
      this.selectedDate = data;
      this.dateValues1 = data.map((v) => v);
    },
    handleIdDateConfirm(data) {
      console.log('[info] 选择日期的值>>>: ', data);
      this.selectedDate7 = data;
      this.idDateValues = data.map((v) => v);
    },
    handleTimeConfirm(data) {
      console.log('[info] 选择时间的值>>>: ', data);
      this.selectedDate8 = data;
      this.timeValues = data.map((v) => v);
    },
    handleDateTimeConfirm(data) {
      console.log('[info] 日期选择日期的值>>>: ', data);
      this.selectedDate9 = data;
      this.dateTimeValues = data.map((v) => v);
    },
    handleStart() {
      this.active = 'start';
      this.dateValues = this.date1;
      this.visible = true;
      this.$refs.dateView.initRender(this.dateValues);
    },
    handleEnd() {
      this.active = 'end';
      this.dateValues = this.date2;
      this.visible = true;
      this.$refs.dateView.initRender(this.dateValues);
    },
    handleChange(data) {
      console.log('[debug] date-view change');
      data.map(v => console.log({ ...v }));
      if (this.active === 'start') {
        this.date1 = data.map(v => v);
      } else if (this.active === 'end') {
        this.date2 = data.map(v => v);
      }
    },
    handleClose() {
      this.visible = false;
      this.active = 'start';
      this.dateValues = [];
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
