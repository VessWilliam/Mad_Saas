import type { GameModel } from "@/types/game_model";
import {
  readGamefile,
  writeGamefile,
  generateNewId,
} from "../../utils/filehelper";
import { readBody } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody<Omit<GameModel, "id">>(event);

  const games = await readGamefile();

  const newId = generateNewId(games);

  const newGame: GameModel = { ...body, id: newId };

  games.push(newGame);
  await writeGamefile(games);

  return newGame;
});
