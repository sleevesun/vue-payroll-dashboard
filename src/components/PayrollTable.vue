<template>
  <div class="grow relative bg-white border border-[var(--color-border-2)] rounded-[var(--radius-medium)] shadow-sm overflow-hidden flex flex-col">
    <a-table
      :columns="columns"
      :data-source="store.currentData"
      :pagination="false"
      :scroll="{ x: 1500, y: 'calc(100vh - 280px)' }"
      row-key="id"
      v-model:expandedRowKeys="store.expandedKeys"
      :expand-row-by-click="false"
      size="small"
      class="h-full payroll-table"
    >
      <!-- Header Cell with Tooltip -->
      <template #headerCell="{ column }">
        <div class="flex items-center gap-1" :class="column.align === 'right' ? 'justify-end' : (column.align === 'center' ? 'justify-center' : 'justify-start')">
             <span>{{ column.title }}</span>
             <a-tooltip v-if="column.customTooltip" overlayClassName="max-w-[260px]">
                <template #title><span v-html="column.customTooltip"></span></template>
                <PhInfo :size="14" class="text-[var(--color-text-4)] hover:text-[var(--color-primary-6)] cursor-help" />
             </a-tooltip>
        </div>
      </template>

      <!-- Body Cell -->
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
             <span class="font-medium text-[var(--color-text-2)]">{{ record.name }}</span>
        </template>
        <template v-else-if="['people', 'total', 'people_ot', 'people_sev', 'salary', 'ot_pay', 'severance', 'signing_bonus', 'bonus', 'social'].includes(String(column.key))">
            <TrendValue 
                :val="record[column.key].val"
                :chg="record[column.key].chg"
                :pct="record[column.key].pct"
                :is-currency="column.isCurrency"
                :is-clickable="column.isClickable"
                :show-comparison="store.showComparison"
                @click="handleCellClick(String(column.key), record)"
            />
        </template>
        <template v-else-if="column.key === 'desc'">
            <div class="text-[var(--color-text-3)] truncate max-w-[200px]" :title="record.desc">
                {{ record.desc || '-' }}
            </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePayrollStore, type PayrollNode } from '@/stores/payroll'
import { PhInfo } from '@/components/icons'
import TrendValue from '@/components/TrendValue.vue'
import type { TableColumnType } from 'ant-design-vue'

const store = usePayrollStore()

// Helper to get tooltip content
const t = (key: string) => store.fieldDefinitions[key]?.content

type CustomColumnType = TableColumnType & {
  customTooltip?: string
  isCurrency?: boolean
  isClickable?: boolean
}

const columns = computed<CustomColumnType[]>(() => {
  const commonNameCol: CustomColumnType = {
    title: '部门名称',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    width: 250,
    align: 'left'
  }

  const commonDescCol: CustomColumnType = {
    title: '发薪变化说明',
    dataIndex: 'desc',
    key: 'desc',
    width: 250,
    align: 'left',
    customTooltip: t('发薪变化说明')
  }

  if (store.viewMode === 'summary') {
    return [
      commonNameCol,
      {
        title: '发薪总人数',
        key: 'people',
        width: 150,
        align: 'right',
        customTooltip: t('发薪总人数'),
        className: 'bg-[var(--color-primary-1)] text-[var(--color-primary-6)] font-bold',
        isCurrency: false
      },
      {
        title: '发薪总额 (万元)',
        key: 'total',
        width: 200,
        align: 'right',
        customTooltip: t('发薪总额'),
        className: 'bg-[var(--color-primary-1)] text-[var(--color-primary-6)] font-bold',
        isCurrency: true,
        // TODO: 临时注释交互功能
        // isClickable: true
        isClickable: false
      },
      commonDescCol
    ]
  } else {
    // Detail Mode
    return [
      commonNameCol,
      {
        title: '人员概况',
        align: 'center',
        className: 'bg-[var(--color-primary-1)] border-r border-[#e0e0e0]',
        children: [
            {
                title: '发薪总人数',
                key: 'people',
                width: 120,
                align: 'right',
                customTooltip: t('发薪总人数'),
                className: 'bg-[var(--color-primary-1)] text-[var(--color-primary-6)] font-bold',
            },
            {
                title: '涉及加班',
                key: 'people_ot',
                width: 120,
                align: 'right',
                customTooltip: t('涉及加班'),
                className: 'bg-white',
            },
            {
                title: '涉及补偿金',
                key: 'people_sev',
                width: 120,
                align: 'right',
                customTooltip: t('涉及补偿金'),
                className: 'bg-white border-r border-[#e0e0e0]',
            }
        ]
      },
      {
        title: '薪酬成本 (万元)',
        align: 'center',
        className: 'bg-[var(--color-primary-1)]',
        children: [
            {
                title: '发薪总额',
                key: 'total',
                width: 140,
                align: 'right',
                customTooltip: t('发薪总额'),
                className: 'bg-[var(--color-primary-1)] text-[var(--color-primary-6)] font-bold',
                isCurrency: true,
                // TODO: 临时注释交互功能
                // isClickable: true
                isClickable: false
            },
            { title: '应发工资', key: 'salary', width: 120, align: 'right', customTooltip: t('应发工资'), isCurrency: true, className: 'bg-white' },
            { 
                title: '加班费', 
                key: 'ot_pay', 
                width: 120, 
                align: 'right', 
                customTooltip: t('加班费'), 
                isCurrency: true, 
                // TODO: 临时注释交互功能
                // isClickable: true 
                isClickable: false,
                className: 'bg-white'
            },
            { 
                title: '补偿金', 
                key: 'severance', 
                width: 120, 
                align: 'right', 
                customTooltip: t('离职补偿'), 
                isCurrency: true, 
                // TODO: 临时注释交互功能
                // isClickable: true 
                isClickable: false,
                className: 'bg-white'
            },
            { title: '签约金', key: 'signing_bonus', width: 120, align: 'right', customTooltip: t('签约金'), isCurrency: true, className: 'bg-white' },
            { title: '奖金', key: 'bonus', width: 120, align: 'right', customTooltip: t('奖金'), isCurrency: true, className: 'bg-white' },
            { title: '司付社保公积金', key: 'social', width: 140, align: 'right', customTooltip: t('五险一金司付'), isCurrency: true, className: 'bg-white' },
        ]
      },
      commonDescCol
    ]
  }
})

function handleCellClick(key: string, record: PayrollNode) {
    if (['total', 'ot_pay', 'severance'].includes(key)) {
        store.openDrawer(key, record.name)
    }
}
</script>

<style scoped>
:deep(.ant-table-thead > tr > th) {
  background: var(--color-fill-1);
  color: var(--color-text-2);
  font-weight: 500;
}
:deep(.ant-table-row:hover > td) {
  background-color: var(--color-fill-2) !important;
}
</style>
