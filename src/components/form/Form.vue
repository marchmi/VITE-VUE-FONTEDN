<template>
    <div>
      <el-form
        :model="data"
        :rules="formRules"
        :validate-on-rule-change="false"
        label-width="auto"
        ref="formRef"
      >
        <el-form-item :label="item.label" v-for="item in formItems" :key="item.prop" :prop="item.prop">
          <div v-if="$slots[item.prop]">
            <slot :name="item.prop" />
          </div>
          <form-item v-else v-model:data="data[item.prop]" clearable :opts="item.opts||{}"/>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineExpose, watch } from 'vue'
  import FormItem from './FormItem'
  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    /** - 表单视图绑定对象 */
    formData: {
      type: [Object],
      default: () => {
        return {}
      }
    },
    /** 表单校验规则 */
    formRules: {
      type: [Object],
      default: () => {
        return {
          demo: [
            { required: true, message: '请填写' }
          ]
        }
      }
    },
    /** 表单校验规则 */
    formItems: {
      type: [Array],
      default: () => {
        return [
          { label: '示例项', prop: 'demo' },
          { label: '子组件视图', prop: 'compViewField', opts: { placeholder: '请输入' } }
        ]
      }
    }
  })
  const data = ref({})
  watch(() => props.formData, (value) => {
    data.value = props.formData
  }, { deep: true, immediate: true })
  
  const formRef = ref()
  const validate = (callback) => {
    formRef.value.validate(valid => {
      callback(valid)
    })
  }
  
  defineExpose({
    validate
  })
  </script>
  
  