import http from '@/common/lib/http'

export const wxLogin = params => http.post('cust/login/wxLogin.do', params)
