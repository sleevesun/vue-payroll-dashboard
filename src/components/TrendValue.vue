<template>
  <div class="flex flex-col items-end justify-center leading-normal">
    <div 
      class="font-inherit"
      :class="[
        val === 0 ? 'text-gray-300' : (isClickable ? 'text-[var(--color-primary-6)] cursor-pointer hover:text-[var(--color-primary-5)] relative dashed-underline' : 'text-gray-800')
      ]"
      @click="handleClick"
    >
      {{ val === 0 ? '-' : (isCurrency ? formatCurrency(val) : formatNumber(val)) }}
    </div>
    
    <div v-if="showComparison && chg !== 0" class="flex items-center gap-1 mt-0.5 text-xs">
      <span :class="trendClass">
        {{ chg > 0 ? '+' : '' }}{{ chg.toFixed(2) }}
      </span>
      <span :class="trendClass" class="scale-90 opacity-80">
        ({{ chg > 0 ? '+' : '' }}{{ pct.toFixed(1) }}%)
      </span>
    </div>
    <div v-else-if="showComparison" class="text-[var(--color-text-4)] text-xs mt-0.5">-</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatCurrency, formatNumber } from '@/utils/format'

const props = defineProps<{
  val: number
  chg: number
  pct: number
  isCurrency?: boolean
  isClickable?: boolean
  showComparison?: boolean
}>()

const emit = defineEmits(['click'])

const trendClass = computed(() => {
  if (props.chg > 0) return 'text-[var(--color-danger-6)]'
  if (props.chg < 0) return 'text-[var(--color-success-6)]'
  return 'text-[var(--color-text-4)]'
})

function handleClick() {
  if (props.isClickable) {
    emit('click')
  }
}
</script>

<style scoped>
.dashed-underline::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--color-primary-5);
  opacity: 0.5;
  border-bottom: 1px dashed var(--color-primary-5);
}
</style>
