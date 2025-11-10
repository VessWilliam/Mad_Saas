import type { GameModel } from "~~/types/game_model";
import {
  readGamefile,
  writeGamefile,
} from "~~/server/utils/filehelper";

export default defineEventHandler(async (event) => {
  const res = await readBody<Partial<GameModel>>(event);
  const id = Number(event.context.params?.id);
  const games = await readGamefile();

  const index = games.findIndex((g) => g.id === id);
  if (index === -1)
    throw createError({ statusCode: 404, message: "Game not found" });

  games[index] = { ...games[index], ...res };

  await writeGamefile(games);
  return games[index];
});
