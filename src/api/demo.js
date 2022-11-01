import http from '@/common/lib/http';

export const demo = params => http.post('demo.do', params);
