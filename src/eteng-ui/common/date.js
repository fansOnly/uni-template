/**
 * 日期格式化
 * @param {string | number} value 时间 / 时间戳
 * @param {string} [formatter = 'YYYY-MM-DD HH:mm:ss'] 时间格式
 */
export const formatDate = (value, formatter = 'YYYY-MM-DD HH:mm:ss') => {
  const dateReg = /^(?<year>\d{4})?([/-](?<month>\d{1,2}))?([/-](?<day>\d{1,2}))?\s?(?<hour>\d{1,2})?(:(?<minute>\d{1,2}))?(:(?<second>\d{1,2}))?$/;
  let date = new Date();
  let groups = {};
  if (!value) {
    date = new Date();
  } else if (typeof value === 'number') {
    date = new Date(value);
  } else if (typeof value === 'string' && dateReg.test(value)) {
    const matched = value.match(dateReg);
    groups = matched.groups;
  } else if (Object.prototype.toString.call(value) === '[object Date]') {
    date = value;
  } else {
    console.warn('[info] Invalid Date', value);
    return value;
  }

  const Y = groups.year || date.getFullYear() + '';
  const M = groups.month || date.getMonth() + 1;
  const D = groups.day || date.getDate();
  const H = groups.hour || date.getHours();
  const m = groups.minute || date.getMinutes();
  const s = groups.second || date.getSeconds();

  return formatter.replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substring(2))
    .replace(/MM/g, String(M).padStart(2, '0'))
    .replace(/DD/g, String(D).padStart(2, '0'))
    .replace(/HH|hh/g, String(H).padStart(2, '0'))
    .replace(/mm/g, String(m).padStart(2, '0'))
    .replace(/ss/g, String(s).padStart(2, '0'));
};
