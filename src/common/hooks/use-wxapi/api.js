import { useVersion } from '../use-version'
const { gte } = useVersion()

/**
 * 统一转换部分微信原生 API 为 Promise 风格
 * @param {*} name API 名称
 * @param {*} params 参数
 * @param {*} showLoading 是否显示 loading 效果，默认不显示
 * @param {*} version 最低基础库版本
 */
function apiToPromise(name, params, showLoading = false, version = '2.20.1') {
  /* #ifdef MP-WEIXIN */
  if (uni.canIUse(name) || wx[name]) {
    const promiseLike = uni[name]
    return new Promise((resolve, reject) => {
      showLoading && uni.showLoading({
        title: '加载中',
        mask: true
      })
      promiseLike({
        ...params,
        success(res) {
          resolve(res)
        },
        fail(err) {
          resolve(err)
        },
        complete(res) {
          console.log('🚀 ™ [debug]', res)
          showLoading && uni.hideLoading()
        }
      })
    })
  } else {
    console.warn(`🚀 ™ [system] ${name}: 您的微信基础库版本过低，请升级至${version}及以上版本`)
    return { reason: 'low version' }
  }
  /* #endif */
  /* #ifdef H5 */
  console.log('[debug] 待兼容')
  /* #endif */
}

/**
 * 检查登录态是否过期
 * @property {version}
 *  @value Windows Mac
 *
 * @returns {boolean}
 */
export const wxCheckSession = async () => {
  return apiToPromise('checkSession')
}

/**
 * 获取登录凭证
 * @property {version}
 *  @value Windows Mac Plugin(2.3.1)
 *
 * @param {number} timeout 超时时间，单位ms
 *
 * @returns {string} code
 */
export const wxLogin = params => {
  return apiToPromise('login', params)
}

/**
 * 获取用户信息
 * 小程序用户头像昵称获取规则调整公告
 * https://developers.weixin.qq.com/community/develop/doc/00022c683e8a80b29bed2142b56c01
 * @property {version}
 *  @value 基础库 2.10.4 开始支持
 *  @value Windows Mac Plugin(2.3.1)
 *
 * @returns {UserInfo} userInfo 用户信息对象
 * @returns {string} rawData 不包括敏感信息的原始数据字符串，用于计算签名
 * @returns {string} signature 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息
 * @returns {string} encryptedData 包括敏感数据在内的完整用户信息的加密数据
 * @returns {string} iv 加密算法的初始向量
 * @returns {string} cloudID 敏感数据对应的云 ID，开通云开发的小程序才会返回，可通过云调用直接获取开放数据
 */
export const wxGetUserProfile = () => {
  return apiToPromise('getUserProfile', {
    lang: 'zh_CN',
    desc: '为了给您提供更好的个性化服务',
  })
}

/**
 * 调起客户端小程序设置界面
 * @property {version}
 *  @value 基础库 1.0.0 开始支持
 *  @value Mac Plugin(2.10.3)
 */
export const wxOpenSetting = () => {
  return apiToPromise('openSetting')
}

/**
 * 调起客户端小程序设置界面
 * 2.3.0 版本开始，用户发生点击行为后，才可以跳转打开设置页，管理授权信息
 * @property {version}
 *  @value 基础库 1.0.0 开始支持
 *  @value Mac Plugin(2.10.3)
 *
 * @param {boolean} withSubscriptions 是否同时获取用户订阅消息的订阅状态，默认不获取。注意：withSubscriptions 只返回用户勾选过订阅面板中的“总是保持以上选择，不再询问”的订阅消息。
 *
 * @returns {AuthSetting} authSetting 用户授权结果
 * @returns {SubscriptionsSetting} subscriptionsSetting 用户授权结果
 */
export const wxGetSetting = async params => {
  const data = await apiToPromise('getSetting', params)
  const { authSetting } = data
  const agree = []; const deny = []
  if (Object.keys(authSetting).length) {
    for (const key in authSetting) {
      if (authSetting[key]) {
        agree.push(key.split('.')[1])
      } else {
        deny.push(key.split('.')[1])
      }
    }
  }
  console.log('[debug] 用户已同意授权信息', agree)
  console.log('[debug] 用户已拒绝授权信息', deny)
  return { userAgreeAuth: agree, userDenyAuth: deny }
}

