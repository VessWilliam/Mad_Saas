<script setup lang="ts">
import { capitalize, ref } from 'vue'
import GameTable from '~/components/GameTable.vue'
import { useGames } from '~/composables/useGames'
import { useAntd } from '~/composables/useAntd'
import type { GameModel } from "~~/types/game_model";
import { useForm, Field } from 'vee-validate';
import { gameSchema } from '~/validations/gameSchema';
import { statusOptions } from '~/constants/statusOptions';

const { AModal, AForm, AFormItem, AInput, ANumberPicker, AButton, ASelect } = useAntd()
const { games, getGames, addGame, updateGame, deleteGame } = useGames()
const showModel = ref(false)
const editModel = ref<GameModel | null>(null)

onMounted(async () => await getGames())

const { handleSubmit, resetForm } = useForm<GameModel>({
  validationSchema: gameSchema,
  initialValues: {
    title: '',
    genre: '',
    platform: '',
    price: 0,
    stock: 0,
    status: 'Available',
  },
})

const openAdd = () => {
  editModel.value = null
  resetForm({
    values: {
      title: '',
      genre: '',
      platform: '',
      price: 0,
      stock: 0,
      status: 'Available',
    }
  })
  showModel.value = true
}

const openEdit = (game: GameModel) => {
  editModel.value = game
  resetForm({ values: { ...game } })
  showModel.value = true
}

const saveGame = handleSubmit(async (gameData) => {
  editModel.value ? await updateGame(editModel.value.id, gameData) :
    await addGame(gameData)
  await getGames()
  showModel.value = false
  resetForm()
})

const handleCancel = () => {
  showModel.value = false
  resetForm()
}
</script>

<template>
  <div>
    <div class="button-container">
      <AButton type="primary" style="margin-bottom:1px; " @click="openAdd">
        Add Game
      </AButton>
    </div>
    <GameTable :games="games" @edit="openEdit" @delete="deleteGame" />
    <AModal v-model:visible="showModel" title="Game Form" @ok="saveGame" @cancel="handleCancel">
      <AForm layout="vertical">
        <Field name="title" v-slot="{ value, handleChange, handleBlur, errorMessage }">
          <AFormItem label="Title" :help="errorMessage" :validate-status="errorMessage ? 'error' : ''">
            <AInput :value="value" @update:value="v => handleChange(capitalize(v))" @blur="handleBlur" />
          </AFormItem>
        </Field>

        <Field name="genre" v-slot="{ value, handleChange, handleBlur, errorMessage }">
          <AFormItem label="Genre" :help="errorMessage" :validate-status="errorMessage ? 'error' : ''">
            <AInput :value="value" @update:value="v => handleChange(capitalize(v))" @blur="handleBlur" />
          </AFormItem>
        </Field>

        <Field name="platform" v-slot="{ value, handleChange, handleBlur, errorMessage }">
          <AFormItem label="Platform" :help="errorMessage" :validate-status="errorMessage ? 'error' : ''">
            <AInput :value="value" @update:value="v => handleChange(capitalize(v))" @blur="handleBlur" />
          </AFormItem>
        </Field>

        <Field name="price" v-slot="{ value, handleChange, handleBlur, errorMessage }">
          <AFormItem label="Price" :help="errorMessage" :validate-status="errorMessage ? 'error' : ''">
            <ANumberPicker :value="value" @update:value="handleChange" @blur="handleBlur" :min="0" :step="1"
              style="width:100%" />
          </AFormItem>
        </Field>

        <Field name="stock" v-slot="{ value, handleChange, handleBlur, errorMessage }">
          <AFormItem label="Stock" :help="errorMessage" :validate-status="errorMessage ? 'error' : ''">
            <ANumberPicker :value="value" @update:value="handleChange" @blur="handleBlur" :min="0" :step="1"
              style="width:100%" />
          </AFormItem>
        </Field>

        <Field name="status" v-slot="{ value, handleChange, handleBlur, errorMessage }">
          <AFormItem label="Status" :help="errorMessage" :validate-status="errorMessage ? 'error' : ''">

            <ASelect :value="value" @update:value="handleChange" @blur="handleBlur" :options="statusOptions" />

          </AFormItem>
        </Field>
      </AForm>
    </AModal>
  </div>
</template>

<style scoped>
.button-container {
  padding: 0px;
  padding-left: 30px;
}
</style>