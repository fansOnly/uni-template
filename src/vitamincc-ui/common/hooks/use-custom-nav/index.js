import { useGlobalData } from '@/common/hooks/use-global-data'
const { getGlobalData, setGlobalData } = useGlobalData()

export const useCustomNav = () => {
  const [isCustomNav, navHeight = 0] = getGlobalData(['isCustomNav', 'navHeight'])

  return {
    setNavHeight,
    setCustomNav,
    isCustomNav,
    navHeight
  }
}

const setNavHeight = (value) => setGlobalData('navHeight', value)
const setCustomNav = (value) => setGlobalData('isCustomNav', value)
