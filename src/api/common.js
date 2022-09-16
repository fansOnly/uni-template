import http from '@/shared/http';

export const qryUserInfo = params => http.post('common/qryUserInfo.do', params);
