const fs = require ('fs')
let devData, proData, stageData
module.exports.readConfig = ({cwd, data}) => {
  let settingConfig = data.setting
  let settingDesc = ['侧边栏主题',
    '是否系统布局配置', '是否显示顶部导航', '是否显示 tagsView', '是否固定头部',
    '是否显示logo', '是否显示动态标题', '错误日志']
  let settingPrompts = Object.entries (settingConfig).map (([key, value], index) => {
    let prompts = {
      group: 'global',
      name: key,
      message: key,
      description: settingDesc[index],
      value: value,
    }
    if (index === 0) {
      Object.assign (prompts, {
        type: 'list',
        choices: [
          {name: 'dark', value: 'theme-dark'},
          {name: 'light', value: 'theme-light'}
        ]
      })
    } else if (index === 7) {
      Object.assign (prompts, {
        type: 'checkbox', choices: [
          {name: 'production', value: 'production', checked: true},
          {name: 'development', value: 'development', checked: false},
          {name: 'staging', value: 'staging', checked: false},
        ]
      })
    } else {
      Object.assign (prompts, {type: 'confirm'})
    }
    return prompts
  })

  let serverConfig = data.vue.devServer
  let serverPrompts = [
    {
      group: 'proxy',
      name: 'host',
      value: serverConfig.host,
      message: 'host',
      description: '主机地址',
      type: 'input'
    }, {
      group: 'proxy',
      name: 'port',
      message: 'port',
      value: serverConfig.port,
      description: '端口号',
      type: 'input'
    }, {
      group: 'proxy',
      name: 'open',
      message: 'open',
      value: serverConfig.open,
      description: '是否打开浏览器',
      type: 'confirm'
    }, {
      group: 'proxy',
      name: 'disableHostCheck:',
      message: 'disableHostCheck:',
      value: serverConfig.disableHostCheck,
      description: '是否开启端口检查',
      type: 'confirm'
    }];

  [devData, proData, stageData] = ['.env.development', '.env.production', '.env.staging']
  .map (name => {
    return fs.readFileSync (`${cwd}/${name}`, "utf-8")
  })
  let [devConfig, proConfig, stageConfig] = [devData, proData, stageData].map (source => {
    let env = [], note = ""
    source.split (/\r?\n/g).filter (v => !!v).forEach (v => {
      let line = v.match (/#(.*)/)
      if (line) {
        if (note) note += ","
        note += line[1]
      } else {
        let data = v.split (/ ?= ?/)
        if (data.length === 2)
          env.push ({
            note,
            key: data[0],
            value: data[1]
          })
        note = ""
      }
    })
    return env
  })
  let [devPrompts, proPrompts, stagePrompts] = [devConfig, proConfig, stageConfig].map ((config, j) => {
    let group
    if (j === 0) group = 'development'
    else if (j === 1) group = 'production'
    else if (j === 2) group = 'staging'
    return config.map (v => ({
      name: `${group}:${v.key}`,
      type: "input",
      message: v.key,
      description: v.note,
      value: v.value,
      group
    }))
  })

  return {
    tabs: [
      {
        id: "setting",
        label: "setting",
        icon: "favorite",
        prompts: [...settingPrompts, ...serverPrompts]
      },
      {
        id: "environment",
        label: "environment",
        icon: "favorite_border",
        prompts: [
          ...devPrompts,
          ...proPrompts,
          ...stagePrompts
        ]
      }
    ]
  }
}

module.exports.writeConfig = ({cwd, prompts, api}) => {
  const result = {}
  prompts.forEach (prompt => {
    if (!result[prompt.group]) {
      result[prompt.group] = {}
    }
    result[prompt.group][prompt.message] = prompt.rawValue
  });
  [[devData, 'development'], [proData, 'production'], [stageData, 'staging']].forEach (([source, name]) => {
    let envResult = source
    Object.entries (result[name]).forEach (([key, value]) => {
      let reg = new RegExp (`(?<=${key} *=)(.*)?(?!=\\n)`)
      envResult = envResult.replace (reg, ` ${value}`)
    })
    fs.writeFileSync (cwd + "/.env." + name, envResult)
  })

  api.setData ("setting", result.global)
  api.setData ('vue', {devServer: result.proxy})
}
