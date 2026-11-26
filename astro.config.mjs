// effectified.dev: a static Astro build, served by Cloudflare Workers as static assets (wrangler.jsonc). Its facade
// pages come from effectified/packages (src/content.config.ts); `releases` adds `_redirects` and the live demos.
import { defineConfig } from "astro/config";
import { releases } from "./src/integrations/releases.ts";

export default defineConfig({
	site: "https://effectified.dev",
	output: "static",
	trailingSlash: "never",
	build: { format: "file" },
	integrations: [releases()],
});