/**
 * 获取当前的地理位置、速度
 * 当用户离开小程序后，此接口无法调用
 * @property {version}
 *  @value 基础库 2.17.0 开始支持
 *  @value Windows  Mac Plugin(1.9.6)
 *
 * @param {string} type = wgs84  wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
 * @param {boolean} altitude = false 传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度(1.6.0)
 * @param {boolean} isHighAccuracy = false 开启高精度定位(2.9.0)
 * @param {number} highAccuracyExpireTime 高精度定位超时时间(ms)，指定时间内返回最高精度，该值3000ms以上高精度定位才有效果(2.9.0)
 *
 * @returns {number} latitude 纬度，范围为 -90~90，负数表示南纬
 * @returns {number} longitude 经度，范围为 -180~180，负数表示西经
 * @returns {number} speed 速度，单位 m/s
 * @returns {number} accuracy 位置的精确度，反应与真实位置之间的接近程度，可以理解成10即与真实位置相差10m，越小越精确
 * @returns {number} altitude 高度，单位 m
 * @returns {number} verticalAccuracy 垂直精度，单位 m（Android 无法获取，返回 0）
 * @returns {number} horizontalAccuracy 水平精度，单位 m
 */
export const wxGetLocation = params => {
  return apiToPromise('getLocation', {
    type: 'wgs84',
    altitude: false,
    isHighAccuracy: false,
    highAccuracyExpireTime: 3000,
    ...params
  }, false, '2.0.0')
}

/**
 * 获取当前的地理位置、速度
 * 当用户离开小程序后，此接口无法调用
 * @property {version}
 *  @value  Mac Plugin(1.9.6)
 *
 * @param {number} latitude 纬度，范围为 -90~90，负数表示南纬 
 * @param {number} longitude 经度，范围为 -180~180，负数表示西经
 * @param {number} [scale = 18] 缩放比例，范围5~18
 * @param {string} name 位置名
 * @param {string} address 地址的详细说明
 */
export const wxOpenLocation = params => {
  return apiToPromise('openLocation', {
    scale: 18,
    ...params
  }, false, '2.0.0')
}

/**
 * 获取局域网IP地址
 * @property {version}
 *  @value 基础库 2.20.1 开始支持
 *  @value Plugin(2.21.3)
 *
 * @returns {string} localip 本机局域网 IP 地址
 * @returns {string} netmask 本机局域网子网掩码(2.24.0 )
 */
export const wxGetLocalIPAddress = () => {
  return apiToPromise('getLocalIPAddress', {}, false, '2.20.1')
}

/**
 * 拍摄或从手机相册中选择图片或视频
 * @property {version}
 *  @value 基础库 2.10.0 开始支持
 *  @value Windows Plugin(2.11.1)
 *
 * @param {number} count = 9 最多可以选择的文件个数
 * @param {Array.<string>} mediaType = ['image', 'video'] 文件类型
 * @param {Array.<string>} sourceType = ['album', 'camera'] 图片和视频选择的来源
 *                       album =从相册选择
 *                       camera =使用相机拍摄
 * @param {number} maxDuration = 10 拍摄视频最长拍摄时间，单位秒。时间范围为 3s 至 60s 之间。不限制相册。
 * @param {Array.<string>} sizeType = ['original', 'compressed'] 仅对 mediaType 为 image 时有效，是否压缩所选文件
 * @param {string} camera = back  / front 仅在 sourceType 为 camera 时生效，使用前置或后置摄像头
 */
export const wxChooseMedia = params => {
  return apiToPromise('chooseMedia', params, false, '2.10.0')
}

/**
 * 压缩图片接口，可选压缩质量
 * @property {version}
 *  @value 基础库 2.4.0 开始支持
 *  @value Windows Plugin(2.12.0)
 *
 * @param {string} src 图片路径，图片的路径，支持本地路径、代码包路径
 * @param {number} quality = 80 压缩质量，范围0～100，数值越小，质量越低，压缩率越高（仅对 jpg 有效）。
 *
 * @returns {string} tempFilePath 压缩后图片的临时文件路径 (本地路径)
 */
export const wxCompressImage = params => {
  return apiToPromise('compressImage', params, false, '2.4.0')
}

/**
 * 预览图片和视频
 * @property {version}
 *  @value 基础库 2.12.0 开始支持
 *  @value Windows Mac Plugin(2.15.0)
 *
 * @param {Array.<Object>} sources 需要预览的资源列表
 * @param {number} current 当前显示的资源序号
 * @param {boolean} showmenu = true 是否显示长按菜单
 * @param {string} referrerPolicy = no-referrer origin: 发送完整的 referrer ; no-referrer: 不发送
 */
export const wxPreviewMedia = params => {
  return apiToPromise('previewMedia', params, false, '2.12.0')
}

