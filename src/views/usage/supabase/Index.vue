<template>
    <app-main>
        <template #content>
            
        </template>
    </app-main>
</template>

<script setup>
import { ref, reactive } from 'vue'
import AppMain from '@/components/AppMain'
import { supabase } from '@/service/supabase'

/**
 * 查询表内的所有数据
 * @param tableName 表名
 */
const fetchAll = async (tableName) => {
    return new Promise( async (resolve, reject) => {
        const { data: result, error } = await supabase
            .from(tableName)
            .select('*')
        if (error) {
            return reject(new Error(error))
        }
        resolve(result)
    })
}

const filter = reactive({
    pageSize: 10,
    currentPage: 1
})

const fetchList = async (params = {}, tableName) => {
    const payload = { ...filter, ...params }
    return new Promise( async (resolve, reject) => {
        // 计算开始索引
        const start = (payload.currentPage - 1) * payload.pageSize
        // 计算结束索引
        const end = start + ( payload.pageSize - 1);
        let sqlQuery = supabase.from(tableName)
            .select('*', { count: 'exact' })
            .order('id', { ascending: true })
            .range(start, end);

        if (payload.username) {
            sqlQuery = sqlQuery.like('username', `%${payload.username}%`)
        }
        if (payload.tel) {
            sqlQuery = sqlQuery.eq('tel', payload.tel)
        }

        const { data: result, count, error } = await sqlQuery
        console.log(result, count)
        if (error) {
            return reject(new Error(error))
        }
        resolve({
            list: result,
            total: count
        })
    })
}

const createOne = async (data, tableName) => {
    return new Promise( async (resolve, reject) => {
        const { data: result, error } = await supabase
            .from(tableName)
            .insert(data)
        if (error) {
            return reject(new Error(error))
        }
        resolve(result)
    })
}

const updateOne = async (id, data, tableName) => {
    return new Promise( async (resolve, reject) => {
        const { data: result, error } = await supabase
            .from(tableName)
            .update(data)
            .eq('id', id)
        if (error) {
            return reject(new Error(error))
        }
        resolve(result)
    })
}

const deleteOne = async (id, tableName) => {
    return new Promise( async (resolve, reject) => {
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

// createOne({username: '残虹1'}, 'users').then(res=>{
//     console.log(res)
// })
</script>
<style lang="less" scoped>
    
</style>