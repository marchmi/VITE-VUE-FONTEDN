/**
 * author: marchmi
 * createTime: 2023-3-17 18:03
 * updateTime: 2023-3-20 18:03
 */
 import { // 从elemnt-plus 中引入视图组件
  ElAffix,
  ElButton,
  ElInput,
  ElRadio,
  ElTable,
  ElTableColumn,
  ElForm,
  ElFormItem,
  ElIcon,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElScrollbar,
  ElCascader,
  ElCheckboxGroup,
  ElCheckbox,
  ElDatePicker,
  ElUpload,
  ElSelect,
  ElTag,
  ElSwitch,
  ElPagination,
  ElOption,
  ElAvatar,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElBadge,
  ElDrawer,
  ElConfigProvider,
  ElColorPicker,
  ElLink,
  ElDialog,
  ElTooltip,
  ElRow,
  ElCol,
  ElCard,
  ElPopover
} from 'element-plus'
// 引入element-plus样式文件
import 'element-plus/dist/index.css'

const coms = [ // 将引入的组件存储到一个可遍历的数组中
  ElAffix,
  ElButton,
  ElInput,
  ElRadio,
  ElTable,
  ElTableColumn,
  ElForm,
  ElFormItem,
  ElIcon,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElScrollbar,
  ElCascader,
  ElCheckboxGroup,
  ElCheckbox,
  ElDatePicker,
  ElUpload,
  ElSelect,
  ElTag,
  ElSwitch,
  ElPagination,
  ElOption,
  ElAvatar,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElBadge,
  ElDrawer,
  ElConfigProvider,
  ElColorPicker,
  ElLink,
  ElDialog,
  ElTooltip,
  ElRow,
  ElCol,
  ElCard,
  ElPopover
]

export default (app) => {
  coms.forEach(c => { // 暴露一个组件注册方法，遍历数组，将UI库中的组件注册成当前项目的全局组件
    app.component(c.name.replace('El', "Mi") , c) // 替换组件库中的名称的前缀进行注册（勿care，也勿删，项目里有一些陈旧代码需要）
    app.component(c.name , c) // 按UI库中的名称注册
  })
}
