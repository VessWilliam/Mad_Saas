<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useAntd } from '~/composables/useAntd'
import { gameColumns } from '~/constants/gameColumns'
import type { GameModel } from '~/types/game_model'

const { ATable, AButton } = useAntd()

const props = defineProps<{
  games: GameModel[]
}>()


const emit = defineEmits<{
  edit: [game: GameModel]
  delete: [id: number]
}>()

const PAGE_SIZE = 5
const MOBILE_BREAKPOINT = 768

const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)
const windowHeight = ref(typeof window !== 'undefined' ? window.innerHeight : 800)
const currentPage = ref(1)

const isMobile = computed(() => windowWidth.value < MOBILE_BREAKPOINT)

const totalPages = computed(() => Math.ceil(props.games.length / PAGE_SIZE))

const pagedGames = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return props.games.slice(start, start + PAGE_SIZE)
})

const nextPage = () => (currentPage.value < totalPages.value) && currentPage.value++

const prevPage = () => (currentPage.value > 1) && currentPage.value--

const handleEdit = (game: GameModel) => emit('edit', game)
const handleDelete = (id: number) => emit('delete', id)

onMounted(() => {
  const handleResize = () => {
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
  }

  window.addEventListener('resize', handleResize)

  onBeforeUnmount(() => window.removeEventListener('resize', handleResize))
})


</script>

<template>
  <div class="table-container">
    <div v-if="isMobile" class="cards-container">
      <div v-for="game in pagedGames" :key="game.id" class="card">
        <div class="card-content">
          <p class="card-field">
            <strong>Name:</strong>
            <span>{{ game.title }}</span>
          </p>
          <p class="card-field">
            <strong>Genre:</strong>
            <span>{{ game.genre }}</span>
          </p>
          <p class="card-field">
            <strong>Price:</strong>
            <span>${{ game.price }}</span>
          </p>
        </div>

        <div class="card-actions">
          <AButton type="primary" size="small" @click="handleEdit(game)">
            Edit
          </AButton>
          <AButton type="default" size="small" danger @click="handleDelete(game.id)">
            Delete
          </AButton>
        </div>
      </div>

      <div class="pagination">
        <AButton size="small" :disabled="currentPage === 1" @click="prevPage">
          Prev
        </AButton>
        <span class="pagination-info">
          {{ currentPage }} / {{ totalPages }}
        </span>
        <AButton size="small" :disabled="currentPage === totalPages" @click="nextPage">
          Next
        </AButton>
      </div>
    </div>


    <ATable v-else :columns="gameColumns(emit)" :data-source="props.games" row-key="id" />
  </div>
</template>

<style scoped>
.table-container {
  padding: 24px;
  padding-bottom: 0;
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
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-field {
  margin: 0;
  display: flex;
  gap: 8px;
}

.card-field strong {
  min-width: 60px;
}

.card-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  padding: 12px 0;
}

.pagination-info {
  font-weight: 500;
  min-width: 60px;
  text-align: center;
}

@media (max-width: 768px) {
  .table-container {
    padding: 16px;
    padding-bottom: 60px;
  }
}
</style>