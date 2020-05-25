import { Controller, View, Get, Param } from 'https://deno.land/x/alosaur/src/mod.ts';
import getContentItem from '../../api/getContentItem.ts';
import downloadAsset from '../../api/downloadAsset.ts';
import { exists } from 'https://deno.land/std/fs/exists.ts';

@Controller()
export class ListingController {
    @Get('/:codename')
    async text(@Param('codename') codename: string) {
        let resp = await getContentItem(codename);
        const path = `assets/tour/${codename}`;
        const file = `${path}/${resp.item.elements.tour.value[0].name}`;
        if(!await exists(file)) {
            await downloadAsset(resp.item.elements.tour.value[0].url, path, file);
        }
        
        return View('listing/listing', {
            thumb: file,
            itemCodeName: codename,
            fileName: resp.item.elements.tour.value[0].name,
            title: codename
        });
    }   
}
