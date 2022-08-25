/**
 * merge same style value by order
 */
export default function mergeStyleByOrder(source, target) {
  if (!source || !target) return source ?? target ?? ''
  const styleReg = /([\w-]+):\s*([^;]+)/ig
  const sourceStyleObj = {}
  const targetStyleObj = {}
  source.replace(styleReg, function (_, key, val) {
    sourceStyleObj[key] = val
  })
  target.replace(styleReg, function (_, key, val) {
    targetStyleObj[key] = val
  })
  const styleObj = Object.assign(sourceStyleObj, targetStyleObj)
  let style = ''
  for (const [key, val] of Object.entries(styleObj)) {
    style += `${style ? ' ' : ''}${key}: ${val.trim()};`
  }
  return style
}