/**
 * 预览图片
 * @property {version}
 *  @value Windows Mac Plugin(1.9.6)
 *
 * @param {Array.<string>} urls 需要预览的资源列表
 * @param {number} current 当前显示的资源序号
 * @param {boolean} showmenu = true 是否显示长按菜单
 * @param {string} referrerPolicy = no-referrer origin: 发送完整的 referrer ; no-referrer: 不发送
 */
export const wxPreviewImage = params => {
  return apiToPromise('previewImage', params)
}

/**
 * 预览图片和视频
 * @property {version}
 *  @value Windows Mac Plugin(1.9.6)
 *
 * @param {string} src 图片的路径，支持网络路径、本地路径、代码包路径
 *
 * @returns {number} width 图片原始宽度，单位px。不考虑旋转。
 * @returns {number} height 图片原始高度，单位px。不考虑旋转。
 * @returns {string} path 图片的本地路径
 * @returns {string} orientation 拍照时设备方向(1.9.90)
 *                   up 默认方向（手机横持拍照），对应 Exif 中的 1。或无 orientation 信息
 *                   up-mirrored 同 up，但镜像翻转，对应 Exif 中的 2
 *                   down 旋转180度，对应 Exif 中的 3
 *                   down-mirrored 同 down，但镜像翻转，对应 Exif 中的 4
 *                   left-mirrored 同 left，但镜像翻转，对应 Exif 中的 5
 *                   right 顺时针旋转90度，对应 Exif 中的 6
 *                   right-mirrored 同 right，但镜像翻转，对应 Exif 中的 7
 *                   left 逆时针旋转90度，对应 Exif 中的 8
 * @returns {string} type 图片格式(1.9.90)
 */
export const wxGetImageInfo = params => {
  return apiToPromise('getImageInfo', params)
}

/**
 * 保存图片到系统相册
 * @property {version}
 *  @value 基础库 1.2.0 开始支持
 *  @scope 需要 scope.writePhotosAlbum
 *  @value Windows Mac Plugin(1.9.6)
 *
 * @param {string} filePath 图片文件路径，可以是临时文件路径或永久文件路径 (本地路径) ，不支持网络路径
 */
export const wxSaveImageToPhotosAlbum = params => {
  return apiToPromise('saveImageToPhotosAlbum', params)
}

/**
 * 获取本机支持的 SOTER 生物认证方式
 * @property {version}
 *  @value 基础库 1.5.0 开始支持
 *
 * @returns {Array.<string>} supportMode 该设备支持的可被 SOTER 识别的生物识别方式
 *                           fingerPrint 指纹识别
 *                           facial 人脸识别
 *                           speech 声纹识别（暂未支持）
 */
export const wxCheckIsSupportSoterAuthentication = () => {
  return apiToPromise('checkIsSupportSoterAuthentication', {}, false, '1.5.0')
}

/**
 * 获取设备内是否录入如指纹等生物信息的接口
 * @property {version}
 *  @value 基础库 1.6.0 开始支持
 *
 * @param {string} checkAuthMode 认证方式
 *                 fingerPrint 指纹识别
 *                 facial 人脸识别
 *                 speech 声纹识别（暂未支持）
 */
export const wxCheckIsSoterEnrolledInDevice = params => {
  return apiToPromise('checkIsSoterEnrolledInDevice', params, false, '1.6.0')
}

/**
 * 获取设备内是否录入如指纹等生物信息的接口
 * @property {version}
 *  @value 基础库 1.5.0 开始支持
 *
 * @param {Array.<string>} requestAuthModes 请求使用的可接受的生物认证方式
 *                         fingerPrint 指纹识别
 *                         facial 人脸识别
 *                         speech 声纹识别（暂未支持）
 * @param {string} challenge 挑战因子.挑战因子为调用者为此次生物鉴权准备的用于签名的字符串关键识别信息，将作为 `resultJSON` 的一部分，供调用者识别本次请求
 * @param {string} authContent = '' 验证描述，即识别过程中显示在界面上的对话框提示内容
 *
 * @returns {string} authMode 生物认证方式
 * @returns {string} resultJSON 在设备安全区域（TEE）内获得的本机安全信息（如TEE名称版本号等以及防重放参数）以及本次认证信息（仅Android支持，本次认证的指纹ID）
 * @returns {string} resultJSONSignature 用SOTER安全密钥对 resultJSON 的签名(SHA256 with RSA/PSS, saltlen=20)
 */
export const wxStartSoterAuthentication = params => {
  return apiToPromise('startSoterAuthentication', params, false, '1.5.0')
}

