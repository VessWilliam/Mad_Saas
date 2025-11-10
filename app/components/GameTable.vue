<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useAntd } from '~/composables/useAntd'
import { gameColumns } from '~/constants/gameColumns'

const { ATable, AButton } = useAntd()

const props = defineProps<{
  games: any[]
}>()

const emit = defineEmits<{
  (e: 'edit', game: any): void
  (e: 'delete', id: number): void
}>()


const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)
const windowHeight = ref(typeof window !== 'undefined' ? window.innerHeight : 800)

const currentPage = ref(1)
const pageSize = 5 // number of cards per page
const totalPages = computed(() => Math.ceil(props.games.length / pageSize))
const pagedGames = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return props.games.slice(start, start + pageSize)
})

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}


const scroll = computed(() => ({
  x: windowWidth.value < 768 ? 800 : 'max-content',
  y: windowWidth.value < 768
    ? windowHeight.value - 200
    : windowHeight.value - 150
}))


const columns = computed(() => {
  const allColumns = gameColumns(emit)
  if (windowWidth.value < 768) {
    return allColumns.filter(c => ['title', 'genre', 'price'].includes(c.dataIndex as string))
  }
  return allColumns
})

onMounted(() => {
  const handleResize = () => {
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
  }
  window.addEventListener('resize', handleResize)

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })
})
</script>

<template>
  <div class="table-container">
    <div v-if="windowWidth < 768" class="cards-container">
      <div v-for="game in pagedGames" :key="game.id" class="card">
        <p><strong>Name:</strong> {{ game.title }}</p>
        <p><strong>Genre:</strong> {{ game.genre }}</p>
        <p><strong>Price:</strong> ${{ game.price }}</p>
        <div class="actions">
          <AButton type="primary" size="small" @click="() => emit('edit', game)">Edit</AButton>
          <AButton type="default" size="small" danger @click="() => emit('delete', game.id)">Delete</AButton>
        </div>
      </div>


      <div class="pagination">
        <AButton size="small" @click="prevPage" :disabled="currentPage === 1">Prev</AButton>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <AButton size="small" @click="nextPage" :disabled="currentPage === totalPages">Next</AButton>
      </div>
    </div>

    <ATable v-else :columns="columns" :data-source="props.games" row-key="id" />
  </div>
</template>

<style scoped>
.table-container {
  padding: 24px;
  padding-bottom: 0px;
}


.cards-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card {
  border: 1px solid #0e0d0d;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: transparent;
}

.card .actions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
}


@media (max-width: 768px) {
  .table-container {
    padding: 16px;
    padding-bottom: 60px;
  }
}
</style>
