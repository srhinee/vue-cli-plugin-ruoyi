const extPackage = require ("./template/package.json")
module.exports = (api, options) => {
  api.extendPackage (extPackage)

  api.render ('./template', options)
  if (options.addBaseTable) {
    api.render ('./table-template', options)
  }
}