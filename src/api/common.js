import http from '@/common/http'

export const qryUserInfo = params => http.post('common/qryUserInfo.do', params)
