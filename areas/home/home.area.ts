import { Area } from 'https://deno.land/x/alosaur/src/mod.ts';
import { HomeController } from './home.controller.ts';

@Area({
    baseRoute: '/',
    controllers: [HomeController],
})

export class HomeArea {}