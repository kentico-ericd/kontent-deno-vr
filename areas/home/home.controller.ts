import {
  Controller,
  View,
  Get,
  QueryParam,
} from "https://deno.land/x/alosaur/mod.ts";
import getContentItems from "../../api/getContentItems.ts";

@Controller()
export class HomeController {
  properties = [];

  @Get()
  async text(@QueryParam("q") q: string) {
    if (this.properties.length === 0) {
      // data isn't cached- load from API
      const resp = await getContentItems("system.type=property");
      this.properties = resp.items.map((i: any) => {
        return {
          title: i.elements.title.value,
          price: i.elements.price.value.toFixed(2).replace(
            /\d(?=(\d{3})+\.)/g,
            "$&,",
          ),
          address:
            `${i.elements.street.value}, ${i.elements.city.value} ${i.elements.state.value} ${i.elements.zip.value}`,
          thumb: i.elements.thumbnail.value[0].url,
          description: i.elements.description.value,
          codename: i.system.codename,
        };
      });
    }
    let filtered;

    // if search string passed, filter property list
    if (q) {
      filtered = this.properties.filter((p: any) =>
        p.address.toLowerCase().includes(q.toLowerCase())
      );
    } else {
      filtered = this.properties;
    }

    return View("home/home", {
      title: "Kentico Estates",
      properties: filtered,
    });
  }
}
