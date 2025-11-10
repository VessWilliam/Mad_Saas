<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Column } from '@antv/g2plot';


const props = defineProps<{ config: any }>()
const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: Column | null = null


onMounted(() => {
    if (chartRef.value == null || props.config == null) return;
    chartInstance = new Column(chartRef.value, props.config);
    chartInstance.render()

})

watch(() => props.config, (newVal) => {
    if (chartInstance) chartInstance.update(newVal)
}, { deep: true })
</script>


<template>
    <div ref="chartRef" style="height: 300px;"></div>
</template>