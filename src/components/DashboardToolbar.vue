<template>
  <div class="flex justify-end items-center mb-4 shrink-0 px-6">
    <!-- Left: Tree Controls -->
    <div class="flex items-center gap-3 mr-auto">
      <a-button 
        @click="store.expandAll" 
        :disabled="store.isAllExpanded"
        class="group flex items-center justify-center !px-3 transition-all duration-300 hover:!text-[var(--color-primary-6)] hover:!border-[var(--color-primary-5)] active:scale-95"
      >
        <span>展开</span>
      </a-button>
      
      <a-button 
        @click="store.collapseAll" 
        :disabled="store.isAllCollapsed"
        class="group flex items-center justify-center !px-3 transition-all duration-300 hover:!text-[var(--color-primary-6)] hover:!border-[var(--color-primary-5)] active:scale-95"
      >
        <span>收起</span>
      </a-button>
    </div>

    <!-- Right: Controls -->
    <div class="flex items-center gap-4">
      <!-- View Mode Switch -->
      <div class="bg-[var(--color-fill-2)] p-1 rounded-[var(--radius-small)] flex text-xs font-medium">
        <button 
          @click="store.setViewMode('summary')"
          :class="[
            'px-3 py-1.5 rounded-[var(--radius-small)] transition-all',
            store.viewMode === 'summary' 
              ? 'shadow-sm bg-white text-[var(--color-primary-6)] font-medium' 
              : 'text-[var(--color-text-3)] hover:text-[var(--color-text-1)]'
          ]"
        >汇总视图</button>
        <button 
          @click="store.setViewMode('detail')"
          :class="[
            'px-3 py-1.5 rounded-[var(--radius-small)] transition-all',
            store.viewMode === 'detail' 
              ? 'shadow-sm bg-white text-[var(--color-primary-6)] font-medium' 
              : 'text-[var(--color-text-3)] hover:text-[var(--color-text-1)]'
          ]"
        >明细视图</button>
      </div>

      <div class="w-px h-4 bg-[var(--color-border-2)]"></div>

      <!-- Comparison Toggle -->
      <label class="flex items-center cursor-pointer select-none">
        <a-switch v-model:checked="store.showComparison" size="small" />
        <div class="ml-2 text-sm text-[var(--color-text-2)] font-medium">显示环比</div>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePayrollStore } from '@/stores/payroll'
import { PhMagnifyingGlass } from '@/components/icons'

const store = usePayrollStore()
</script>
