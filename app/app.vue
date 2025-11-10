<script setup lang="ts">
import { useAntd } from '~/composables/useAntd';
const { AConfigProvider, ATheme } = useAntd()
</script>


<template>
  <AConfigProvider :theme="{algorithm: ATheme.darkAlgorithm}">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </AConfigProvider>
</template>