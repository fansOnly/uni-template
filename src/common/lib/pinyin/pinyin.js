/**
 * 拼音索引数据生成
 */
import PinyinMatch from 'pinyin-match';

/**
 * 默认的索引列表 A-Z
 * @param {*} withSpecial #
 */
export function genIndexList(withSpecial = true) {
  const arr = [];
  const charCodeOfA = 'A'.charCodeAt(0);
  for (let i = 0; i < 26; i++) {
    arr.push(String.fromCharCode(charCodeOfA + i));
  }
  return withSpecial ? arr.concat('#') : arr;
}

export const genPinyinSortData = (data = [], prop) => {
  const letters = genIndexList();
  const res = [];
  for (let i = 0; i < letters.length - 1; i++) {
    const values = [];
    const key = letters[i];
    data.map((item, j) => {
      if (!item) return;
      const match = PinyinMatch.match(item[prop].charAt(0), key);
      if (match) {
        values.push(item);
        data.splice(j, 1, '');
      }
    });
    values.length && res.push({key, values });
  }
  const specialValues = data.filter(Boolean);
  specialValues.length && res.push({key: '#', values: specialValues});
  return res;
};
