/**
 * 拼音索引数据生成
 */
import PinyinMatch from 'pinyin-match'

/**
 * 默认的索引列表 A-Z
 * @param {*} withSpecial #
 */
const genIndexList = (withSpecial = true) => {
  const arr = []
  const charCodeOfA = 'A'.charCodeAt(0)
  for (let i = 0; i < 26; i++) {
    arr.push(String.fromCharCode(charCodeOfA + i))
  }
  return withSpecial ? arr.concat('#') : arr
}

export const genPinyinSortData = (source = [], prop, indexList = genIndexList()) => {
  const res = []
  for (let i = 0; i < indexList.length - 1; i++) {
    const values = []
    const anchor = indexList[i]
    source.map((item, j) => {
      if (!item) return
      const match = PinyinMatch.match(item[prop].charAt(0), anchor)
      if (match) {
        values.push(item)
        source.splice(j, 1, '')
      }
    })
    values.length && res.push({ anchor, values })
  }
  const specialValues = source.filter(Boolean)
  specialValues.length && res.push({ anchor: '#', values: specialValues })
  return res
}

export const usePinyin = () => {
  return {
    genIndexList,
    genPinyinSortData
  }
}
