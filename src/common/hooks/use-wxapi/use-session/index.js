import { wxCheckSession, wxLogin } from '../api'

export const useSession = async (refresh = false) => {
  let code = ''
  let shouldReLogin = refresh
  if (!shouldReLogin) {
    const data = await wxCheckSession()
    shouldReLogin = data.errMsg !== 'checkSession:ok'
  }

  if (shouldReLogin) {
    const data = await wxLogin()
    code = data.code || ''
  }

  return {
    code
  }
}
