// effectified.dev: a static Astro build, served by Cloudflare Workers as static assets (wrangler.jsonc).
import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://effectified.dev",
	output: "static",
	trailingSlash: "never",
	build: { format: "file" },
});
