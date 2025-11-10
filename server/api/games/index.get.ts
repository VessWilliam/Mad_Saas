import { readGamefile } from "~~/server/utils/filehelper";

export default defineEventHandler(async () => await readGamefile());
