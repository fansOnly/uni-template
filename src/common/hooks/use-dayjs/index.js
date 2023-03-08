import dayjs from 'dayjs'

const dateFormat = (val, format = 'YYYY-MM-DD HH:mm:ss') => dayjs(val === '' ? undefined : val).format(format)

const dateToUnix = (val) => dayjs(val).unix()

/**
 * @param {*} source 起始日期
 * @param {*} val 变量值
 * @param {*} [unit = 'day | month | year'] 单位
 */
const dateAdd = (source, val, unit) => dayjs(source).add(val, unit)

const dateSubtract = (source, val, unit) => dayjs(source).subtract(val, unit)

export const useDayjs = () => {
  return {
    dateFormat,
    dateToUnix,
    dateAdd,
    dateSubtract
  }
}
