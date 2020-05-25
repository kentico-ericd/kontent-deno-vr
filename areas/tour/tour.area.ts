import { Area } from 'https://deno.land/x/alosaur/src/mod.ts';
import { TourController } from './tour.controller.ts';

@Area({
    baseRoute: '/tour',
    controllers: [TourController],
})

export class TourArea {}