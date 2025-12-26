<template>
  <MainLayout>
    <!-- KPI Cards -->
    <KPICards />

    <!-- Toolbar -->
    <DashboardToolbar />

    <!-- Table -->
    <PayrollTable />

    <!-- Drawer -->
    <DetailDrawer />
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import KPICards from '@/components/KPICards.vue'
import DashboardToolbar from '@/components/DashboardToolbar.vue'
import PayrollTable from '@/components/PayrollTable.vue'
import DetailDrawer from '@/components/DetailDrawer.vue'
</script>
