# CIRQON Pave – Batch Traceability

A small, static prototype for showing sample batch-level traceability data for CIRQON Pave. The public site uses plain HTML and CSS only. It has no framework, client-side JavaScript, build step, or website runtime dependencies.

All batch figures are sample or estimated data for a school competition pitch. Nothing on the site is presented as verified or certified.

## Deploy on Vercel

### Option 1: drag and drop

1. Keep the folder structure exactly as provided.
2. Go to the Vercel dashboard and create a new project using the drag-and-drop option.
3. Drop this project folder into Vercel.
4. Do not add a build command. The output directory is the project root (`.`), as set in `vercel.json`.
5. Deploy, then open the generated `https://your-project.vercel.app` URL.
6. Test `/batch/cq-044` on a phone before printing any QR code.

### Option 2: GitHub import

1. Create a GitHub repository and push every file in this folder.
2. In Vercel, select **Add New → Project** and import that repository.
3. Choose **Other** if Vercel asks for a framework preset.
4. Leave the build command empty and use `.` as the output directory.
5. Deploy and note the final Vercel URL.

Vercel uses `cleanUrls` so `/batch/cq-044.html` is available as `/batch/cq-044`, without a trailing slash.

## Add a new batch

1. Copy one existing file in `batch/`, for example `batch/cq-046.html`.
2. Rename the copy to the new lowercase batch ID, for example `batch/cq-047.html`.
3. Edit the page title, meta description, batch ID, production date, three sample values, and local-source sample text.
4. Keep the prototype notice and the exact estimated-CO2 disclaimer.
5. Add a matching batch link to the list in `index.html`.
6. Add the new lowercase ID to the `batches` array in `tools/make-qr.mjs`.

## Generate QR codes

The optional QR tool is separate from the public website. It uses Node.js and the `qrcode` package only when generating PNG files locally.

1. Deploy the site first so you know its final URL.
2. From the project root, install the tooling dependency:

   ```sh
   cd tools
   npm install
   cd ..
   ```

3. Generate one PNG per batch, replacing the example with the deployed URL:

   ```sh
   node tools/make-qr.mjs https://your-project.vercel.app
   ```

4. Find the generated files in `qr/`: `cq-044.png`, `cq-045.png`, and `cq-046.png`.
5. Scan every PNG with a phone before printing it. Each code points to `BASE_URL/batch/<id>`.

Do not generate final QR codes with a temporary preview URL if the printed tiles will use a different production domain.
