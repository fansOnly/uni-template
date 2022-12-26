const usePage = () => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const _page = currentPage.$vm.$refs.page

  return _page
}

export const useMessage = (options) => {
  const page = usePage()
  if (!page) {
    return uni.showToast({
      title: '缺少跟组件实例或者跟组件实例没有绑定 ref=page 属性',
      icon: 'none'
    })
  }
  const { onConfirm, onCancel, ...cfg } = options
  Object.assign(page.dialog, cfg)
  if (typeof onConfirm === 'function') {
    page.onConfirm = onConfirm
  }
  if (typeof onCancel === 'function') {
    page.onCancel = onCancel
  }
  page.dialog.visible = true
}

// TODO
export const useToast = (_page, options) => { }
