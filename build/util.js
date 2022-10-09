const path = require('path');
const fs = require('fs-extra');

/**
 * 拷贝目录
 */
function copyDir (source, target) {
  const isDir = fs.statSync(source).isDirectory()
  if (isDir) {
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target)
    }
    const dirs = fs.readdirSync(source)
    dirs.forEach(dir => {
      copyDir(path.join(source, dir), path.join(target, dir))
    })
  } else {
    fs.copyFileSync(source, target)
  }
}
exports.copyDir = copyDir
