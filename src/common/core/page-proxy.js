
// const proxyLoad = (onLoad) => {
//   return function customLoad(options) {
//     if (onLoad) {
//       console.log('proxy page onload ...')
//       onLoad.call(this, ...options)
//     }
//   }
// }

// export const proxyPage = (Page) => {
//   return function customPage(options) {
//     options.onLoad = proxyLoad(options.onLoad)
//     options.ss = 'ss'
//     options.onShow = null
//     Page(options)
//   }
// }
