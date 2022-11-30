const fs = require('fs-extra')
const loadJson5File = require('load-json5-file')

exports.getPackageManifest = function (pkgPath) {
  return loadJson5File.sync(pkgPath)
}

exports.writePackageManifest = function (pkgPath, data = {}) {
  fs.writeJsonSync(pkgPath, data, { spaces: '  ' })
}
