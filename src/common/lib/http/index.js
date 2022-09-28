import store from '@/store';
import encrypt from '@/plugins/encrypt/encrypt-gm';
import { isJsonString, formatDate } from '@/shared';

const aresKey = encrypt.getEncryptKey();
const useMock = process.env.USE_MOCK;
const useEncrypt = process.env.USE_ENCRYPT;
let requestUrl = process.env.HTTP_BASE_URL;
const apiContext = process.env.HTTP_CONTEXT;
console.log('[debug]', `${requestUrl}/${apiContext}`);

// H5端新增webServer proxy请求代理配置
// #ifdef H5
requestUrl = process.env.NODE_ENV === 'development' ? 'dev-server' : requestUrl;
// #endif

/**
 * 网关需要的额外 headers
 */
export const extraHeaders = () => {
  let _date = new Date();
  let rdm = parseInt((Math.random() + 1) * 1000);
  let _uuid = 'mkt' + _date.getDay() + _date.getHours() + _date.getMinutes() + _date.getSeconds() + _date.getMilliseconds() + rdm;

  return {
    'X-GW-TIMESTAMP': formatDate(),
    'X-GW-NONCE': _uuid
  };
};

// 超时时间
const timeout = 30000;
// 400202 - API匹配失败，请检查API请求地址是否正确
let errorCount = 0;

const httpRequest = {
  /**
   * @param {*} action 请求地址
   * @param {*} params 请求参数
   * @param {*} customHeaders 自定义请求头
   */
  post: async function (action, params = {}, customHeaders = {}) {
    // 过滤 undefined null 参数
    const parameter = {};
    for (const [key, value] of Object.entries(params)) {
      (value !== undefined && value !== null) && (parameter[key] = value);
    }

    /**
    * 登录 sessionId 携带
    */
    let tokenHeaders = {};
    const sessLoginKey = store.state.user.sessLoginKey;
    if (sessLoginKey) {
      tokenHeaders.cookie = 'SESSION=' + sessLoginKey;
    } else {
      delete tokenHeaders.cookie;
    }

    // 请求参数
    const transformData = () => {
      let result;
      // #ifdef H5
      result = (useMock || !useEncrypt) ? parameter : encrypt.encrypt(parameter, aresKey);
      // #endif

      // #ifdef MP-WEIXIN
      result = (useMock || !useEncrypt) ? parameter : encrypt.encrypt(parameter, aresKey);
      // #endif
      return result;
    };

    // 记录接口耗时
    const start = +new Date();
    return new Promise((resolve, reject) => {
      uni.request({
        method: 'POST',
        url: `${requestUrl}/${apiContext}/${action}`,
        header: {
          ...extraHeaders(),
          ...tokenHeaders,
          ...customHeaders
        },
        data: transformData(),
        withCredentials: true,
        timeout,
        success: (res) => {
          let { data, header } = res;

          let result;

          // #ifdef H5
          result = (useMock || !useEncrypt) ? data : encrypt.decrypt(data, aresKey);
          // #endif

          // #ifdef MP-WEIXIN
          result = (useMock || !useEncrypt) ? data : encrypt.decrypt(data, aresKey);
          // #endif

          if (typeof result == 'string' && isJsonString(result)) result = JSON.parse(result);

          console.log('├─', new Date());
          console.log('├─[url]', action);
          console.log('├─[params]', parameter);
          console.log('├─[response]', result);
          console.log('├─[time]', (+new Date() - start) + 'ms');
          console.log('└─');

          if (result.STATUS == '1') {
            resolve(result);
          } else if (result.STATUS == '2') {
            // TODO 统一拦截有用的错误提示
            resolve(result);
          } else { // 枚举并拦截异常状态
            switch (result.STATUS) {
            case '005':
            case '009':
              // 会话已过期，请重新登录
              if (errorCount++ == 0) {
                uni.showModal({
                  title: '温馨提示',
                  content: result.MSG,
                  showCancel: false,
                  success: function () {
                    store.dispatch('user/clearSessionToken');
                    errorCount--;
                    // TODO 处理未登录逻辑
                  }
                });
              }
              resolve(result);
              break;
            // 默认弹窗
            default:
              resolve(result);
              uni.showModal({
                title: '温馨提示',
                content: result.MSG || '获取数据失败，请稍后重试',
                showCancel: false
              });
              break;
            }
          }
        },
        fail: (error) => {
          if (errorCount++ == 0) {
            resolve({ STATUS: 'timeout' });
            console.log('├─', new Date());
            console.log('├─[url]', action);
            console.log('├─[params]', parameter);
            console.log('├─[error]', error);
            console.log('├─[time]', (+new Date() - start) + 'ms');
            console.log('└─');
            uni.showModal({
              title: '温馨提示',
              content: '请求失败，请稍后重试',
              showCancel: false,
              success: function () {
                errorCount = 0;
              }
            });
          }
        },
        complete: () => {}
      });
    });
  }
};

export default httpRequest;
