import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jwzjobfpchmagrrgusrs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3empvYmZwY2htYWdycmd1c3JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4NTczMjIsImV4cCI6MjA3NjQzMzMyMn0.gjhCcY6mkiwtwRrpXi1pLG8QJ2OUCRV7ZCteUhybCnU';
export const supabase = createClient(
    supabaseUrl,
    supabaseKey,
    {
      global: {
        fetch: async (input, init) => {
          // —— 请求拦截 —— //
          const headers = new Headers(init?.headers)
          headers.set('x-lang', navigator.language)
          headers.set('x-tenant', getTenantId())
  
          // —— 真正发请求 —— //
          const res = await fetch(input, { ...init, headers })
  
          // —— 响应拦截 —— //
          if (!res.ok) {
            const body = await res.json()
            ElMessage.error(body.message || 'Server error')
            throw new Error(body.message)
          }
          return res
        }
      }
    }
);