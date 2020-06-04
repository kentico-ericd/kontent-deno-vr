import { Area } from "https://deno.land/x/alosaur/mod.ts";
import { TourController } from "./tour.controller.ts";

@Area({
  baseRoute: "/tour",
  controllers: [TourController],
})
export class TourArea {}
