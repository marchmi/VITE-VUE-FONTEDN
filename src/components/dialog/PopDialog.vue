<template>
    <div>
      <slot name="trigger" :open="open">
        <el-button type="info" @click="open">{{ options.triggerText }}</el-button>
      </slot>
      <Dialog
        :type="options.type || 'dialog'"
        :width="options.width || 640"
        :title="options.title || '新增数据'"
        ref="dialogRef"
      >
        <div>
          <slot>
            默认内容
          </slot>
        </div>
        <template #operate>
          <slot name="operate" :close="close">
            <el-button type="primary" @click="close">确认</el-button>
          </slot>
        </template>
      </Dialog>
    </div>
  </template>
  <script setup>
  import { ref, defineProps, defineExpose } from 'vue'
  import Dialog from '@/components/dialog/Dialog'
  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    /**
     * - 配置项：
     * - triggerText：触发器按钮文案
     * - width: 新增编辑视图（dialog或drawer）的宽度
     * - title：标题
     * - type：新增编辑视图的呈现方式（dialog或drawer）
     */
    options: {
      type: [Object],
      default: () => {
        return {
          triggerText: '新增',
          width: 640,
          title: '新增数据',
          type: 'dialog' // dialog | drawer
        }
      }
    }
  })
  
  const dialogRef = ref(null)
  
  /**
   * - 开启编辑视图
   * - 使用trigger插槽时：
   * -     <template #trigger="{ open }"> <tag @click="open">...</tag></template>
   *  */
  const open = () => {
    dialogRef.value.open()
  }
  
  /**
   * - 关闭编辑视图
   * - 使用trigger插槽时：
   * -     <template #operate="{ confirmBtnClickHandler }"> <tag @click="confirmBtnClickHandler">...</tag></template>
   *  */
  const close = () => {
    dialogRef.value.close()
  }
  
  defineExpose({
    open,
    close
  })
  
  </script>
  
  