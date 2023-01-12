import { wxCheckIsSupportFacialRecognition, wxStartFacialRecognitionVerify } from '../api'

const checkIfSupport = async () => {
  let result = false
  try {
    const data = await wxCheckIsSupportFacialRecognition()
    result = data.errCode === 0 || data.errMsg === 'checkIsSupportFacialRecognition:ok'
  } catch (error) {
    result = false
  }

  return result
}

const startFaceVerify = async (params) => {
  let result = null
  try {
    const data = await wxStartFacialRecognitionVerify({
      ...params,
      checkAliveType: 2
    })
    if (data.errCode == 0) {
      result = data.verifyResult
    }
  } catch (error) { }

  return result
}

export const useFaceVerify = async () => {
  return {
    isSupport: checkIfSupport(),
    startFaceVerify
  }
}
