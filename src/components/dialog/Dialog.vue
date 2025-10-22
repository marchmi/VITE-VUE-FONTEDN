<template>
    <el-dialog :close-on-click-modal="false" :align-center="true" :custom-class="customClass" v-if="type==='dialog'" destroy-on-close v-model="visible" @close="onClose" :title="title" :width="width">
      <!-- <template #header="{ close, titleId, titleClass }">
        <slot name="header" :close="close" :titleId="titleId" :titleClass="titleClass">
        </slot>
      </template> -->
      <template v-for="slot in Object.keys($slots)" :key="slot" #[slot]="props">
        <slot :name="slot" v-bind="props"></slot>
      </template>
      <slot>
        <div class="content">
          This is dialog content.
        </div>
      </slot>
      <template #footer>
        <div class="dialog-footer" v-show="!noOperate">
          <slot name="dialog-footer">
            <el-button type="info" @click="visible = false">取消</el-button>
            <slot name="operate">
              <el-button type="primary" @click="onSubmit">
                确认
              </el-button>
            </slot>
          </slot>
      </div>
      </template>
    </el-dialog>
    <el-drawer
     :custom-class="customClass"
      v-if="type==='drawer'"
      v-model="visible"
      :size="width"
      :direction="direction"
      :before-close="handleClose"
       :close-on-click-modal="false"
      destroy-on-close
    >
      <template v-for="slot in Object.keys($slots)" :key="slot" #[slot]="props">
        <slot :name="slot" v-bind="props"></slot>
      </template>
      <!-- 标题 -->
      <template #header="{ titleId }">
        <span :id="titleId" class="titleClass">{{title}}</span>
      </template>
      <slot>
        <div class="content">
          This is dialog content.
        </div>
      </slot>
      <template #footer>
        <div class="dialog-footer" v-show="!noOperate">
          <slot name="dialog-footer">
            <el-button type="info" @click="visible = false">取消</el-button>
            <slot name="operate">
              <el-button type="primary" @click="onSubmit">
                确认
              </el-button>
            </slot>
          </slot>
      </div>
      </template>
    </el-drawer>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits, defineExpose } from 'vue'
  
  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    noOperate: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    title: {
      type: String,
      default: '公用弹窗'
    },
    width: {
      type: Number,
      default: 750
    },
    submitFn: {
      type: Function,
      required: true
    },
    direction: {
      type: String,
      default: 'rtl'
    },
    type: {
      type: String,
      default: 'drawer'
    }
  })
  const visible = ref(false)
  const emits = defineEmits(['close'])
  
  const open = () => {
    visible.value = true
  }
  
  const close = () => {
    visible.value = false
  }
  
  const onClose = () => {
    emits('close')
  }
  
  const handleClose = (done) => {
    emits('close')
    done()
  }
  
  const onSubmit = async () => {
    const r = await props.submitFn()
    if (r) { close() }
  }
  
  defineExpose({
    open,
    close,
    visible
  })
  
  </script>
  
  <style scoped>
  .titleClass{
    font-size: 20px;
    font-weight: bold;
  }
  </style>
  
  