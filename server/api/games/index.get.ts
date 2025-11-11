import { readGamefile } from "../../utils/filehelper";

export default defineEventHandler(async () => await readGamefile());
