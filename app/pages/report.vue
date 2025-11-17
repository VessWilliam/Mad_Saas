<script setup lang="ts">
import { computed, onMounted, ref, onBeforeUnmount } from 'vue'
import Linechart from '~/components/LineChart.vue'
import Columnchart from '~/components/ColumnChart.vue'
import Piechart from '~/components/PieChart.vue'
import { useGames } from '~/composables/useGames'
import { useAntd } from '~/composables/useAntd'

const { ACard, ARow, ACol } = useAntd()
const { games, getGames } = useGames()

const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)

onMounted(async () => {
  await getGames()

  const handleResize = () => {
    windowWidth.value = window.innerWidth
  }
  window.addEventListener('resize', handleResize)

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })
})

const pieData = computed(() => {
  const counts: Record<string, number> = {}
  games.value.forEach(g => {
    counts[g.status] = (counts[g.status] || 0) + 1
  })
  return Object.entries(counts).map(([status, value]) => ({ type: status, value }))
})

const pieConfig = computed(() => ({
  data: pieData.value,
  angleField: 'value',
  colorField: 'type',
  radius: 0.8,
  label: {
    type: 'outer',
    content: '{name} {percentage}'
  },
  legend: {
    position: windowWidth.value < 768 ? 'bottom' : 'right'
  }
}))

const columnData = computed(() =>
  games.value.map(g => ({ game: g.title, stock: g.stock }))
)

const columnConfig = computed(() => ({
  data: columnData.value,
  xField: 'game',
  yField: 'stock',
  label: {
    position: 'top',
    style: { fill: '#595959', opacity: 0.8 }
  },
  xAxis: {
    label: {
      autoRotate: true,
      autoHide: true,
      style: {
        fontSize: windowWidth.value < 768 ? 10 : 12
      }
    }
  }
}))

const lineData = computed(() =>
  games.value.map(g => ({ game: g.title, price: g.price }))
)

const lineConfig = computed(() => ({
  data: lineData.value,
  xField: 'game',
  yField: 'price',
  smooth: true,
  point: { size: 4, shape: 'circle' },
  xAxis: {
    label: {
      autoRotate: true,
      autoHide: true,
      style: {
        fontSize: windowWidth.value < 768 ? 10 : 12
      }
    }
  }
}))
</script>

<template>
  <div class="report-container">
    <h1 :style="{
      fontSize: windowWidth < 768 ? '20px' : '28px',
      marginBottom: '24px',
      marginTop: 0
    }">
      📊 Game Reports & Analytics
    </h1>

    <ARow :gutter="[16, 16]">
      <ACol :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <ACard title="Price per Game" :bordered="false">
          <Linechart :config="lineConfig" />
        </ACard>
      </ACol>

      <ACol :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <ACard title="Stock per Game" :bordered="false">
          <Columnchart :config="columnConfig" />
        </ACard>
      </ACol>
    </ARow>

    <ARow :gutter="[16, 16]" style="margin-top: 16px">
      <ACol :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <ACard title="Games by Status" :bordered="false">
          <Piechart :config="pieConfig" />
        </ACard>
      </ACol>
    </ARow>
  </div>
</template>

<style scoped src="~/styles/report.css"></style>