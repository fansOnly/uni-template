import http from '@/shared/http'

export const demo = params => http.post('demo.do', params)
