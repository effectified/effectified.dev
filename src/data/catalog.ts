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
	/** Not on npm: private like the upstream package it wraps, used from a checkout. */
	readonly private?: true;
}

/** One upstream project and the packages that make it Effect-native. */
export interface Family {
	readonly id: string;
	readonly title: string;
	readonly upstream: { readonly name: string; readonly url: string; readonly version: string };
	readonly repo: string;
	/** The npm scope of the family's packages: each installs from npm as `<scope>/<name>`. */
	readonly scope: string;
	readonly status: "alpha";
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
				summary: "Pi spans, metrics and events as Effect spans, metrics and logs; typed telemetry schemas.",
			},
			{
				name: "pi-agent",
				kind: "facade",
				wraps: ["pi-agent-core"],
				summary: "Pi's short-lived agent loop: prompts as Effects, events as Streams, tools and hooks as Effects.",
			},
			{
				name: "pi-coding-agent",
				kind: "facade",
				wraps: ["pi-coding-agent"],
				summary: "Pi extensions written in Effect, sessions, built-in and MCP tools, print, RPC and interactive modes.",
			},
			{
				name: "pi-mcp",
				kind: "facade",
				wraps: ["pi-mcp"],
				summary: "MCP clients and transports as scoped resources, notifications as Streams, OAuth sign-in.",
			},
			{
				name: "pi-env",
				kind: "facade",
				wraps: ["pi-env"],
				summary: "Local and remote environments, processes, terminals and SSH as scoped resources.",
			},
			{
				name: "pi-tui",
				kind: "facade",
				wraps: ["pi-tui"],
				summary: "The terminal UI as a scoped service, keys and callbacks as Streams, keybindings kept configurable.",
			},
			{
				name: "pi-codemode",
				kind: "facade",
				wraps: ["pi-codemode"],
				summary: "Code mode over Effect tools: worker, inline and remote sandboxes, runs as Streams.",
			},
			{
				name: "pi-chord",
				kind: "facade",
				wraps: ["chord"],
				summary: "Chord's context from the calling fiber, its store, hosts, facets, links and clients.",
			},
			{
				name: "pi-evals",
				kind: "facade",
				wraps: ["pi-evals"],
				summary: "Evaluations whose runs, scorers and Docker observations are Effects and Streams.",
				private: true,
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
