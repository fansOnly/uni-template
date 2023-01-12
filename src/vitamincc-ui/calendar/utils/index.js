import dayjs from 'dayjs'

export const formatDate = (val, format = 'YYYY-MM-DD') => dayjs(val || void 0).format(format)

export const WEEKS = ['日', '一', '二', '三', '四', '五', '六']

/**
 * 比较日期
 */
export const compareDate = (day1, day2) => {
  const date1 = isDate(day1) ? day1 : new Date(day1)
  const date2 = isDate(day2) ? day2 : new Date(day2)
  const time1 = date1.getTime()
  const time2 = date2.getTime()

  if (time1 > time2) {
    return 1
  } else if (time1 < time2) {
    return -1
  }
  return 0
}

/**
 * 日期补零
 */
export const padZero = (str, len = 2) => {
  return String(str).padStart(len, '0')
}

/**
 * 是否是日期
 * @param {} v
 */
export function isDate(val) {
  return Object.prototype.toString.call(val) === '[object Date]' && String(val) !== 'Invalid Date'
}

/**
 * 获取月份的最后一天
 * @param {number} year 年份
 * @param {number} month 月份
 */
export const getMonthEndDay = (year, month) => {
  return 32 - new Date(year, month - 1, 32).getDate()
}

/**
 * 获取上一月
 */
export const getPrevYearMonth = val => {
  let [year, month] = val.split('-')
  const date = new Date(year, +month - 2)
  year = date.getFullYear()
  month = date.getMonth() + 1

  return { year, month: padZero(month) }
}

/**
 * 获取下一月
 */
export const getNextYearMonth = val => {
  let [year, month] = val.split('-')
  const date = new Date(year, month)
  year = date.getFullYear()
  month = date.getMonth() + 1

  return { year, month: padZero(month) }
}

/**
 * 获取日期差
 */
export const getDateDiff = (date1, date2) => {
  const time1 = new Date(date1).getTime()
  const time2 = new Date(date2).getTime()
  return Math.floor((time2 - time1) / (24 * 60 * 60 * 1000)) + 1
}

/**
 * 获取递增日期
 */
export const getOffsetDate = (date, offset = 0) => {
  date = new Date(date)
  const newDate = date.setDate(date.getDate() + offset)
  return formatDate(newDate, 'YYYY-MM-DD')
}
