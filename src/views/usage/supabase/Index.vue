<template>
    <app-main>
        <template #content>
            
        </template>
    </app-main>
</template>

<script setup>
import { ref } from 'vue'
import AppMain from '@/components/AppMain'
import { supabase } from '@/service/supabase'
async function getUsers() {
    const { data, error } = await supabase
        .from('users')
        .select('*');
    if (error) console.error(error);
    else console.log(data);
}

getUsers()
</script>
<style lang="less" scoped>
    
</style>