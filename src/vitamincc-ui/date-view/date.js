/**
 * 有效期
 */
export const TERMS = [
  { text: '有效', value: 'short' },
  { text: '长期', value: 'long' }
]

/**
 * 季度
 */
export const QUARTERS = [
  { text: '第一季度', value: '01' },
  { text: '第二季度', value: '02' },
  { text: '第三季度', value: '03' },
  { text: '第四季度', value: '04' },
]

/**
 * 时间 - 年
 * 开始日期默认从 1970年 开始
 * 结束日期默认从现在往后顺延 30年
 */
export const END_YEAR = 2100
const startYear = new Date(true).getFullYear()
export const YEARS = createDate(startYear, END_YEAR, '年')

/**
 * 时间 - 月
 */
export const MONTHS = createDate(1, 12, '月')

/**
 * 时间 - 日
 */
export const DAYS = createDays()

/**
 * 时间 - 小时
 */
export const HOURS = createDate(0, 23, '时')

/**
 * 时间 - 分钟
 */
export const MINUTES = createDate(0, 59, '分')

/**
 * 时间 - 秒
 */
export const SECONDS = createDate(0, 59, '秒')

/**
 * 生成日期数据
 * @param {number} start 起始
 * @param {number} end 结束
 * @param {string} unit 单位
 * @param {boolean} fixZero 补零
 */
export function createDate(start, end, unit = '', fixZero = true) {
  if (typeof +start !== 'number' || typeof +end !== 'number') {
    throw TypeError('[error] 起始日期和结束日期必须是 number 类型...')
  }
  const arr = []
  for (let i = Number(start); i <= Number(end); i++) {
    arr.push({ text: (fixZero ? String(i).padStart(2, '0') : i) + unit, value: `${fixZero ? String(i).padStart(2, '0') : i }` })
  }
  return arr
}

/**
 * 生成 日 的数据 - 单独处理
 * 1. 1 3 5 7 8 10 12月份 - 31日
 * 2. 4 6 9 11月份 - 30日
 * 3. 2月份 - 闰年 29日 / 平年 28日
 */
export function createDays(year = new Date().getFullYear(), month = 1, start = 1, end = 31) {
  let last = 31
  const leapFlag = isLeapYear(year)
  if (+month === 2) {
    last = leapFlag ? 29 : 28
  }
  if ([4, 6, 9, 11].includes(+month)) {
    last = 30
  }
  last = last > end ? end : last
  return createDate(start, last, '日')
}

/**
 * 判断是否闰年
 * 1. 普通闰年:公历年份是的倍数的，一般是闰年
 * 2. 世纪闰年:公历年份是整百数的，必须是400的倍数才是闰年
 */
export function isLeapYear(val) {
  val = Number(val)
  return val % 100 === 0 ? val % 400 === 0 : val % 4 === 0
}
