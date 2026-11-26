/**
 * effectified.dev on Cloudflare Workers: the built site (`dist/`) as an assets-only Worker, deployed with
 * `cf deploy ./dist`. The custom domain makes Cloudflare create the DNS record and the certificate.
 */
import { defineConfig } from "cf/config";

export default defineConfig({
	worker: {
		name: "effectified-site",
		compatibilityDate: "2026-11-01",
		// Astro writes `/404.html` and pages without a trailing slash (`build.format: "file"`).
		assets: { htmlHandling: "drop-trailing-slash", notFoundHandling: "404-page" },
		domains: ["effectified.dev"],
		workersDev: false,
	},
});
