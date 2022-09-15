import http from '@/shared/http'

export const wxLogin = params => http.post('cust/login/wxLogin.do', params)
