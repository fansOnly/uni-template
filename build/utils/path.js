import path from 'path'
import { fileURLToPath } from 'url'

const filePath = fileURLToPath(import.meta.url)
const dirPath = path.dirname(filePath)

export const projRoot = path.resolve(dirPath, '../../')

export const resolvePath = (file) => path.resolve(projRoot, file)
