import {
  Controller,
  View,
  Get,
  Param,
} from "https://deno.land/x/alosaur/mod.ts";
import getContentItem from "../../api/getContentItem.ts";

@Controller()
export class ListingController {
  @Get("/:codename")
  async text(@Param("codename") codename: string) {
    const resp = await getContentItem(codename, 1);
    const tours = await makeTours(resp);

    return View("listing/listing", {
      item: resp.item,
      title: codename,
      tours: tours,
    });
  }
}

const makeTours = async (response: any) => {
  let codenames = response.item.elements.tours.value;
  const modular = Object.values(response.modular_content);
  let tours = modular.filter((m: any) => codenames.includes(m.system.codename));
  tours = tours.map((m: any) => {
    return {
      name: m.system.name,
      codename: m.system.codename,
      credit: m.elements.credit.value,
      url: m.elements.panoramic_image.value[0].url,
      file: m.elements.panoramic_image.value[0].name,
    };
  });

  return tours;
};
