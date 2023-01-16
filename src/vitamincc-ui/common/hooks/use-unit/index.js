export const useUnit = (val, unit = 'rpx') => {
  if (!Number(val)) return val
  return (unit === 'rpx' ? (val * 2) : val) + unit
}
