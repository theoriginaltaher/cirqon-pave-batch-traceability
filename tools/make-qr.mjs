import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";

const batches = ["cq-044", "cq-045", "cq-046"];
const baseUrlArgument = process.argv[2];

if (!baseUrlArgument) {
  console.error("Usage: node tools/make-qr.mjs https://your-project.vercel.app");
  process.exit(1);
}

let baseUrl;
try {
  baseUrl = new URL(baseUrlArgument);
} catch {
  console.error("BASE_URL must be a valid absolute URL, for example https://your-project.vercel.app");
  process.exit(1);
}

if (!['http:', 'https:'].includes(baseUrl.protocol)) {
  console.error("BASE_URL must use http or https.");
  process.exit(1);
}

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const qrDirectory = path.resolve(scriptDirectory, "..", "qr");
await fs.mkdir(qrDirectory, { recursive: true });

for (const batch of batches) {
  const destinationUrl = new URL(`/batch/${batch}`, baseUrl).toString();
  const outputPath = path.join(qrDirectory, `${batch}.png`);

  await QRCode.toFile(outputPath, destinationUrl, {
    width: 900,
    margin: 3,
    errorCorrectionLevel: "H",
    color: { dark: "#0e3b2aff", light: "#ffffffff" }
  });

  console.log(`Created qr/${batch}.png -> ${destinationUrl}`);
}
