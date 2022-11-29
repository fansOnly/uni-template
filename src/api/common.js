import http from '@/common/lib/http'

export const qryUserInfo = params => http.post('common/qryUserInfo.do', params)
