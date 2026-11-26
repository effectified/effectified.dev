// The catalog: every effectified family and package. Every count on the site is computed from this file.

/** What a package is, as pi-effect's `piEffect.kind` says it. */
export type Kind = "facade" | "plugin" | "host" | "composition" | "docs";

/** One package of a family. */
export interface Package {
	readonly name: string;
	readonly kind: Kind;
	/** The upstream packages it wraps or builds on, with the pinned version. */
	readonly wraps: ReadonlyArray<string>;
	readonly summary: string;
}

/** One upstream project and the packages that make it Effect-native. */
export interface Family {
	readonly id: string;
	readonly title: string;
	readonly upstream: { readonly name: string; readonly url: string; readonly version: string };
	readonly repo: string;
	/** The npm scope of the family's packages. */
	readonly scope: string;
	readonly status: "alpha";
	/** The GitHub release the packages install from: `<base>/<scope>-<name>-<version>.tgz`. */
	readonly release: { readonly tag: string; readonly version: string; readonly base: string };
	readonly effect: string;
	readonly packages: ReadonlyArray<Package>;
}

/** Each kind in one line. */
export const KINDS = {
	facade: "Upstream's capability in Effect terms. Adds no behaviour.",
	plugin: "Behaviour of ours, built on the facades.",
	host: "Runs the upstream harness on another platform.",
	composition: "The plugins composed as a product would compose them.",
	docs: "The family's docs, as pages for people and skills for agents.",
} as const satisfies Record<Kind, string>;

/** The families, in the order the site lists them. */
export const FAMILIES: ReadonlyArray<Family> = [
	{
		id: "pi",
		title: "Pi",
		upstream: { name: "earendil-works/pi", url: "https://github.com/earendil-works/pi", version: "1.6.1" },
		repo: "https://github.com/effectified/pi",
		scope: "@effectified",
		status: "alpha",
		release: {
			tag: "v0.1.0",
			version: "0.1.0",
			base: "https://github.com/effectified/pi/releases/download/v0.1.0",
		},
		effect: "~4.1.5",
		packages: [
			{
				name: "pi-ai",
				kind: "facade",
				wraps: ["pi-ai"],
				summary: "Models as a service, requests as Stream and Effect, bridges to effect/ai both ways.",
			},
			{
				name: "pi-durable",
				kind: "facade",
				wraps: ["pi-durable", "pi-ai", "chord"],
				summary: "The durable agent harness as Layers, Effects and Streams.",
			},
			{
				name: "pi-schema",
				kind: "facade",
				wraps: ["pi-schema"],
				summary: "Effect Schema to and from Pi tool parameters, with typed decode errors.",
			},
			{
				name: "pi-telemetry",
				kind: "facade",
				wraps: ["pi-telemetry"],
				summary: "Pi spans, metrics and events as Effect spans, metrics and logs.",
			},
			{
				name: "pi-approvals",
				kind: "plugin",
				wraps: ["pi-durable"],
				summary: "Human approval of tool calls: a parking gate with typed requests and decisions.",
			},
			{
				name: "pi-budget",
				kind: "plugin",
				wraps: ["pi-ai", "pi-durable"],
				summary: "Budget leases: reserve before each request, settle after, stop when fenced.",
			},
			{
				name: "pi-guard",
				kind: "plugin",
				wraps: ["pi-durable"],
				summary: "Tool allow-lists, forbidden verbs and argument rules, failing closed.",
			},
			{
				name: "pi-recorder",
				kind: "plugin",
				wraps: ["pi-ai", "pi-durable"],
				summary: "Every message, model call and tool call to a sink, at least once, with deterministic ids.",
			},
			{
				name: "pi-review",
				kind: "plugin",
				wraps: ["pi-ai", "pi-durable"],
				summary: "A second model of another family and a citation check before an answer stands.",
			},
			{
				name: "pi-router",
				kind: "plugin",
				wraps: ["pi-ai"],
				summary: "Model routes: fallback, a limiter with backoff, prices, region filters.",
			},
			{
				name: "pi-search",
				kind: "plugin",
				wraps: ["pi-durable"],
				summary: "Search and fetch tools behind a provider port, with an Exa adapter.",
			},
			{
				name: "pi-subagent",
				kind: "plugin",
				wraps: ["pi-durable"],
				summary: "Foreground and background child agents with typed results.",
			},
			{
				name: "pi-swarm",
				kind: "plugin",
				wraps: ["pi-durable"],
				summary: "Prime once, fork per job under a cap, typed fan-in and cleanup.",
			},
			{
				name: "pi-durable-rivet",
				kind: "host",
				wraps: ["pi-durable", "pi-ai", "chord"],
				summary: "A durable harness inside a Rivet actor: actor SQLite, schedules and forks.",
			},
			{
				name: "pi-thread",
				kind: "composition",
				wraps: ["pi-ai", "pi-durable"],
				summary: "An agent thread: guarded, budgeted, recorded and reviewed, with subagents and swarms.",
			},
			{
				name: "pi-docs",
				kind: "docs",
				wraps: [],
				summary: "The family's docs as pages for people and as skills for agents.",
			},
		],
	},
];

/** The totals the page shows, computed from the catalog. */
export const totals = {
	families: FAMILIES.length,
	packages: FAMILIES.reduce((sum, family) => sum + family.packages.length, 0),
	upstream: new Set(FAMILIES.flatMap((family) => family.packages.flatMap((pkg) => pkg.wraps.map((w) => `${family.id}/${w}`)))).size,
};

/** The release URL of a package's tarball, as `npm pack` names it. */
export function tarballUrl(family: Family, pkg: Package): string {
	return `${family.release.base}/${family.scope.slice(1)}-${pkg.name}-${family.release.version}.tgz`;
}

/** A library the engine has effectified and tested, not yet released as a family of its own. */
export interface EngineTarget {
	readonly library: string;
	readonly version: string;
	/** npm's weekly downloads of the library, read on 2026-11-26. */
	readonly weekly: number;
	readonly facade: string;
	readonly exercises: string;
	readonly tests: number;
	readonly against: string;
}

/** The engine's targets (effectified/engine, targets/): generated from each library's types, tested against it. */
export const ENGINE_TARGETS: ReadonlyArray<EngineTarget> = [
	{ library: "sharp", version: "0.35.5", weekly: 169_054_598, facade: "@effectified/sharp", exercises: "a builder that is also a Node stream", tests: 2, against: "libvips" },
	{ library: "nodemailer", version: "10.6.1", weekly: 40_428_669, facade: "@effectified/nodemailer", exercises: "a scoped transport, error codes", tests: 3, against: "a JSON transport, a refused SMTP port" },
	{ library: "puppeteer-core", version: "25.19.0", weekly: 34_744_076, facade: "@effectified/puppeteer-core", exercises: "16 handles, scoped browser and pages", tests: 3, against: "Chrome" },
	{ library: "simple-git", version: "4.1.0", weekly: 14_877_551, facade: "@effectified/simple-git", exercises: "chainable thenables, generics kept", tests: 2, against: "git" },
	{ library: "bullmq", version: "6.7.10", weekly: 13_747_764, facade: "@effectified/bullmq", exercises: "generic constructors, events as Streams", tests: 2, against: "Redis" },
];
