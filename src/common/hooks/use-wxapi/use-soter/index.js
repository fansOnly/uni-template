import {
  wxCheckIsSoterEnrolledInDevice,
  wxCheckIsSupportSoterAuthentication,
  wxStartSoterAuthentication
} from '../api'

const isSoterEnrolled = async (authMode) => {
  const { isEnrolled = false } = await wxCheckIsSoterEnrolledInDevice({ checkAuthMode: authMode })

  return isEnrolled
}

const getSupportedSoter = async () => {
  const { supportMode = [] } = await wxCheckIsSupportSoterAuthentication()

  return supportMode
}

const startSoter = async (params) => {
  const data = await wxStartSoterAuthentication(params)
  const app = getApp()
  app.globalData.hideScene = 'soter-auth'
  const success = data.errCode == 90008 /** ios */ || data.errCode == 90010 /** android */
  const locked = data.errCode == 90011 /** ios */ || false /** no api for android */

  return {
    success,
    locked
  }
}

export const useSoter = async () => {
  return {
    getSupportedSoter,
    isSoterEnrolled,
    startSoter
  }
}
