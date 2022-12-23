import { wxGetLocation, wxGetSetting } from '../api'

export const useLocation = async (params) => {
  let longitude, latitude
  const { userAgreeAuth, userDenyAuth } = await wxGetSetting()

  // if (!userAgreeAuth.includes('userLocation') && !userDenyAuth.includes('userLocation')) {
  //   // 第一次授权
  //   const res = await wxGetLocation()
  //   longitude = res.longitude
  //   latitude = res.latitude
  // } else 
  if (userDenyAuth.includes('userLocation')) {
    // 用户拒绝了授权
    // TODO 弹窗引导用户打开授权
  } else {
    const res = await wxGetLocation(params)
    longitude = +res.longitude
    latitude = +res.latitude
  }


  return {
    longitude,
    latitude,
  }
}
