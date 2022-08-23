import areaData from './area'

// 序列化省市区 函数
const serialize = name => {
  const _res = []
  const _data = areaData[name] || {}
  Object.keys(_data).forEach(v => {
    const _obj = {}
    _obj.value = v
    _obj.text = _data[v]

    _res.push(_obj)
  })

  return _res
}

// 省-列表数据
export const PROVINCE_LIST = serialize('province_list')

// 市-列表数据
export const CITY_LIST = serialize('city_list')

// 区-列表数据
export const COUNTY_LIST = serialize('county_list')

// 检索市函数 通过省编号检索市
export const queryCity = code => {
  code = code && code.substring(0, 2)
  return CITY_LIST.filter(v => {
    return v.value && v.value.substring(0, 2).includes(code)
  })
}

// 检索区函数 通过市编号检索区
export const queryCounty = code => {
  code = code && code.substring(0, 4)
  return COUNTY_LIST.filter(v => {
    return v.value && v.value.substring(0, 4).includes(code)
  })
}

// 通过省名称检索市编号
export const getProvinceCode = name => {
  let code = ''
  for (let i = 0; i < PROVINCE_LIST.length; i++) {
    if (PROVINCE_LIST[i].text === name) {
      code = PROVINCE_LIST[i].value
      break
    }
  }
  return code
}

// 通过省名称检索市编号
export const getCityCode = name => {
  let code = ''
  for (let i = 0; i < CITY_LIST.length; i++) {
    if (CITY_LIST[i].text === name) {
      code = CITY_LIST[i].value
      break
    }
  }
  return code
}

// 通过市名称检索区编号
export const getCountryCode = name => {
  let code = ''
  for (let i = 0; i < COUNTY_LIST.length; i++) {
    if (COUNTY_LIST[i].text === name) {
      code = COUNTY_LIST[i].value
      break
    }
  }
  return code
}
