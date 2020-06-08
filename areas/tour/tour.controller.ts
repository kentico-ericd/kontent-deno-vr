import getContentItem from "../../api/getContentItem.ts";
import {
  Controller,
  View,
  Get,
  Param,
} from "https://deno.land/x/alosaur/mod.ts";
import downloadAsset from "../../api/downloadAsset.ts";
import { exists } from "https://deno.land/std/fs/exists.ts";

@Controller()
export class TourController {

  @Get("/:itemCodeName/:tourCodeName")
  async text(
    @Param("itemCodeName") itemCodeName: string,
    @Param("tourCodeName") tourCodeName: string,
  ) {
    const resp = await getContentItem(tourCodeName, 1);
    const fileName = resp.item.elements.panoramic_image.value[0].name;
    const infopoints = makeInfopoints(resp, itemCodeName);

    // Downlad asset locally
    await download(resp, itemCodeName);

    return View("tour/tour", {
      title: "",
      path: `${itemCodeName}/${fileName}`,
      infopoints: infopoints,
    });
  }
}

const download = async (response: any, itemCodeName: string) => {
  const path = `assets/tour/${itemCodeName}`;
  const file = `${path}/${response.item.elements.panoramic_image.value[0].name}`;
  if (!await exists(file)) {
    await downloadAsset(response.item.elements.panoramic_image.value[0].url, path, file);
  }
};

const makeInfopoints = (response: any, itemCodeName: string) => {
  const codenames = response.item.elements.infopoints.value;

  const modular = Object.values(response.modular_content);
  const infopoints = modular.filter((i: any) =>
    codenames.includes(i.system.codename)
  );
  return infopoints.map((i: any) => {
    return {
      name: i.system.name,
      codename: i.system.codename,
      description: i.elements.description.value,
      x: i.elements.x_position.value,
      y: i.elements.y_position.value,
      z: i.elements.z_position.value,
      transition: i.elements.leads_to ? `/tour/${itemCodeName}/${i.elements.leads_to.value[0]}` : ""
    };
  });
};
