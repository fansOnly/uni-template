/**
 * 延时执行
 * @param {number} [delay = 500] 阻塞时间
 */
export const sleep = (delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}

/**
 * 拼接 url 地址
 * @param {string} 路径
 * @param {string} 参数对象
 */
export function genUrlFromObj(path, obj) {
  const url = `/${ path}`
  let queryString = ''
  for (const key in obj) {
    queryString += `${queryString === '' ? '' : '&' }${key}=${obj[key]}`
  }
  return url + (Object.keys(obj).length ? `?${ queryString}` : '')
}

/**
 * 从 url 提取参数
 * @param {string} url
 */
export const getParamFromUrl = url => {
  if (!url) return {}
  const queryString = url.split('?')[1]
  if (!queryString) return {}
  const reg = /([^?=&]+)(=*[^&=]*)/g
  const matches = queryString.match(reg)
  return matches.reduce((acc, cur) => {
    const [key, val = ''] = cur.split('=')
    acc[key] = val
    return acc
  }, {})
}

/**
 * 日期格式化
 * @param {string | number} value 时间
 * @param {string} [formatter = 'YYYY-MM-DD HH:mm:ss'] 时间格式
 */
export const formatDate = (value, formatter = 'YYYY-MM-DD HH:mm:ss') => {
  const dateReg = /^(?<year>\d{4})?([/-](?<month>\d{1,2}))?([/-](?<day>\d{1,2}))?\s?(?<hour>\d{1,2})?(:(?<minute>\d{1,2}))?(:(?<second>\d{1,2}))?$/
  let date = new Date()
  let groups = {}
  if (!value) {
    date = new Date()
  } else if (typeof value === 'number') {
    date = new Date(value)
  } else if (typeof value === 'string' && dateReg.test(value)) {
    const matched = value.match(dateReg)
    groups = matched.groups
  } else {
    console.warn('[info] Invalid Date', value)
    return value
  }

  const Y = groups.year || `${date.getFullYear() }`
  const M = groups.month || date.getMonth() + 1
  const D = groups.day || date.getDate()
  const H = groups.hour || date.getHours()
  const m = groups.minute || date.getMinutes()
  const s = groups.second || date.getSeconds()

  return formatter.replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substring(2))
    .replace(/MM/g, String(M).padStart(2, '0'))
    .replace(/DD/g, String(D).padStart(2, '0'))
    .replace(/HH|hh/g, String(H).padStart(2, '0'))
    .replace(/mm/g, String(m).padStart(2, '0'))
    .replace(/ss/g, String(s).padStart(2, '0'))
}

/**
 * 获取元素节点信息
 * @param {string} 实例 this
 * @param {string} 选择器
 */
export function getRect(context, selector) {
  return new Promise(
    (resolve) => {
      wx.createSelectorQuery()
        .in(context)
        .select(selector)
        .boundingClientRect()
        .exec((rect = []) => resolve(rect[0]))
    }
  )
}

/**
 * 缓动动画
 */
export function requestAnimationFrame() {
  return new Promise((resolve) => {
    const systemInfo = uni.getSystemInfoSync()
    if (systemInfo.platform === 'devtools') {
      return setTimeout(() => {
        resolve()
      }, 1000 / 30)
    }
    return wx
      .createSelectorQuery()
      .selectViewport()
      .boundingClientRect()
      .exec(() => {
        resolve()
      })
  })
}


let systemInfo = null

export const getSystemInfo = () => {
  return systemInfo || (systemInfo = wx.getSystemInfoSync())
}
