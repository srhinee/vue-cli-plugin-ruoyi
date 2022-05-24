module.exports = (api, options) => {
  api.render ('./template', options)
  if (options.addBaseTable) {
    api.render ('./table-template', options)
  }
}