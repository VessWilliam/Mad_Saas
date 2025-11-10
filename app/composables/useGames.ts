import { ref } from "vue";
import axios from "axios";
import type { GameModel } from "@/../types/game_model";

export const useGames = () => {
  const games = ref<GameModel[]>([]);
  const loading = ref(false);
  const error = ref(null);

  const getGames = async () => {
    try {
      loading.value = true;
      const res = await axios.get("/api/games");
      games.value = res.data;
    } catch (err) {
      err = error.value as any;
    } finally {
      loading.value = false;
    }
  };

  const addGame = async (game: Partial<GameModel>) => {
    const res = await axios.post("/api/games", game);
    games.value.push(res.data);
  };

  const updateGame = async (id: number, game: Partial<GameModel>) => {
    const res = await axios.put(`/api/games/${id}`, game);
    const index = games.value.findIndex((g) => g.id == id);
    if (index !== -1) games.value[index] = res.data;
  };

  const deleteGame = async (id: number) => {
    await axios.delete(`/api/games/${id}`);
    games.value = games.value.filter((g) => g.id !== id);
  };

  return { games, loading, error, getGames, updateGame, deleteGame, addGame };
};
