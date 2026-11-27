// What a site build adds beside its pages: the live demos of the frontend facades, unpacked from their GitHub releases
// (`<slug>-v<version>`, as each facade's docs.json names it) under `/demos/<slug>/`.

import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";
import { readFacadeDocs } from "../data/packages";

/** The integration: runs once the pages are built. */
export function demos(): AstroIntegration {
	return {
		name: "effectified-demos",
		hooks: {
			"astro:build:done": async ({ dir, logger }) => {
				const out = fileURLToPath(dir);
				for (const facade of readFacadeDocs()) {
					if (facade.demo === undefined) continue;
					const unpacked = await unpackDemo(facade.demo.url, join(out, "demos", facade.slug));
					if (unpacked) logger.info(`demo of ${facade.name}: ${facade.demo.pages.join(", ")}`);
					else logger.warn(`demo of ${facade.name}: ${facade.demo.url} is not released yet; its page runs without it`);
				}
			},
		},
	};
}

/** Downloads a demo tarball and unpacks it into `into`; false when the release has none yet. */
async function unpackDemo(url: string, into: string): Promise<boolean> {
	const response = await fetch(url);
	if (!response.ok) return false;
	const scratch = mkdtempSync(join(tmpdir(), "effectified-demo-"));
	try {
		const archive = join(scratch, "demo.tgz");
		writeFileSync(archive, Buffer.from(await response.arrayBuffer()));
		mkdirSync(into, { recursive: true });
		execFileSync("tar", ["-xzf", archive, "-C", into]);
		return true;
	} finally {
		rmSync(scratch, { recursive: true, force: true });
	}
}
