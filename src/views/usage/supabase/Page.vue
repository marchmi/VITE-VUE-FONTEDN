<template>
  <app-main>
    <template #content>
      <div class="table-pagination-usage">
        <!-- 筛选 -->
        <m-filter
          v-bind="filterOptions"
          v-model:filter-params="filterOptions.filterParams"
        >
        </m-filter>
        <!-- 新增/编辑 -->
        <pop-dialog 
          :options="dialogOptions"
          ref="formDialogRef"
        >
          <template #trigger>
            <el-button type="primary" @click="openDialog">新增</el-button>
          </template>
          <div>
            <Form
              ref="dataFormRef"
              :form-rules="formRules" 
              :form-items="formItems" 
              :form-data="formData"
            >
            </Form>
          </div>
          <template #operate="{ close }">
            <el-button type="primary" @click="submit(close)">提交</el-button>
          </template>
        </pop-dialog>
        <m-table v-bind="tableAttrs">
          <!-- 表头文案默认显示列表字段配置的label，需要自定义某一列的表头时，以 `#${字段名}Title`的规则编写对应template -->
          <template #usernameTitle>
            <div style="color: red;">用户名称（姓名）</div>
          </template>
          <!-- 默认直接展示单元格对应的值，需要自定义单元格显示内容时，以`#${字段名}`的规则编写对应的template -->
          <template #username="props">
            <div style="color: red;">{{props.row.username}}</div>
            <!-- 可用JSON.stringify查看插槽传递的参数 -->
            <!-- <div>{{ JSON.stringify(props) }}</div> -->
          </template>
        </m-table>
        <!-- 当列表高度超出容器时，将分页固定在底部 -->
        <el-affix position="bottom" :offset="70">
          <div class="pagination-box">
            <el-pagination 
              background
              layout="prev, pager, next, sizes"
              v-model:current-page="pager.currentPage"
              v-model:page-size="pager.pageSize"
              @size-change="handleSizeChange"
              @current-change="getTableData(filterOptions.filterParams)"
              :total="pager.total"
            />
          </div>
        </el-affix>
      </div>
    </template>
  </app-main>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import AppMain from '@/components/AppMain'
import MTable from '@/components/MTable' // 引入二次封装表格组件
import useTable from '@/components/hooks/useTable' // 引入useTable hook
import PopDialog from '@/components/dialog/PopDialog' // 引入弹窗组件
import Form from '@/components/form/Form' // 引入表单组件
import MFilter from '@/components/MFilter'
import useFilter from '@/components/hooks/useFilter'
import { useRegexRule, $11_13NumericRegex } from '@/plugins/useRegexRule'
import { confirm, successMsg } from '@/utils/interaction'
import * as Apis from '@/service/api'

/** 表格数据 */
const tableData = ref([])

// 筛选条件组件props
const filterOptions = useFilter({
  formFields: [
    {
      key: 'usernameLike',
      type: 'input',
      label: '用户名',
      props: {
        placeholder: '请输入用户名进行搜索'
      }
    }
  ],
  operations: [ // 操作栏
    {
      label: '搜索',
      handler: () => {
        pager.currentPage = 1
        getTableData(filterOptions.filterParams)
      }, // 传递操作函数的指针
      props: { // 其它的按钮控制属性
        type: 'primary',
        size: 'default'
      }
    },
    {
      label: '重置',
      handler: () => {
        pager.currentPage = 1
        Object.keys(filterOptions.filterParams).forEach(key => {
          delete filterOptions.filterParams[key]
        })
        getTableData(filterOptions.filterParams)
      },
      props: { // 其它的按钮控制属性
        type: 'info',
        size: 'default'
      }
    }
  ],
  filterParams: {
  }
})


