import { Area } from 'https://deno.land/x/alosaur/src/mod.ts';
import { ListingController } from './listing.controller.ts';

@Area({
    baseRoute: '/listing',
    controllers: [ListingController],
})

export class ListingArea {}