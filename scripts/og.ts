// Renders brand/og.html to public/og.png (1200x630) with headless Chrome. CHROME_BIN overrides the macOS default.
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const chrome = process.env["CHROME_BIN"] ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const source = new URL("../brand/og.html", import.meta.url).href;
const target = fileURLToPath(new URL("../public/og.png", import.meta.url));

execFileSync(chrome, [
	"--headless=new",
	"--disable-gpu",
	"--hide-scrollbars",
	"--allow-file-access-from-files",
	"--virtual-time-budget=2000",
	"--window-size=1200,630",
	`--screenshot=${target}`,
	source,
]);
console.log(`wrote ${target}`);
