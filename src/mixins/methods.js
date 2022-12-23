import business from './business'

export default {
  methods: {
    ...business,
    /**
     * 是否全路径
     */
    isHttpPath(path) {
      return /^https?:\/\/.+/.test(path)
    },
    /**
     * 格式化手机号码
     */
    formatMobile(val) {
      return val ? val.replace(/(?=(\d{4})+$)/g, ' ') : val
    },
    /**
     * 数据脱敏(卡号，手机号，姓名等)
     * @param {*} value 脱敏值
     * @param {*} start 起始位置
     * @param {*} end 结束位置
     * @param {*} space 空格格式
     *
     * @example
     * 1. desensitization('6214600180042761374', 4, -4, true) => 6214 *** **** **** 1374
     * 2. desensitization('18866663333', 3. -4) => 188***3333
     * 3. desensitization('李淳风', 0, 1) => *淳风
     * 4. desensitization('李淳风', 1) => 李**
     */
    desensitization(value, start = 0, end = String(value).length, space = false) {
      value = String(value)
      const { length } = value
      if (end > value.length) end = length
      if (end < 0) end = length + end
      if (start < 0) start = length + start
      const masking = '*'.repeat(end - start).replace(/\B(?=(\*{4})+$)/g, space ? ' ' : '')
      const reg = new RegExp(`(.{${ start }}).*(.{${ length - end }})`)
      return value.replace(reg, (_, $1, $2) => {
        return space ? `${$1} ${masking} ${$2}` : $1 + masking + $2
      })
    },
    formatMoneyToCN(num) { // 格式化金额-转化中文"万"
      if (!num) return (num = 0)
      if (num < 10000) return num
      return `${num / 10000 }万`
    },
    /**
     * 利率格式转换
     * 默认最多4位，至少2位，不足补零
     * @param {string} value
     * @param {number} min 2
     * @param {number} max 4
     */
    formatDecimal(value, min = 2, max = 4) {
      if (!value) return (0).toFixed(min)
      const num = Number(value)
      const [integer, decimal = '0'.repeat(min)] = String(num).split('.')
      if (decimal.length < min) {
        return `${integer }.${ decimal.padEnd(min, '0')}`
      } else if (decimal.length >= max) {
        return Number(num).toFixed(max)
      } else {
        return `${integer }.${ decimal}`
      }
    },
    /**
     * 格式化金钱
     * @param {number/string} num 输入值
     * @param {number} fixed 锁定小数位
     * @param {string} delimiter 分隔符
     *  @param {string} type 类型 1、默认保留两位小数(整数自动补零) 2、不保留两位小数
     */
    formatMoney(num, fixed = 2, delimiter = ',', type = '1') {
      if (isNaN(Number(num))) {
        console.warn('[debug] unexpected param type: num should be a valid num or string.')
        return (0).toFixed(fixed)
      }
      num = Number(num).toFixed(fixed)
      const pn = Number(num) >= 0 ? '' : '-'
      let [integer, decimal] = String(num).split('.')
      integer = integer.replace(/^[-+]/, '').replace(/(?!^)(?=(\d{3})+$)/g, delimiter)
      if (type === '1') {
        return `${pn + integer }.${ decimal}`
      } else {
        return pn + integer
      }
    },
    /**
     * 日期转换
     * @param {string|number} val
     * @param {string} str
     *
     * @example
     *  1. transformDate(20220202) => 2022-02-02
     *  2. transformDate(20220202, '年月日') => 2022年02月02日
     */
    transformDate(val, str = '-') {
      str = str.length === 1 ? [str, str, ''] : str
      return String(val).replace(/(\d{4})(\d{2})(\d{2})/, `$1${str[0]}$2${str[1]}$3${str[2]}`)
    }
  }
}
