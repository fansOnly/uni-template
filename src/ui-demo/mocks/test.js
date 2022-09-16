import Mock from '@/plugins/mock';

export default {
  STATUS: '1',
  MSG: '交易成功',
  LIST: Mock.mock({
    'list|1-5': [{
      'id|+1': 1,
      'title': Mock.Random.ctitle()
    }]
  })
};
