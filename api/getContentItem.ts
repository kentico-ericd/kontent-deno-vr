import ky from "https://unpkg.com/ky/index.js";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const getContentItem = async (codename: string, depth: number = 0) => {
  const pid = config().PROJECT_ID;
  const url =
    `https://deliver.kontent.ai/${pid}/items/${codename}?depth=${depth}`;

  return await ky.get(url).json();
};

export default getContentItem;
