<template>
    <div style="width:100%">
      <el-input
        v-if="type==='input'"
        v-model.trim="val"
        clearable
        v-bind="{ ...$attrs, ...$attrs.opts }"
        v-on="events || {}"
      />
    </div>
  </template>
  
  <script setup>
  
  import { defineProps, defineEmits, computed } from 'vue'
  
  const props = defineProps({
    data: {
      type: [Array, String, Number, Boolean, Object, Date],
      default: () => { return '' }
    },
    type: {
      type: String,
      default: 'input'
    },
    events: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
  
  const emit = defineEmits(['update:data'])
  
  const val = computed({
    get: () => props.data,
    set: (value) => {
      emit('update:data', value)
    }
  })
  
  </script>
  
  