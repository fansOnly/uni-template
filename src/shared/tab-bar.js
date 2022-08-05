import pkg from '@/pages.json'

const tabBarObj = pkg?.tabBar || {}

const { list = [], ...styles } = tabBarObj

export const tabBarStyle = styles

export const tabBarList = list

export const tabBarPages = tabBarList.map(v => v.pagePath)
