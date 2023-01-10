import { wxCheckSession, wxLogin } from '../api'

export const useSession = async (refresh = true) => {
  let code = ''
  let shouldReLogin = false
  if (!refresh) {
    const data = await wxCheckSession()
    shouldReLogin = data.errMsg !== 'checkSession:ok'
  }

  if (refresh || shouldReLogin) {
    const data = await wxLogin()
    code = data.code || ''
  }

  return {
    code
  }
}
