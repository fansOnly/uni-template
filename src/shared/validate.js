/**
 * 转换为字符
 * @param {Object} v
 */
export const toString = (v) => {
  return Object.prototype.toString.apply(v)
}

/**
 * 是否 json 字符串
 */
export const isJsonString = str => {
  return /^\{(\"(.+)\"\:(.+))\}/.test(str)
}

/**
* 是否已定义
* @param {} v
*/
export function isDefined(v) {
  return typeof v !== 'undefined'
}

/**
 * 是否为空
 * @param {} v
 * @param {} allowBlank
 */
export function isEmpty(v, allowBlank) {
  if (isObject(v)) {
    let name
    for (name in v) {
      return false
    }
    return true
  }
  if (isArray(v)) {
    return !v.length
  }
  return v === null || v === undefined || String(v).toUpperCase() === 'NULL' || (!allowBlank ? v === '' : false)
}

/**
 * 是否是数组
 * @param {} v
 */
export function isArray(v) {
  return toString(v) === '[object Array]'
}

/**
 * 是否是日期
 * @param {} v
 */
export function isDate(v) {
  return toString(v) === '[object Date]' && String(v) !== 'Invalid Date'
}

/**
 * 是否是对象
 * @param {} v
 */
export function isObject(v) {
  return !!v && toString(v) === '[object Object]' && !isNumber(v.length) && !isFunction(v.splice) && (!isFunction(v.propertyIsEnumerable) || !v.propertyIsEnumerable('splice'))
}

/**
 * 是否是函数
 * @param {} v
 */
export function isFunction(v) {
  return toString(v) === '[object Function]'
}

/**
 * 是否是 Promise
 * @param {} v
 */
export function isPromise(v) {
  return toString(v) === '[object Promise]'
}

/**
 * 是否是数值型
 * @param {} v
 */
export function isNumber(v) {
  return typeof v === 'number' && isFinite(v)
}

/**
 * 是否是字符型
 * @param {} v
 */
export function isString(v) {
  return typeof v === 'string'
}

/**
 * 是否是布尔型
 * @param {} v
 */
export function isBoolean(v) {
  return typeof v === 'boolean'
}

/**
 * 是否是原始类型
 * @param {} v
 */
export function isPrimitive(v) {
  return isString(v) || isNumber(v) || isBoolean(v)
}

/**
 * 是否可迭代
 * @param {} v
 */
export function isIterable(v) {
  return (v && typeof v !== 'string') ? isDefined(v.length) : false
}

/**
 * 手机号规则
 */
export function checkMobile(v) {
  return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(String(v))
}

/**
 * 密码规则
 * ∙不能包含空格
 * 8-16个字符
 * 至少包含字母、数字、符号中的2种
 */
export function checkPass(v) {
  return /^(?![-`=\[\];',.~!@#$%^&*()_+|{}:"?]+$)(?![0-9]+$)(?![A-Za-z]+$)[0-9a-zA-Z-`=\[\];',.~!@#$%^&*()_+|{}:"?]{8,16}$/.test(String(v))
}

/**
 * 身份证规则
 */
export function checkIdCard(v) {
  const IDRe18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  const IDre15 = /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/
  return IDRe18.test(String(v)) || IDre15.test(String(v))
}

/**
 * 微信号规则
 * 字母开头，6-20位字母、数字、下划线和减号
 */
export function checkWechatId(v) {
  return /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/.test(String(v))
}

/**
 * 邮箱规则
 * 不能包含特殊字符
 */
export function checkEmail(v) {
  return /[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/.test(String(v))
}

/**
 * 地址规则
 * 5-50个字符，不能全数字
 */
export function checkAddress(v) {
  return /^(?!\d+$)[\dA-Za-z\u4e00-\u9fa5]{5,50}$/.test(String(v))
}

/**
 * 姓名规则
 * 2-20个字符
 */
export function checkName(v) {
  return /^[\u4e00-\u9fa5]{2,20}$/.test(String(v))
}

/**
 * 银行卡规则
 */
export function checkLuhn(bankno) {
  if (!bankno) return false
  const lastNum = bankno.substr(bankno.length - 1, 1)//取出最后一位（与luhn进行比较）
  const first15Num = bankno.substr(0, bankno.length - 1)//前15或18位
  const newArr = new Array()
  for (let i = first15Num.length - 1; i > -1; i--) {    //前15或18位倒序存进数组
    newArr.push(first15Num.substr(i, 1))
  }
  const arrJiShu = new Array()  //奇数位*2的积 <9
  const arrJiShu2 = new Array() //奇数位*2的积 >9
  const arrOuShu = new Array()  //偶数位数组
  for (let j = 0; j < newArr.length; j++) {
    if ((j + 1) % 2 == 1) {//奇数位
      if (parseInt(newArr[j]) * 2 < 9) {
        arrJiShu.push(parseInt(newArr[j]) * 2)
      } else {
        arrJiShu2.push(parseInt(newArr[j]) * 2)
      }
    } else {
      //偶数位
      arrOuShu.push(newArr[j])
    }
  }
  const jishu_child1 = new Array()//奇数位*2 >9 的分割之后的数组个位数
  const jishu_child2 = new Array()//奇数位*2 >9 的分割之后的数组十位数
  for (let h = 0; h < arrJiShu2.length; h++) {
    jishu_child1.push(parseInt(arrJiShu2[h]) % 10)
    jishu_child2.push(parseInt(arrJiShu2[h]) / 10)
  }
  let sumJiShu = 0 //奇数位*2 < 9 的数组之和
  let sumOuShu = 0 //偶数位数组之和
  let sumJiShuChild1 = 0 //奇数位*2 >9 的分割之后的数组个位数之和
  let sumJiShuChild2 = 0 //奇数位*2 >9 的分割之后的数组十位数之和
  let sumTotal = 0
  for (let m = 0; m < arrJiShu.length; m++) {
    sumJiShu = sumJiShu + parseInt(arrJiShu[m])
  }
  for (let n = 0; n < arrOuShu.length; n++) {
    sumOuShu = sumOuShu + parseInt(arrOuShu[n])
  }
  for (let p = 0; p < jishu_child1.length; p++) {
    sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p])
    sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p])
  }
  //计算总和
  sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2)
  //计算luhn值
  const k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10
  const luhn = 10 - k
  return lastNum == luhn
}
