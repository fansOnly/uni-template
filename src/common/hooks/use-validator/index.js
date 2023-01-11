
export function validateMobile(v) {
  return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(String(v))
}

/**
 * 密码规则
 * ∙不能包含空格
 * 8-16个字符
 * 至少包含字母、数字、符号中的2种
 */
export function validatePass(v) {
  return /^(?![-`=[\];',.~!@#$%^&*()_+|{}:"?]+$)(?![0-9]+$)(?![A-Za-z]+$)[0-9a-zA-Z-`=[\];',.~!@#$%^&*()_+|{}:"?]{8,16}$/.test(String(v))
}

export function validateUrl(v) {
  const reg = new RegExp(
    '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
    'i')
  return reg.test(v)
}

export function validateIdCard(v) {
  return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]/.test(v)
}

/**
 * 微信号规则
 * 字母开头，6-20位字母、数字、下划线和减号
 */
export function validateWechatId(v) {
  return /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/.test(String(v))
}

export function validateEmail(v) {
  return /^\S+?@\S+?\.\S+?$/.test(String(v))
}

/**
 * 地址规则
 * 5-50个字符，不能全数字
 */
export function validateAddress(v) {
  return /^(?!\d+$)[\dA-Za-z\u4e00-\u9fa5]{5,50}$/.test(String(v))
}

/**
 * 姓名规则
 * 2-20个字符
 */
export function validateName(v) {
  return /^[\u4e00-\u9fa5]{2,20}$/.test(String(v))
}

/**
 * 银行卡规则
 */
export function validateLuhn(bankNo) {
  if (!bankNo) return false
  const lastNum = bankNo.substr(bankNo.length - 1, 1)//取出最后一位（与luhn进行比较）
  const first15Num = bankNo.substr(0, bankNo.length - 1)//前15或18位
  const newArr = new Array()
  for (let i = first15Num.length - 1; i > -1; i--) {
    // 前15或18位倒序存进数组
    newArr.push(first15Num.substr(i, 1))
  }
  const arrJiShu = new Array() //奇数位*2的积 <9
  const arrJiShu2 = new Array() //奇数位*2的积 >9
  const arrOuShu = new Array() //偶数位数组
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
  const jishuChild1 = new Array()//奇数位*2 >9 的分割之后的数组个位数
  const jishuChild2 = new Array()//奇数位*2 >9 的分割之后的数组十位数
  for (let h = 0; h < arrJiShu2.length; h++) {
    jishuChild1.push(parseInt(arrJiShu2[h]) % 10)
    jishuChild2.push(parseInt(arrJiShu2[h]) / 10)
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
  for (let p = 0; p < jishuChild1.length; p++) {
    sumJiShuChild1 = sumJiShuChild1 + parseInt(jishuChild1[p])
    sumJiShuChild2 = sumJiShuChild2 + parseInt(jishuChild2[p])
  }
  //计算总和
  sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2)
  //计算luhn值
  const k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10
  const luhn = 10 - k
  return lastNum == luhn
}
