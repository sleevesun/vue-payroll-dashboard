<template>
  <header class="flex justify-between items-center mb-6 shrink-0 bg-white px-6 py-3 border-b border-[var(--color-border-2)] shadow-sm">
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-[var(--color-primary-6)] rounded flex items-center justify-center text-white font-bold text-lg">
          H
        </div>
        <h1 class="text-xl font-semibold text-[var(--color-text-1)]">薪酬透视驾驶舱</h1>
      </div>

      <div class="h-6 w-px bg-[var(--color-border-2)] mx-2"></div>

      <div class="flex items-center hover:bg-[var(--color-fill-2)] px-2 py-1 rounded cursor-pointer transition select-none group">
        <PhCaretLeft 
          class="text-[var(--color-text-3)] hover:text-[var(--color-primary-6)] cursor-pointer" 
          :size="16"
          @click="store.toggleMonth(-1)"
        />
        <span class="mx-3 font-medium text-[var(--color-text-1)] tabular-nums min-w-[80px] text-center">
          {{ formattedMonth }}
        </span>
        <PhCaretRight 
          class="text-[var(--color-text-3)] hover:text-[var(--color-primary-6)] cursor-pointer" 
          :size="16"
          @click="store.toggleMonth(1)"
        />
      </div>

      <a-tag color="blue">月报 v1.0</a-tag>
    </div>
    <div class="flex gap-3">
      <!-- TODO: 临时注释消息和导出按钮 -->
      <!--
      <a-button>
        <template #icon>
            <div class="flex items-center justify-center h-full">
                <PhBell :size="16"/>
            </div>
        </template>
        消息
      </a-button>
      <a-button type="primary">
        <template #icon>
            <div class="flex items-center justify-center h-full">
                <PhExport :size="16"/>
            </div>
        </template>
        导出报表
      </a-button>
      -->
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePayrollStore } from '@/stores/payroll'
import { PhCaretLeft, PhCaretRight, PhBell, PhExport } from '@/components/icons'

const store = usePayrollStore()

const formattedMonth = computed(() => {
  const [y, m] = store.currentMonth.split('-')
  return `${y}年 ${m}月`
})
</script>
