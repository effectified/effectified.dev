// The monochrome code theme of the brand: keywords white, names near-white, strings and punctuation zinc, comments muted.
import type { ThemeRegistration } from "shiki";

/** EffectScript's monochrome Shiki theme, shared by the effectified family of sites. */
export const monochrome: ThemeRegistration = {
	name: "effectified-mono",
	type: "dark",
	colors: { "editor.background": "#0c0c0e", "editor.foreground": "#d4d4d8" },
	settings: [
		{ settings: { foreground: "#d4d4d8" } },
		{ scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#8e8e96", fontStyle: "italic" } },
		{ scope: ["keyword", "storage", "storage.type", "keyword.control", "keyword.operator.new"], settings: { foreground: "#ffffff" } },
		{ scope: ["string", "string.quoted", "string.template"], settings: { foreground: "#a1a1aa" } },
		{ scope: ["constant.numeric", "support.type", "entity.name.type", "entity.name.class"], settings: { foreground: "#e4e4e7" } },
		{ scope: ["entity.name.function", "support.function", "meta.function-call"], settings: { foreground: "#f4f4f5" } },
		{ scope: ["variable", "variable.other", "meta.object-literal.key"], settings: { foreground: "#d4d4d8" } },
		{ scope: ["punctuation", "meta.brace", "keyword.operator"], settings: { foreground: "#8e8e96" } },
	],
};
