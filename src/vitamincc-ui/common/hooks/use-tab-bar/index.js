import pageCfg from '@/pages.json'
import { useGlobalData } from '@/common/hooks/use-global-data'

const { setGlobalData } = useGlobalData()

export const useTabBar = () => {
  const tabBarObj = pageCfg?.tabBar || {}
  const { list = [], custom = false, ...rest } = tabBarObj
  setGlobalData('isCustomTabBar', custom === true)
  const isCustomTabBar = custom === true
  const tabBarStyle = rest
  const tabBarList = list
  const tabBarPages = list.map(v => v.pagePath)

  const pages = pageCfg?.pages || []
  const homePage = pages[0]?.path

  return {
    isCustomTabBar,
    tabBarList,
    tabBarStyle,
    tabBarPages,
    homePage
  }
}
