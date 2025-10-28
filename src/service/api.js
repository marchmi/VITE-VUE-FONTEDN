
import { supabase } from '@/service/supabase'
import { createLoading } from '@/utils/interaction'

let loadingInstance = null // loading 实例
let loadingCount = 0 // 开起loading视图的请求的计数器

/**
 * 开启Loading
 * 首次调用supabase时，建立链接需要额外的时间，并且不会触发global配置中的loading，在fetchList请求中开启额外的loading
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
/**
 * 查询表内的所有数据
 * @param tableName 表名
 */
export const fetchAll = async (tableName) => {
  return new Promise(async (resolve, reject) => {
    const { data: result, error } = await supabase
      .from(tableName)
      .select('*')
    if (error) {
      return reject(new Error(error))
    }
    resolve(result)
  })
}

export const fetchList = async (payload = {}, tableName) => {
  startLoading()
  return new Promise(async (resolve, reject) => {
    const { pageSize, currentPage, ...params } = payload
    // 计算开始索引
    const start = (currentPage - 1) * pageSize
    // 计算结束索引
    const end = start + (pageSize - 1)
    let sqlQuery = supabase.from(tableName)
      .select('*', { count: 'exact' })
      .order('id', { ascending: true })
      .range(start, end)
    Object.keys(params).forEach(str => {
      if ([0, -1].includes(str.indexOf('Like'))) {
        sqlQuery = sqlQuery.eq(str, payload[str])
        return
      }
      sqlQuery = sqlQuery.like(str.split('Like')[0], `%${payload[str]}%`)
    })
    const { data: result, count, error } = await sqlQuery
    endLoading ()
    if (error) {
      return reject(new Error(error))
    }
    resolve({
      list: result,
      total: count
    })
  })
}

export const createOne = async (payload, tableName) => {
  return new Promise(async (resolve, reject) => {
    const { id, ...other } = payload
    const { data: result, error } = await supabase
      .from(tableName)
      .insert(other)
    if (error) {
      return reject(new Error(error))
    }
    resolve(result)
  })
}

export const updateOne = async (payload, tableName) => {
  return new Promise(async (resolve, reject) => {
    const { id, ...other } = payload
    const { data: result, error } = await supabase
      .from(tableName)
      .update(other)
      .eq('id', id)
    if (error) {
      return reject(new Error(error))
    }
    resolve(result)
  })
}

export const deleteOne = async (id, tableName) => {
  return new Promise(async (resolve, reject) => {
    const { data: result, error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id)
    if (error) {
      return reject(new Error(error))
    }
    resolve(result)
  })
}

