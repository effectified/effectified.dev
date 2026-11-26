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
	/** Not in the release: private like the upstream package it wraps, used from a checkout. */
	readonly private?: true;
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
			tag: "v0.2.0",
			version: "0.2.0",
			base: "https://github.com/effectified/pi/releases/download/v0.2.0",
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

/** The release URL of a package's tarball, as `npm pack` names it. */
export function tarballUrl(family: Family, pkg: Package): string {
	return `${family.release.base}/${family.scope.slice(1)}-${pkg.name}-${family.release.version}.tgz`;
}

/** A library the engine has effectified, tested and released (effectified/engine, targets/ and its releases). */
export interface EngineTarget {
	readonly library: string;
	readonly version: string;
	/** `runtime`: an Effect facade (Effects, Streams, scopes). `ui`: bindings and mounts for Effect UI. */
	readonly kind: "runtime" | "ui";
	/** npm's weekly downloads of the library, read on 2026-11-26 (the week of 2026-11-19 to 25). */
	readonly weekly: number;
	readonly facade: string;
	/** The GitHub release of effectified/engine the facade installs from. */
	readonly release: string;
	/** The target's directory under targets/. */
	readonly directory: string;
	readonly exercises: string;
	readonly tests: number;
	readonly against: string;
}

/** The engine's targets: generated from each library's types, tested against it, released on GitHub. */
export const ENGINE_TARGETS: ReadonlyArray<EngineTarget> = [
	{ library: "sharp", version: "0.35.5", kind: "runtime", weekly: 169_054_598, facade: "@effectified/sharp", release: "sharp-v0.35.5+2", directory: "sharp", exercises: "a builder that is also a Node stream", tests: 2, against: "libvips" },
	{ library: "nodemailer", version: "10.6.1", kind: "runtime", weekly: 40_428_669, facade: "@effectified/nodemailer", release: "nodemailer-v10.6.1+3", directory: "nodemailer", exercises: "a scoped transport, error codes, callbacks as Effects", tests: 3, against: "a JSON transport, a refused SMTP port" },
	{ library: "motion", version: "14.14.0", kind: "ui", weekly: 39_565_296, facade: "@effectified/motion", release: "motion-v14.14.0", directory: "motion", exercises: "animations that continue from where they are, in-view as messages", tests: 4, against: "Chrome" },
	{ library: "puppeteer-core", version: "25.19.0", kind: "runtime", weekly: 34_744_076, facade: "@effectified/puppeteer-core", release: "puppeteer-core-v25.19.0+3", directory: "puppeteer-core", exercises: "16 handles, scoped browser and pages, generics kept through a call", tests: 3, against: "Chrome" },
	{ library: "@codemirror/view", version: "6.44.0", kind: "ui", weekly: 25_938_494, facade: "@effectified/codemirror-view", release: "codemirror-view-v6.44.0", directory: "codemirror__view", exercises: "an editor whose document is the Model, its cursor kept", tests: 1, against: "Chrome" },
	{ library: "chart.js", version: "4.6.2", kind: "ui", weekly: 17_686_941, facade: "@effectified/chart.js", release: "chart.js-v4.6.2", directory: "chart.js", exercises: "a chart updated in place, clicks as messages", tests: 1, against: "Chrome" },
	{ library: "simple-git", version: "4.1.0", kind: "runtime", weekly: 14_877_551, facade: "@effectified/simple-git", release: "simple-git-v4.1.0+3", directory: "simple-git", exercises: "chainable thenables, generics kept", tests: 2, against: "git" },
	{ library: "bullmq", version: "6.7.10", kind: "runtime", weekly: 13_747_764, facade: "@effectified/bullmq", release: "bullmq-v6.7.10+2", directory: "bullmq", exercises: "generic constructors, typed event payloads as Streams", tests: 2, against: "Redis" },
	{ library: "maplibre-gl", version: "6.19.0", kind: "ui", weekly: 11_336_789, facade: "@effectified/maplibre-gl", release: "maplibre-gl-v6.19.0", directory: "maplibre-gl", exercises: "a WebGL map whose camera is the Model", tests: 1, against: "Chrome" },
	{ library: "@xterm/xterm", version: "6.0.0", kind: "ui", weekly: 10_067_092, facade: "@effectified/xterm", release: "xterm-v6.0.0", directory: "xterm__xterm", exercises: "a terminal fed from the Model, keystrokes as messages", tests: 1, against: "Chrome" },
	{ library: "media-chrome", version: "4.19.5", kind: "ui", weekly: 6_227_290, facade: "@effectified/media-chrome", release: "media-chrome-v4.19.5", directory: "media-chrome", exercises: "47 player elements, play, mute and seek", tests: 2, against: "Chrome" },
	{ library: "emoji-picker-element", version: "1.29.1", kind: "ui", weekly: 297_054, facade: "@effectified/emoji-picker-element", release: "emoji-picker-element-v1.29.1", directory: "emoji-picker-element", exercises: "a web component bound from its manifest", tests: 1, against: "Chrome" },
	{ library: "@awesome.me/webawesome", version: "3.15.0", kind: "ui", weekly: 220_220, facade: "@effectified/webawesome", release: "webawesome-v3.15.0", directory: "awesome.me__webawesome", exercises: "78 elements, form controls and a dialog", tests: 2, against: "Chrome" },
	{ library: "@material/web", version: "2.5.0", kind: "ui", weekly: 158_456, facade: "@effectified/material-web", release: "material-web-v2.5.0", directory: "material__web", exercises: "inherited properties read from its types, a form and a dialog", tests: 2, against: "Chrome" },
	{ library: "@fluentui/web-components", version: "3.2.5", kind: "ui", weekly: 83_579, facade: "@effectified/fluentui-web-components", release: "fluentui-web-components-v3.2.5", directory: "fluentui__web-components", exercises: "elements defined through its exports map, a form and a dialog", tests: 2, against: "Chrome" },
];
