<template>
    <app-main>
        <template #content>
            <div class="table-pagination-usage">
                <m-table v-bind="tableAttrs">
                    <!-- 表头文案默认显示列表字段配置的label，需要自定义某一列的表头时，以 `#${字段名}Title`的规则编写对应template -->
                    <template #usernameTitle>
                        <div style="color: red;">用户名称（姓名）</div>
                    </template>
                    <!-- 默认直接展示单元格对应的值，需要自定义单元格显示内容时，以`#${字段名}`的规则编写对应的template -->
                    <template #username="props">
                        <div style="color: red;">{{props.row.username}}</div>
                        <!-- 可用JSON.stringify查看插槽传递的参数 -->
                        <!-- <div>{{ JSON.stringify(props) }}</div> -->
                    </template>
                </m-table>
            </div>
        </template>
    </app-main>
</template>

<script setup>
import { ref, reactive } from 'vue'
import AppMain from '@/components/AppMain'
import MTable from '@/components/MTable' // 引入二次封装表格组件
import useTable from '@/components/hooks/useTable' // 引入useTable hook

/** 表格数据 */
const tableData = ref([
    { 
        createdAt: 1761461287663,
        username: '用户名',
        tel: '17888888888',
        email: 'email@163.com'
    }
])
/** 表格展示字段 */
const tableColumn = [
    {
        key: 'username',
        label: '用户名称'
    },
    {
        key: 'tel',
        label: '手机号'
    },
    {
        key: 'email',
        label: '邮箱'
    },
    {
        key: 'createdAt',
        label: '创建时间',
        format: 'formatDate' // format 属性用于制定格式化数据的方法，配置该属性后，在MTable组件中会通过formatValue调用对应的方法输出显示内容
    }
]

/** 表格组件props对象,处理成一个对象，直接通过v-bind一次性像组价传递需要的入参（props） */
const tableAttrs = reactive(useTable({
    tableData: tableData,
    tableColumn: tableColumn,
    operations: [ // 操作栏操作按钮配置，当operations的长度为0时，表格不显示操作栏
        {
            label: '编辑',
            handler: (row) => {
                alert('点击了编辑按钮')
            },
            props: {
                link: true
            }
        },
        {
            label: '删除',
            handler: (row) => {
                alert('点击了删除按钮')
            },
            props: {
                link: true
            }
        }
    ],
    attrs: {
        fixedOperationColumn: 'right'
    }
}))

</script>
<style lang="less" scoped>
.table-pagination-usage {
    margin: 8px;
    display: flex;
    gap: 12px;
}
</style>