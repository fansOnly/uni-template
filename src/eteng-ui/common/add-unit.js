/**
 * 数值单位格式化
 * @param {string/number} val
 * @param {string} [unit = rpx | px]
 */
export function addUnit(val, unit = 'rpx') {
  if (!Number(val)) return val;
  return (unit === 'rpx' ? (val * 2) : val) + unit;
}
