import { Controller, View, Get, Param, QueryParam } from 'https://deno.land/x/alosaur/src/mod.ts';

@Controller()
export class TourController {
    @Get('/:itemCodeName')
    async text(
        @Param('itemCodeName') itemCodeName: string,
        @QueryParam('fileName') fileName: string) {
        return View('tour/tour', {
            title: '',
            path: `${itemCodeName}/${fileName}`
        });
    }
}