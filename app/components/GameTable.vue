<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAntd } from '~/composables/useAntd';
import { gameColumns } from '~/constants/gameColumns';
import { useDevice } from '~/composables/useDevice';
import type { GameModel } from "~/types/game_model";

const { ATable, AButton } = useAntd()
const { isMobile } = useDevice()
const PAGE_SIZE = 5
const currentPage = ref(1)

const props = defineProps<{
  games: GameModel[]
}>()

const emit = defineEmits<{
  edit: [game: GameModel];
  delete: [id: number]
}>();

const totalPage = computed(() => Math.ceil(props.games.length / PAGE_SIZE))

const pagedGames = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return props.games.slice(start, start + PAGE_SIZE)
})

const handleEdit = (game: GameModel) => emit('edit', game)
const handleDelete = (id: number) => emit('delete', id)
const nextPage = () => currentPage.value < totalPage.value && currentPage.value++
const prevPage = () => currentPage.value > 1 && currentPage.value--
</script>


<template>
  <ATable v-if="!isMobile" :data-source="props.games" :columns="gameColumns(emit)" />

  <template v-if="isMobile">

    <section class="cards-container">
      <article v-for="game in pagedGames" :key="game.id" class="card">
        <header class="card-content">
          <p><strong>Name:</strong> {{ game.title }}</p>
          <p><strong>Genre:</strong> {{ game.genre }}</p>
          <p><strong>Price:</strong> {{ `$${game.price.toFixed(2)}` }}</p>
          <p><strong>Status:</strong> {{ game.status }}</p>

          <footer class="card-actions">
            <AButton type="primary" size="small" @click="handleEdit(game)">Edit</AButton>
            <AButton type="primary" size="small" danger @click="handleDelete(game.id)">Delete</AButton>
          </footer>
        </header>

      </article>
    </section>
  </template>
  <footer v-if="isMobile" class="pagination">
    <AButton size="small" :disabled="currentPage === 1" @click="prevPage">Prev</AButton>
    <span>{{ currentPage }} / {{ totalPage }}</span>
    <AButton size="small" :disabled="currentPage === totalPage" @click="nextPage">Next</AButton>
  </footer>

</template>

<style scoped src="~/styles/mobileTable.css"></style>