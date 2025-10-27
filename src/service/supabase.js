import { createClient } from '@supabase/supabase-js';
import { errorMsg, createLoading } from '@/utils/interaction'
 
let loadingInstance = null // loading 实例
let loadingCount = 0 // 开起loading视图的请求的计数器

/**
 * 开启Loading
 */
function startLoading () {
  if (loadingCount === 0) {
    loadingInstance = createLoading()
  }
  loadingCount++
}

/**
 * 关闭Loading
 */
function endLoading () {
  setTimeout(() => {
    if (loadingCount <= 0) return
    loadingCount--
    if (loadingCount === 0) {
      loadingInstance.close ? loadingInstance.close() : ''
    }
  }, 200)
}


const supabaseUrl = 'https://jwzjobfpchmagrrgusrs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3empvYmZwY2htYWdycmd1c3JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4NTczMjIsImV4cCI6MjA3NjQzMzMyMn0.gjhCcY6mkiwtwRrpXi1pLG8QJ2OUCRV7ZCteUhybCnU';
export const supabase = createClient(
    supabaseUrl,
    supabaseKey,
    {
      global: {
        fetch: async (input, init) => {
          console.log('input',input)
          console.log('init',init)
          startLoading()
          // —— 请求拦截 —— //
          const headers = new Headers(init?.headers)
          headers.set('x-lang', navigator.language)
  
          // —— 真正发请求 —— //
          const res = await fetch(input, { ...init, headers })
  
          // —— 响应拦截 —— //
          if (!res.ok) {
            const body = await res.json()
            errorMsg(body.message || 'Server error')
            throw new Error(body.message)
          }
          endLoading()
          return res
        }
      }
    }
);