// effectified.dev: a static Astro build, served by Cloudflare Workers as static assets (wrangler.jsonc). Its facade
// pages come from effectified/packages (src/content.config.ts); `demos` adds the live demos.
import { defineConfig } from "astro/config";
import { demos } from "./src/integrations/demos.ts";

export default defineConfig({
	site: "https://effectified.dev",
	output: "static",
	trailingSlash: "never",
	build: { format: "file" },
	integrations: [demos()],
});
