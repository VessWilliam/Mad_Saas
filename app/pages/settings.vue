<script setup lang="ts">
import { useAntd } from '~/composables/useAntd'
const { ACard } = useAntd()
</script>

<template>
  <div class="setting-container">
    <h1 style="color: white;">⚙️ Settings</h1>
    <ACard title="System Information" :bordered="false" style="margin-top: 16px;">
      <p>This is your settings page (dark mode enabled by default).</p>
    </ACard>
  </div>
</template>

<style scoped>
.setting-container {
  padding: 15px;
  padding-left: 25px;
}
</style>