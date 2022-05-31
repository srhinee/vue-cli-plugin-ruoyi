const {readConfig, writeConfig} = require ('./fileIO.js')
const {getSource} = require ('./parseAST.js')
const path = require ("path")


module.exports = api => {
  let sourceMap = getSource (path.join (api.getCwd (), "src/api"))

  api.setSharedData ("org.ruoyi.sourceMap", sourceMap)

  api.describeConfig ({
    id: "org.ruoyi.config",
    name: "Ruoyi configuration",
    description: "Set environment variables, global configuration, proxy and request",
    link: "https://github.com/srhinee/vue-cli-plugin-ruoyi.git",
    icon: "https://camo.githubusercontent.com/2a9f3f414d9ad4633facbf43ae37ab36ba53ccdadc20d1e85720cab54194ea4a/68747470733a2f2f6f7363696d672e6f736368696e612e6e65742f6f73636e65742f75702d64643737363533643763396631393764643964393336383466336338646366626162362e706e67",
    files: {
      setting: {
        js: ["src/settings.js"]
      },
      vue: {
        js: ['vue.config.js']
      }
    },
    onRead: readConfig,
    onWrite: writeConfig
  })

  api.addClientAddon ({
    id: "org.ruoyi.client-addon",
    path: require.resolve ('vue-cli-plugin-ruoyi/addon/dist')
  })


  api.addView ({
    id: "org.ruoyi.view",
    name: "org.ruoyi.view.index",
    icon: "pets",
    tooltip: "API VIEW"
  })
}