# Project Images Directory

Place your project photos and renders here!

## How to use:
1. Save your project images in this folder (e.g. `apex-residence-main.jpg`, `custom-villa-1.jpg`).
2. Open `/public/data/projects.json` (or `/src/data/projects.json`).
3. Set the `"imageUrl"` property to:
   ```json
   "imageUrl": "/images/projects/your-image-name.jpg"
   ```
4. You can also supply an array of additional gallery pictures in `"additionalImages"`:
   ```json
   "additionalImages": [
     "/images/projects/interior-view.jpg",
     "/images/projects/aerial-scan.jpg"
   ]
   ```
5. You can also use direct web/CDN URLs (e.g., `https://images.unsplash.com/...`).
