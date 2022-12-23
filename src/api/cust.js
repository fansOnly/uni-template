import http from '@/common/http'

export const wxLogin = params => http.post('cust/login/wxLogin.do', params)
