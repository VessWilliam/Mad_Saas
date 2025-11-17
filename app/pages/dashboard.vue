<script setup lang="ts">
import { ref, onMounted } from "vue";
import { capitalize } from "vue";
import GameTable from "~/components/GameTable.vue";
import { useGames } from "~/composables/useGames";
import { useAntd } from "~/composables/useAntd";
import { useForm, Field } from "vee-validate";
import { gameSchema } from "~/validations/gameSchema";
import { statusOptions } from "~/constants/statusOptions";
import type { GameModel } from "~/types/game_model";

const { AModal, AForm, AFormItem, AInput, ANumberPicker, AButton, ASelect } =
  useAntd();
const { games, getGames, addGame, updateGame, deleteGame } = useGames();

const showModal = ref(false);
const editModel = ref<GameModel | null>(null);
const isEditMode = ref(false);

const initialValues: Partial<GameModel> = {
  title: "",
  genre: "",
  platform: "",
  price: 0,
  stock: 0,
  status: "Available",
};

onMounted(getGames);

const { handleSubmit, resetForm } = useForm<Partial<GameModel>>({
  validationSchema: gameSchema,
  initialValues,
});

const openAddModal = () => {
  editModel.value = null;
  isEditMode.value = false;
  resetForm({ values: initialValues });
  showModal.value = true;
};

const openEditModal = (game: GameModel) => {
  editModel.value = game;
  isEditMode.value = true;
  resetForm({ values: { ...game } });
  showModal.value = true;
};

const saveGame = handleSubmit(async (gameData) => {
  editModel.value
    ? await updateGame(editModel.value.id, gameData)
    : await addGame(gameData);
  await getGames();
  showModal.value = false;
  resetForm();
});

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const formFields = Object.keys(gameSchema.fields).filter(
  (f) => f !== "id"
) as (keyof GameModel)[];


const getFieldOptions = (field: keyof GameModel) =>
  field === "status" ? statusOptions : undefined;

const formatFieldLabel = (field: keyof GameModel) =>
  field.charAt(0).toUpperCase() + field.slice(1);

const handleFieldChange = (type: string, val: any, handleChange: Function) => {
  switch (type) {
    case "input":
      handleChange(capitalize(val));
      break;
    case "number":
      handleChange(Number(val));
      break;
    default:
      handleChange(val);
      break;
  }
};

const getFieldType = (field: keyof GameModel) => {
  switch (field) {
    case "price":
    case "stock":
      return "number";
    case "status":
      return "select";
    default:
      return "input";
  }
};
</script>

<template>
  <div class="game-management">

    <AButton class="mb-3" type="primary" @click="openAddModal">
      Add Game
    </AButton>

    <GameTable :games="games" @edit="openEditModal" @delete="deleteGame" />

    <AModal v-model:open="showModal" :title="isEditMode ? 'Edit Game' : 'Add Game'" @ok="saveGame" @cancel="closeModal">
      <AForm layout="vertical">
        <Field v-for="field in formFields" :key="field" :name="field"
          v-slot="{ value, handleChange, handleBlur, errorMessage }">
          <AFormItem :label="formatFieldLabel(field)" :help="errorMessage"
            :validate-status="errorMessage ? 'error' : ''">

            <ASelect v-if="getFieldType(field) === 'select'" :value="value" :options="getFieldOptions(field)"
              @update:value="handleChange" @blur="handleBlur" />

            <ANumberPicker v-else-if="getFieldType(field) === 'number'" :value="value ?? 0" :min="0" :step="1"
              style="width: 100%" @update:value="handleChange" @blur="handleBlur" />

            <AInput v-else :value="value" @update:value="val => handleChange(val)" @blur="handleBlur" />
          </AFormItem>
        </Field>
      </AForm>
    </AModal>
  </div>
</template>

<style scoped>
.button-container {
  padding-left: 30px;
  margin-bottom: 10px;
}
</style>
