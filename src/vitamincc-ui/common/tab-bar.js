import { setAppData } from './global-data'
import pageCfg from '@/pages.json'

const tabBarObj = pageCfg?.tabBar || {}
const { list = [], custom = false, ...rest } = tabBarObj
export const isCustomTabBar = custom === true
setAppData('isCustomTabBar', custom === true)
export const tabBarStyle = rest
export const tabBarList = list
export const tabBarPages = tabBarList.map(v => v.pagePath)

const pages = pageCfg?.pages || []
export const homePage = pages[0]?.path
