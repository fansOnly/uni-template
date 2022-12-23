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

const startFaceVerify = async (userIdKey) => {
  let result = null
  try {
    const data = await wxStartFacialRecognitionVerify({
      userIdKey
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
