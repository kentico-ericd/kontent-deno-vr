import ky from "https://unpkg.com/ky/index.js";
import { ensureDir } from "https://deno.land/std/fs/ensure_dir.ts";

const downloadAsset = async (url: string, dir: string, filePath: string) => {
  await ensureDir(dir);

  const b = await ky.get(url).blob();
  const f = await Deno.open(
    filePath,
    { write: true, read: true, create: true },
  );

  const buf = await b.arrayBuffer();
  const ar = new Uint8Array(buf);

  await Deno.writeAll(f, ar);
  Deno.close(f.rid);
};

export default downloadAsset;
