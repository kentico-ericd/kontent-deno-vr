import { Controller, View, Get } from 'https://deno.land/x/alosaur/src/mod.ts';
import getContentItems from '../../api/getContentItems.ts';

@Controller()
export class HomeController {
    @Get()
    async text() {
        const resp = await getContentItems('system.type=property');

        return View('home/home', {
            title: 'Welcome to your new home smiley face',
            properties: resp.items
        });
    }
}