/**
 * 检查设备是否支持人脸检测
 * @property {version}
 *  @value 基础库 2.20.1 开始支持
 *
 * @param {string} name 姓名
 * @param {string} idCardNumber 身份证号码
 * @param {string} user_id_key  - 后台通过微信提供的 api 上传用户身份证姓名和身份证, 返回 user_id_key 作为凭证传给前端
 * @param {number} checkAliveType 人脸核验的交互方式，默认读数字（见表1） 2	先检查是否可以屏幕闪烁，不可以则自动为读数字
 */
export const wxCheckIsSupportFacialRecognition = () => {
  return apiToPromise('checkIsSupportFacialRecognition', {}, false, '2.20.1')
}

/**
 * 请求进行基于生物识别的人脸核身
 * @property {version}
 *  @value 基础库 2.20.1 开始支持
 *
 * @param {string} name 姓名
 * @param {string} idCardNumber 身份证号码
 * @param {string} user_id_key  - 后台通过微信提供的 api 上传用户身份证姓名和身份证, 返回 user_id_key 作为凭证传给前端
 * @param {number} checkAliveType 人脸核验的交互方式，默认读数字（见表1） 2	先检查是否可以屏幕闪烁，不可以则自动为读数字
 */
export const wxStartFacialRecognitionVerify = params => {
  if (wx.startFacialRecognitionVerify) {
    return apiToPromise('startFacialRecognitionVerify', params, false, '2.20.1')
  } else if (wx.startFacialRecognitionVerifyAndUploadVideo) {
    return apiToPromise('startFacialRecognitionVerifyAndUploadVideo', params, false, '2.20.1')
  }
}
export const wxStartFacialRecognitionVerifyAndUploadVideo = params => {
  return apiToPromise('startFacialRecognitionVerifyAndUploadVideo', params, false, '2.20.1')
}

/**
 * 下载文件资源到本地
 * 单次下载允许的最大文件为 200MB
 * @property {version}
 *  @value 基础库 2.20.1 开始支持
 *  @value Windows Mac Plugin(1.9.6)
 *
 * @param {string} url 下载资源的 url
 * @param {Object} header HTTP 请求的 Header，Header 中不能设置 Referer
 * @param {number} timeout 超时时间，单位为毫秒
 * @param {string} filePath 指定文件下载后存储的路径 (本地路径)
 *
 * @returns {string} localip 本机局域网 IP 地址
 * @returns {string} netmask 本机局域网子网掩码(2.24.0 )
 */
export const wxDownloadFile = params => {
  const { fileType, filename } = params
  const filePath = fileType ? `${wx.env.USER_DATA_PATH}/${filename}.${fileType}` : ''
  return apiToPromise('downloadFile', { ...params, filePath }, true)
}

/**
 * 微信打开文档，支持 pdf docs
 * @property {version}
 *  @value 基础库 all
 *  @value Windows Mac Plugin(2.15.0)
 *
 * @param {*} url 文档地址
 * @param {*} filename 文件名
 * @param {*} fileType 文件类型
 */
export const wxOpenFile = async (url, filename, fileType = 'pdf') => {
  const { filePath } = await wxDownloadFile({ url, filename, fileType })
  filePath && wx.openDocument({
    filePath,
    success(res) {
      console.log('[info] 打开文档成功 >>>', res)
    }
  })
}

/**
 * 批量添加卡券
 * @property {version}
 *  @value 基础库 1.1.0 开始支持
 */
export const wxAddCard = async params => {
  return apiToPromise('addCard', params)
}

/**
 * 打开小程序
 * @property {version}
 *  @value 基础库 1.3.0 开始支持
 *  @value Windows Mac Plugin(2.118.1)
 */
export const wxNavigateToMiniProgram = params => {
  return apiToPromise('navigateToMiniProgram', params)
}

/**
 * 打开半屏小程序
 * @property {version}
 *  @value 基础库 2.20.1 开始支持
 */
export const wxOpenEmbeddedMiniProgram = async params => {
  if (gte('2.20.1')) {
    return apiToPromise('openEmbeddedMiniProgram', params)
  } else {
    return wxNavigateToMiniProgram(params)
  }
}

/**
 * 获取群分享信息
 * @property {version}
 *  @value 基础库 1.1.0 开始支持
 *  @value Windows Mac Plugin(2.1.0)
 */
export const wxGetShareInfo = async params => {
  return apiToPromise('getShareInfo', params)
}

/**
 * 获取上传文件
 * @property {version}
 *  @value Windows Mac Plugin(1.9.6)
 */
// export const wxUploadFile = async params => {
//   return apiToPromise('uploadFile', {
//     url: '',
//     header: { "Content-Type": "multipart/form-data", "x-gw-app-id": "1001" },
//     ...params
//   })
// }
