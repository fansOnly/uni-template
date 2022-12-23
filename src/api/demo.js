import http from '@/common/http'

export const demo = params => http.post('demo.do', params)
