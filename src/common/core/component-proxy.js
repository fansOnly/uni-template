
const proxyLoad = (onLoad) => {
  return function customLoad(options) {
    console.log('proxy onload options: ', options)
    const { flag } = options
    if (flag === 'false') {
      console.log('skip onload')
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/other/index'
        })
      }, 0)
    } else if (onLoad) {
      console.log('run proxy onload ...')
      onLoad.apply(this, {...options, extra: 'extra..'})
    }
  }
}

export const proxyComponent = (Component) => {
  return function customComponent(options) {
    options.methods.onLoad = proxyLoad(options.methods.onLoad)
    options.methods.onShow = null
    Component(options)
  }
}
