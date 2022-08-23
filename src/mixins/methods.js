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
		 * 脱敏处理
		 * @param {*} value 输入值
		 * @param {*} start 起始位置
		 * @param {*} end 结束位置
		 */
    dataMasking(value, start = 0, end = 0, space = false) {
      value = String(value)
      if (end > value.length) end = value.length
      if (start < 0) start = 0
      const reg = new RegExp('(\\d{' + start + '})\\d*(\\d{' + (value.length - end) + '})')
      return value.replace(reg, (_, $1, $2) => {
        return $1 + '*'.repeat(end - start).replace(/\B(?=(\*{4})+$)/g, space ? ' ' : '') + (space
          ? ' ' : '') + $2
      })
    },
    // 银行卡号码脱敏处理
    senseCardNo(value) {
      return String(value).replace(/^(\d{4}).+(\d{4})$/, '$1****$2')
    },
    senseMobile(phone) { // 手机号脱敏
      if (phone) return phone.replace(/^(\d{3})\d*(\d{4})$/, '$1****$2')
    },
    senseId(value) { // 身份证号码脱敏
      if (value) {
        if (value.length == 15) { // 15位
          return value.replace(/^(\d{4})\d*([0-9]{3}[0-9]|X|x)$/, '$1*******$2')
        } else { // 默认18位
          return value.replace(/^(\d{4})\d*([0-9]{3}[0-9]|X|x)$/, '$1**********$2')
        }
      }
    },
    senseName(value) { // 姓名非姓氏脱敏
      if (value) {
        let _result = ''
        const _valueArr = value.split('')
        _valueArr.forEach((v, i) => {
          if (i > 0) _result += '*'
        })

        return value.replace(/^([\u4e00-\u9fa5])[\u4e00-\u9fa5]+$/, `$1${_result}`)
      }
    },
    denseName(value) { // 姓名姓氏脱敏
      if (value) {
        const reg = /^./
        value = value.replace(reg, '*')
      }
      return value
    },

    formatMoneyToCN(num) { // 格式化金额-转化中文"万"
      if (!num) return (num = 0)
      if (num < 10000) return num
      return num / 10000 + '万'
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
        return integer + '.' + decimal.padEnd(min, '0')
      } else if (decimal.length >= max) {
        return Number(num).toFixed(max)
      } else {
        return integer + '.' + decimal
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
        return pn + integer + '.' + decimal
      } else {
        return pn + integer
      }
    },
    /**
		 * 数值单位格式化
		 * @param {string/number} value
		 * @param {string} unit [%, vw, vh] 默认支持%单位，支持转换为 vw / vh
		 */
    addUnit(value, unit = '') {
      const regexp = /^-?\d+(\.\d+)?$/
      return regexp.test(String(value)) ? (value * 2) + 'rpx' : String(value).replace(
        /^(\d+)([%|vw|vh|rpx|px])$/g, unit ? `$1${unit}` : '$1$2')
    },
    /**
     * 合并自定义类/样式
     */
    mergeStyles(styles) {
      return styles.filter(Boolean).reduce((acc, cur) => `${acc} ${cur}`, '')
    },
    /**
		 * 日期转换  20220203----2022-02-03/
		 * @param {string/number} value
		 *
		 */
    formatDateType(value, type) {
      if (value && type == '1') {
        return value.slice(0, 4) + '-' + value.slice(4, 6) + '-' + value.slice(6, 8)
      } else if (value && type == '2') {
        return value.slice(0, 4) + '年' + value.slice(4, 6) + '月' + value.slice(6, 8) + '日'
      }
    },
    //姓名\昵称脱敏
    nameCheck(str, type = '1') {
      if ((str ?? '') !== '') {
        //去除名称中的空格
        str = str.replace(/\s/g, '')
        if (type === '1') {
          if (str.length == 2) {
            return str.substring(0, 1) + '*' //截取name 字符串截取第一个字符，
          } else if (str.length == 3) {
            return str.substring(0, 1) + '*' + str.substring(2, 3)//截取第一个和第三个字符
          } else if (str.length > 3) {
            return str.substring(0, 1) + '*' + str.substring(2, 3) + '...'//截取第一个和大于第4个字符
          }
        } else {
          if (str.length > 4) {
            return str.substring(0, 4) + '...'//截取第一个和大于第4个字符
          } else {
            return str
          }
        }
      } else {
        return '暂无'
      }
    }
  }
}
