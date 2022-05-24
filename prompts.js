module.exports = [
  {
    type: "confirm",
    name: "isClickCloseModal",
    message: "是否可以通过点击 modal 关闭 Dialog?",
    default: true,
    //ui展示相关
    group: "基础设置",
    description: "若依现有业务的全局化设置"
  },
  {
    type: "confirm",
    name: "addBaseTable",
    message: "是否添加表单模板?",
    validate: input => !!input,
    default: false,
    //ui展示相关
    group: "可选组件",
    description: "一些常用的组件"
  }
]