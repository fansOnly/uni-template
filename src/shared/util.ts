/**
 * 延时执行
 * @param {number} [delay = 500] 阻塞时间
 */
export const sleep = (delay: number = 500) => {
  return new Promise<void>((resolve) => {
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
export function genUrlFromObj(path: string, obj: Record<any, any>): string {
  const url: string = '/' + path
  let queryString: string = ''
  for (const key in obj) {
    queryString += (queryString === '' ? '' : '&') + `${key}=${obj[key]}`
  }
  return url + (Object.keys(obj).length ? '?' + queryString : '')
}

/**
 * 从 url 提取参数
 * @param {string} url
 */
export const getParamFromUrl = (url: string): object => {
  if (!url) return {}
  const queryString: string = url.split('?')[1]
  if (!queryString) return {}
  const reg: RegExp = /([^?=&]+)(=*[^&=]*)/g
  const matches: RegExpMatchArray = queryString.match(reg) || []
  return matches.reduce((acc: Record<any, any>, cur: string) => {
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
export const formatDate = (
  value: string | number,
  formatter: string = 'YYYY-MM-DD HH:mm:ss'
): string => {
  let date = new Date()
  if (!value) {
    date = new Date()
  } else if (typeof value === 'number') {
    date = new Date(value)
  } else {
    console.warn('[info] Invalid Date', value)
    return value
  }

  const Y = date.getFullYear() + ''
  const M = date.getMonth() + 1
  const D = date.getDate()
  const H = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()

  return formatter
    .replace(/YYYY|yyyy/g, Y)
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
export const getRect = (
  context:
    | WechatMiniprogram.Component.TrivialInstance
    | WechatMiniprogram.Page.TrivialInstance,
  selector: string
) => {
  return new Promise((resolve) => {
    wx.createSelectorQuery()
      .in(context)
      .select(selector)
      .boundingClientRect()
      .exec((rect = []) => resolve(rect[0]))
  })
}

/**
 * 缓动动画
 */
export const requestAnimationFrame = () => {
  return new Promise<void>((resolve) => {
    const systemInfo = uni.getSystemInfoSync()
    if (systemInfo.platform === 'devtools') {
      return setTimeout(function () {
        resolve()
      }, 1000 / 30)
    }
    return wx
      .createSelectorQuery()
      .selectViewport()
      .boundingClientRect()
      .exec(function () {
        resolve()
      })
  })
}

let systemInfo: WechatMiniprogram.SystemInfo | null = null

export const getSystemInfo = () => {
  return systemInfo || (systemInfo = wx.getSystemInfoSync())
}
