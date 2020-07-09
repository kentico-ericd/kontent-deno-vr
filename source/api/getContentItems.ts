import ky from "https://unpkg.com/ky/index.js";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const getContentItems = async (querystring: string = "") => {
  const pid = config().PROJECT_ID;
  const url = `https://deliver.kontent.ai/${pid}/items?${querystring}`;

  return await ky.get(url).json();
};

export default getContentItems;
