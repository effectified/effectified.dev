// What a site build adds beside its pages, from the releases it lists: `_redirects`, which sends `/<name>.tgz` to the
// tarball of each package's newest release (so the site and every README install "the latest" by one stable URL),
// the live demos of the frontend facades, unpacked from their releases under `/demos/<slug>/`, and `build.json`,
// what the build was made from.

import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";
import { FAMILIES, tarballUrl } from "../data/catalog";
import { piRelease, readFacadeDocs } from "../data/packages";

/** The integration: runs once the pages are built. */
export function releases(): AstroIntegration {
	return {
		name: "effectified-releases",
		hooks: {
			"astro:build:done": async ({ dir, logger }) => {
				const out = fileURLToPath(dir);
				const facades = readFacadeDocs();
				const pi = FAMILIES[0];
				const release = await piRelease();
				const lines = [
					...facades.map((facade) => `/${facade.slug}.tgz ${facade.install.release} 302`),
					...(pi === undefined
						? []
						: pi.packages
								.filter((pkg) => pkg.kind !== "docs" && pkg.private !== true)
								.map((pkg) => `/${pkg.name}.tgz ${tarballUrl({ ...pi, release }, pkg)} 302`)),
				];
				writeFileSync(join(out, "_redirects"), `${lines.join("\n")}\n`);
				// What this build shows, for the deploy workflow to compare with what is newest.
				writeFileSync(join(out, "build.json"), `${JSON.stringify({ sources: process.env["EFFECTIFIED_SOURCES"] ?? "local" })}\n`);
				logger.info(`_redirects: ${lines.length} packages to their newest release`);
				for (const facade of facades) {
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
