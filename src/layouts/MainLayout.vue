<template>
  <div class="min-h-screen flex flex-col bg-[var(--color-bg-body)]">
    <DashboardHeader />
    <main class="flex-1 px-6 pb-6 flex flex-col overflow-hidden">
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
import DashboardHeader from '@/components/DashboardHeader.vue'
</script>
