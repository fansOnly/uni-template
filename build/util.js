const path = require('path');
const fs = require('fs');

/**
 * 删除文件 - 同步
 */
 exports.deleteFileSync = (filePath) => {
  try {
    return fs.existsSync(filePath) && fs.unlinkSync(filePath)
  } catch (error) {
    console.log('[debug]删除文件失败 ', error);
  }
}

/**
 * 读取文件 - 同步
 */
exports.readFileSync = (filePath, charset = 'utf8') => {
  try {
    return fs.readFileSync(filePath, charset)
  } catch (error) {
    console.log('[debug]读取文件失败 ', error);
  }
}

/**
 * 写入文件 - 同步
 */
exports.writeFileSync = (filePath, data, options = { encoding: 'utf8' }) => {
  try {
    return fs.writeFileSync(filePath, data, options)
  } catch (error) {
    console.log('[debug]写入文件失败 ', error);
  }
}

/**
 * 遍历目录
 */
exports.readdirSync = (path) => {
  try {
    return fs.readdirSync(path)
  } catch (error) {
    console.log('[debug]读取目录失败: ', error);
  }
}

/**
 * 获取文件全路径
 */
exports.resolvePath = url => {
  return path.join(__dirname, url)
}

/**
 * 拷贝目录
 */
function copyDirSync (source, target) {
  const isDir = fs.statSync(source).isDirectory()
  if (isDir) {
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target)
    }
    const dirs = fs.readdirSync(source)
    dirs.forEach(dir => {
      copyDirSync(path.join(source, dir), path.join(target, dir))
    })
  } else {
    fs.copyFileSync(source, target)
  }
}
exports.copyDirSync = copyDirSync
