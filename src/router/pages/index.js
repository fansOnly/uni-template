module.exports = [
  {
    'path': 'pages/home/index',
    'name': 'home',
    'meta': {
      'auth': false,
      'title': 'UI 组件演示库',
      'navigationStyle': 'custom'
    }
  },
  {
    'path': 'pages/other/index',
    'name': 'other',
    'meta': {
      'auth': false,
      'title': 'UI 组件演示库'
    },
    'usingComponents': {
      'e-test': '/wxcomponents/e-test/index'
    }
  }
]
