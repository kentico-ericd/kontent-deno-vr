import { renderFile } from "https://deno.land/x/dejs/mod.ts";
import { normalize } from "https://deno.land/x/alosaur/src/deps.ts";
import { HomeArea } from "./areas/home/home.area.ts";
import { TourArea } from "./areas/tour/tour.area.ts";
import { ListingArea } from "./areas/listing/listing.area.ts";
import { App, ViewRenderConfig } from "https://deno.land/x/alosaur/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const appSettings = {
  areas: [HomeArea, ListingArea, TourArea],
  logging: false,
};

const app = new App(appSettings);
app.useStatic({
  root: `${Deno.cwd()}/assets`,
  baseRoute: "/assets/",
});
app.useViewRender({
  type: "dejs",
  basePath: `${Deno.cwd()}/views/`,
  getBody: (path: string, model: Object, config: ViewRenderConfig) =>
    renderFile(normalize(`${config.basePath}${path}.ejs`), model),
});

const DEFAULT_PORT = ":8000";
const envPort = config().PORT;
const port = envPort ? String(envPort) : DEFAULT_PORT; 

app.listen(port);
