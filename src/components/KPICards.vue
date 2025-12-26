<template>
  <section class="grid grid-cols-4 gap-4 mb-6 shrink-0">
    <!-- TODO: 临时注释 KPI Cards -->
    <!--
    <a-card :bordered="false" class="shadow-sm hover:shadow-md transition-all duration-200 group relative overflow-hidden">
      <div class="text-[var(--color-text-3)] text-xs mb-2">发薪总人数</div>
      <div class="text-2xl font-semibold text-[var(--color-text-1)] mb-2 font-['DIN_Alternate','Inter',sans-serif]">
        {{ formatNumber(s.people.val) }}
      </div>
      <div class="flex items-center text-xs">
        <span 
          class="px-2 py-0.5 rounded-sm mr-2 flex items-center"
          :class="getTrendBg(s.people.chg)"
        >
          <component :is="getTrendIcon(s.people.chg)" class="mr-1" />
          {{ Math.abs(getPct(s.people.val, s.people.chg)).toFixed(1) }}%
        </span>
        <span class="text-[var(--color-text-3)]">较上月</span>
      </div>
      <div class="absolute right-4 top-4 p-2 bg-blue-50 rounded-full text-blue-600 opacity-60 group-hover:opacity-100 transition">
        <PhUsers :size="24" />
      </div>
    </a-card>

    <a-card :bordered="false" class="shadow-sm hover:shadow-md transition-all duration-200 group relative overflow-hidden">
      <div class="text-[var(--color-text-3)] text-xs mb-2">本月发薪总额 (万元)</div>
      <div class="text-2xl font-semibold text-[var(--color-text-1)] mb-2 font-['DIN_Alternate','Inter',sans-serif]">
        {{ formatCurrency(s.total.val) }}
      </div>
      <div class="flex items-center text-xs">
        <span 
          class="px-2 py-0.5 rounded-sm mr-2 flex items-center"
          :class="getTrendBg(s.total.chg)"
        >
          <component :is="getTrendIcon(s.total.chg)" class="mr-1" />
          {{ Math.abs(getPct(s.total.val, s.total.chg)).toFixed(1) }}%
        </span>
        <span class="text-[var(--color-text-3)]">较上月</span>
      </div>
      <div class="absolute right-4 top-4 p-2 bg-yellow-50 rounded-full text-yellow-600 opacity-60 group-hover:opacity-100 transition">
        <PhCoins :size="24" />
      </div>
    </a-card>

    <a-card 
      :bordered="false" 
      class="shadow-sm hover:shadow-md transition-all duration-200 group relative overflow-hidden"
      style="background: linear-gradient(135deg, #fff 0%, #fff7f7 100%); border: 1px solid #ffece8;"
    >
      <div class="flex justify-between items-start mb-2">
        <div class="text-[var(--color-danger-6)] text-xs">加班费异常监控</div>
        <PhWarningCircle class="text-[var(--color-danger-6)] animate-pulse" :size="16" weight="fill" />
      </div>
      <div class="text-2xl font-semibold text-[var(--color-text-1)] mb-2 font-['DIN_Alternate','Inter',sans-serif]">
        {{ formatCurrency(s.ot_pay.val) }} <span class="text-sm font-normal text-[var(--color-text-3)]">万元</span>
      </div>
      <div class="flex items-center text-xs">
        <span 
          class="px-2 py-0.5 rounded-sm mr-2 flex items-center"
          :class="getTrendBg(s.ot_pay.chg)"
        >
          <component :is="getTrendIcon(s.ot_pay.chg)" class="mr-1" />
          {{ Math.abs(getPct(s.ot_pay.val, s.ot_pay.chg)).toFixed(1) }}%
        </span>
        <span class="text-[var(--color-text-3)]">较上月</span>
      </div>
    </a-card>

    <a-card :bordered="false" class="shadow-sm hover:shadow-md transition-all duration-200 group relative overflow-hidden">
      <div class="text-[var(--color-text-3)] text-xs mb-2">离职补偿金 (万元)</div>
      <div class="text-2xl font-semibold text-[var(--color-text-1)] mb-2 font-['DIN_Alternate','Inter',sans-serif]">
        {{ formatCurrency(s.severance.val) }}
      </div>
      <div class="text-xs text-[var(--color-text-3)] mt-2">
        涉及 <span class="font-bold text-[var(--color-text-2)]">{{ s.severance.people }}</span> 人
      </div>
      <div class="absolute right-4 top-4 p-2 bg-gray-50 rounded-full text-gray-500 opacity-60 group-hover:opacity-100 transition">
        <PhSignOut :size="24" />
      </div>
    </a-card>
    -->
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePayrollStore } from '@/stores/payroll'
import { formatNumber, formatCurrency, getPct } from '@/utils/format'
import { PhUsers, PhCoins, PhWarningCircle, PhSignOut, PhArrowDownRight, PhArrowUpRight } from '@/components/icons'

const store = usePayrollStore()
const s = computed(() => store.dashboardSummary)

function getTrendIcon(chg: number) {
  return chg >= 0 ? PhArrowUpRight : PhArrowDownRight
}

function getTrendBg(chg: number) {
   if (chg > 0) return 'tag-red'
   if (chg < 0) return 'tag-green'
   return 'tag-gray'
}
</script>

<style scoped>
.tag-green {
  background-color: var(--color-success-1);
  color: var(--color-success-6);
}

.tag-red {
  background-color: var(--color-danger-1);
  color: var(--color-danger-6);
}

.tag-gray {
  background-color: var(--color-fill-2);
  color: var(--color-text-3);
}
</style>
