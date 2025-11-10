import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import type { GameModel } from "~~/types/game_model";

const filePath = resolve("./mock/mock-data.json");

export const readGamefile = async (): Promise<GameModel[]> => {
  const data = await readFile(filePath, "utf-8");
  return JSON.parse(data) as GameModel[];
};

export const writeGamefile = async (games: GameModel[]): Promise<void> =>
  await writeFile(filePath, JSON.stringify(games, null, 2), "utf-8");

export const generateNewId = (games: GameModel[]): number =>
  Math.max(...games.map((g) => g.id), 0) + 1;
