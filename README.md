## Deno VR sample project

### Installation

1. [Install Deno](https://deno.land/#installation) and clone this repo.
2. Create a new blank project in Kontent, then [download the template](https://github.com/kentico-ericd/kontent-deno-vr/raw/master/kontent-deno-vr-template.zip).
3. Import the template via [Kontent Template Manager](https://kentico.github.io/kontent-template-manager/import) using the __Project ID__ and __Management API Key__ found in Project Settings > API Keys.
4. After importing, ensure that all content items in the project are Published
5. Connect the application to your project by creating a `.env` file and adding your __Project ID__:   
`PROJECT_ID=79ef36c6-e9aa-0100-8ead-3ec7363e98d6`
6. Run the project by entering the following command from the /source directory 
`deno run --allow-net --allow-write --allow-read --allow-env --config ./tsconfig.json alosaur.ts`
7. You can now access the site at `localhost:8000`.

### Website features

This repo illustrates a basic real estate website built on Deno and uses pure REST (via [ky](https://deno.land/x/ky)) to obtain data from Kontent. All content items are loaded into memory on the first request, and can be filtered using a search bar in the header.

There is also a VR implementation using equirectangular images, [three.js](https://threejs.org/), and [panolens.js](https://pchen66.github.io/Panolens/). When viewing a property on the site, you can click on a Tour to open a panoramic 360&deg; image.

![vr](/source/vr.jpg)

The image can be viewed on a computer by dragging the mouse, but also supports viewing on mobile devices supporting stereoscopic images such as Google Cardboard.

Each Tour can also have any number of Infopoints, which are three-dimensional Points of Interest superimposed on the image. They can contain text, images, and links which highlight important parts of the property.

![Analytics](https://kentico-ga-beacon.azurewebsites.net/api/UA-69014260-4/kentico-ericd/kontent-deno-vr?pixel)