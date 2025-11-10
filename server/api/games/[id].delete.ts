import { readGamefile, writeGamefile } from "~~/server/utils/filehelper";

export default defineCachedEventHandler(async (event) => {
  const id = Number(event.context.params?.id);
  let games = await readGamefile();

  const index = games.findIndex((g) => g.id === id);
  if (index === -1)
    throw createError({ statusCode: 404, message: "Game not found" });

  games.splice(index, 1);
  await writeGamefile(games);

  return { success: true, message: `Game with id ${id} deleted` };
});
