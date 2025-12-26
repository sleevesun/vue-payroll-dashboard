<template>
  <a-drawer
    :open="store.drawerVisible"
    :title="title"
    width="480"
    @close="store.closeDrawer"
    :body-style="{ padding: '0px', display: 'flex', flexDirection: 'column' }"
  >
    <div class="flex-1 overflow-auto p-6">
       <!-- Stat Banner -->
       <div class="bg-[var(--color-primary-1)] border border-[var(--color-primary-1)] rounded-[var(--radius-medium)] p-4 mb-6 flex justify-between items-center">
          <div>
            <div class="text-xs text-[var(--color-primary-6)] font-medium mb-1">本月{{ typeName }}总额</div>
            <div class="text-2xl font-bold text-[var(--color-primary-6)] tabular-nums">¥ 155,360.00</div>
          </div>
          <div class="text-right">
             <div class="text-xs text-[var(--color-primary-5)]">涉及人数</div>
             <div class="text-lg font-bold text-[var(--color-primary-6)]">78 <span class="text-xs font-normal">人</span></div>
          </div>
       </div>

       <!-- List -->
       <h3 class="text-sm font-bold text-[var(--color-text-1)] mb-3 border-l-4 border-[var(--color-primary-6)] pl-2">Top 5 领取明细</h3>
       <div class="space-y-3">
          <div v-for="item in mockItems" :key="item.name" class="flex items-center justify-between p-3 border border-[var(--color-border-2)] rounded-[var(--radius-small)] hover:bg-[var(--color-fill-1)] transition cursor-pointer">
             <div class="flex items-center gap-3">
                <div 
                  class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  :class="item.avatarClass"
                >
                  {{ item.initials }}
                </div>
                <div>
                   <div class="text-sm font-medium text-[var(--color-text-1)]">{{ item.name }}</div>
                   <div class="text-xs text-[var(--color-text-3)]">{{ item.role }}</div>
                </div>
             </div>
             <div class="text-right">
                <div class="text-sm font-bold text-[var(--color-text-1)]">{{ item.amount }}</div>
                <div class="text-xs text-[var(--color-text-3)]">{{ item.hours }}</div>
             </div>
          </div>
       </div>
       
       <button class="w-full mt-4 py-2 text-xs text-[var(--color-primary-6)] font-medium hover:bg-[var(--color-primary-1)] rounded transition flex items-center justify-center">
          查看全部 78 人 <PhCaretRight class="ml-1" />
       </button>
    </div>

    <template #footer>
       <div class="flex justify-end gap-2">
          <a-button @click="store.closeDrawer">关闭</a-button>
          <a-button type="primary">导出明细</a-button>
       </div>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePayrollStore } from '@/stores/payroll'
import { PhCaretRight } from '@/components/icons'

const store = usePayrollStore()

const title = computed(() => {
    const name = store.drawerData?.name || ''
    const date = store.currentMonth
    let suffix = '明细'
    if (store.drawerType === 'ot_pay') suffix = '加班费明细'
    if (store.drawerType === 'severance') suffix = '离职补偿明细'
    return `${name} - ${suffix} (${date})`
})

const typeName = computed(() => {
    if (store.drawerType === 'ot_pay') return '加班费'
    if (store.drawerType === 'severance') return '离职补偿'
    return '薪酬'
})

const mockItems = [
    { initials: 'JS', name: 'Jason Smith', role: '高级工程师 (T9)', amount: '¥ 4,200.00', hours: '32h', avatarClass: 'bg-[var(--color-fill-3)] text-[var(--color-text-2)]' },
    { initials: 'AL', name: 'Alice Liu', role: '美术指导 (T10)', amount: '¥ 3,850.50', hours: '28h', avatarClass: 'bg-purple-100 text-purple-600' },
    { initials: 'WK', name: 'Wang Kai', role: '测试开发 (T8)', amount: '¥ 2,100.00', hours: '15h', avatarClass: 'bg-orange-100 text-orange-600' }
]
</script>
