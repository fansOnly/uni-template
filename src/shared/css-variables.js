import globalVariables from '@/uni.scss'
import projectVariables from '@p/theme.scss'

// Tip 不能解构使用
export default {
  ...globalVariables,
  ...projectVariables
}
