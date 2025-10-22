<template>
    <app-main>
      <template #content>
        <div class="pop-dialog-usage">
          <!-- 基础功能演示 -->
          <pop-dialog 
            :options="{type: 'dialog'}"
            ref="popDialogRef"
          >
            <template #trigger="{ open }">
              <el-button type="info" @click="open">插槽暴露方法开启PopDialog</el-button>
            </template>
            <div>
              <span>内容区域</span>
            </div>
            <template #operate="{ close }">
              <el-button type="primary" @click="closeDialogBySlotExposeMethod(close)">插槽暴露方法关闭</el-button>
              <el-button type="primary" @click="closeDialogByRef(close)">通过组件引用关闭</el-button>
            </template>
          </pop-dialog>
          <el-button type="info" @click="openDialogByRef">通过组件引用开启PopDialog</el-button>
          <!-- 数据录入功能演示 -->
           <pop-dialog 
            :options="options"
            ref="formDialogRef"
          >
            <template #trigger="{ open }">
              <el-button type="primary" @click="open">新增</el-button>
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
        </div>
      </template>
    </app-main>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import AppMain from '@/components/AppMain'
  import PopDialog from '@/components/dialog/PopDialog' // 引入弹窗组件
  import Form from '@/components/form/Form' // 引入表单组件
  
  /** 弹窗的props属性集合 */
  const options = ref({
    type: 'drawer',
    title: '新增数据'
  })
  /** 弹窗视图Ref */
  const popDialogRef = ref()
  /** 使用插槽暴露的close方法关闭弹窗 */
  const closeDialogBySlotExposeMethod = (close) => {
    close()
  }
  /** 使用弹窗视图引用开启弹窗 */
  const openDialogByRef = () => {
    popDialogRef.value.open()
  }
  /** 使用弹窗视图引用关闭弹窗 */
  const closeDialogByRef = () => {
    popDialogRef.value.close()
  }
  
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
      { required: true, message: '请输入' }
    ],
    email: [
      { required: true, message: '请输入' }
    ]
  })
  /** 表单项配置 */
  const formItems = ref([
    { label: '用户名', prop: 'username' },
    { label: '手机号', prop: 'tel' },
    { label: '邮箱', prop: 'email' }
  ])
  /** 提交数据 */
  const submit = (close) => {
    dataFormRef.value.validate((valid) => {
      if (valid) {
        close()
      }
    })
  }
  
  </script>
  <style lang="less" scoped>
  .pop-dialog-usage {
    margin: 8px;
    display: flex;
    gap: 12px;
  }
  </style>
  