const pager = reactive({
  pageSize: 10,
  currentPage: 1,
  total: 0
})
const handleSizeChange = () => {
  pager.currentPage = 1
  getTableData(filterOptions.filterParams)
}
const getTableData = (params = {}) => {
  const payload = {
    ...pager,
    ...params
  }
  delete payload.total // 请求参数不需要total，去除避免接口异常
  Apis.fetchList(payload, 'users').then(result => {
    const { list, total } = result
    tableData.value = list
    pager.total = total
  })
}
/** 表格展示字段 */
const tableColumn = [
  {
    key: 'username',
    label: '用户名称'
  },
  {
    key: 'tel',
    label: '手机号'
  },
  {
    key: 'email',
    label: '邮箱'
  },
  {
    key: 'createdAt',
    label: '创建时间',
    format: 'formatDate' // format 属性用于制定格式化数据的方法，配置该属性后，在MTable组件中会通过formatValue调用对应的方法输出显示内容
  }
]

/** 表格组件props对象,处理成一个对象，直接通过v-bind一次性像组价传递需要的入参（props） */
const tableAttrs = reactive(useTable({
  tableData: tableData,
  tableColumn: tableColumn,
  operations: [ // 操作栏操作按钮配置，当operations的长度为0时，表格不显示操作栏
    {
      label: '编辑',
      handler: (row) => {
        openDialog(row)
      },
      props: {
        link: true
      }
    },
    {
      label: '删除',
      handler: (item) => {
        confirm().then(() => {
          deleteItem(item)
        })
      },
      props: {
        link: true
      }
    }
  ],
  attrs: {
    fixedOperationColumn: 'right'
  }
}))

/** 邮箱格式校验方法 */
const validEmail = (rule, value, callback) => {
  if (!value) {
    callback()
  }
  const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9-.]+$/
  if (!regex.test(value)) {
    callback(new Error('邮箱格式不正确'))
  } else {
    callback()
  }
}

/** 弹窗的props属性集合 */
const dialogOptions = ref({
  type: 'drawer',
  title: '新增数据'
})

/** 数据录入功能演示 相关属性 */
/** 数据录入弹窗视图Ref */
const formDialogRef = ref()
/** 表单视图Ref */
const dataFormRef = ref()
/** 表单数据绑定对象 */
const formData = ref({})
/** 字段校验规则 */
const formRules = reactive({
  username: [
    { required: true, message: '请输入' }
  ],
  tel: [
    { required: true, message: '请输入' },
    useRegexRule($11_13NumericRegex, '请输入11或13位纯数字') // 使用封装脚本useRegexRule生成校验方法
  ],
  email: [
    { required: true, message: '请输入' },
    { validator: validEmail, trigger: [ 'blur', 'change' ] }
  ]
})
/** 表单项配置 */
const formItems = ref([
  { label: '用户名', prop: 'username' },
  { label: '手机号', prop: 'tel' },
  { label: '邮箱', prop: 'email' }
])
/** 开启弹窗 */
const openDialog = (row = {}) => {
  dialogOptions.value.title = row.id ? '编辑数据' : '新增数据'
  formData.value = { ...row } // 建议使用深拷贝赋值
  formDialogRef.value.open()
}
/** 提交数据 */
const submit = (close) => {
  // isTrusted, _vts 浏览器原生事件对象（Event）上的字段,提交会导致接口异常，解构出来丢掉。
  const { id, isTrusted, _vts, ...payload } = formData.value
  dataFormRef.value.validate((valid) => {
    if (valid) {
      const request = id ? Apis.updateOne : Apis.createOne
      request({ id, ...payload }, 'users').then(result => {
        successMsg(id ? '编辑成功' : '新增成功')
        close()
        getTableData(filterOptions.filterParams)
      })
    }
  })
}

/** 增删改查方法 */
/** 删除 */
const deleteItem = async (item) => {
  const { id } = item
  Apis.deleteOne(id, 'users').then(result => {
    successMsg('删除成功')
    getTableData(filterOptions.filterParams)
  })
}

onMounted(() => {
  getTableData(filterOptions.filterParams)
})


</script>
<style lang="less" scoped>
.table-pagination-usage {
  display: flex;
  gap: 12px;
  flex-direction: column;
}
</style>

