export const useSelectorRect = (context, selector) => {
  return new Promise(
    (resolve) => {
      wx.createSelectorQuery()
        .in(context)
        .select(selector)
        .boundingClientRect()
        .exec((rect = []) => resolve(rect[0]))
    }
  )
}
