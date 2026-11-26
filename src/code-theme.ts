// The site's code theme, in the spirit of effect.website's samples: violet keywords, emerald strings, cyan for
// Effect's modules and types, blue functions, orange numbers, muted comments, on the brand's zinc well.
import type { ThemeRegistration } from "shiki";

/** Effect-style dark syntax colours, used by every code block on the site. */
export const effectifiedDark: ThemeRegistration = {
	name: "effectified-dark",
	type: "dark",
	colors: { "editor.background": "#0c0c0e", "editor.foreground": "#e4e4e7" },
	settings: [
		{ settings: { foreground: "#e4e4e7" } },
		{ scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#71717a", fontStyle: "italic" } },
		{
			scope: ["keyword", "storage", "storage.type", "storage.modifier", "keyword.control", "keyword.operator.new", "keyword.operator.expression", "keyword.generator.asterisk"],
			settings: { foreground: "#a78bfa" },
		},
		{ scope: ["string", "string.quoted", "string.template", "punctuation.definition.string"], settings: { foreground: "#34d399" } },
		{ scope: ["constant.numeric", "constant.language", "constant.character"], settings: { foreground: "#fdba74" } },
		{
			scope: ["entity.name.type", "entity.name.class", "support.type", "support.class", "variable.other.object", "variable.other.constant.object", "entity.other.inherited-class"],
			settings: { foreground: "#67e8f9" },
		},
		{ scope: ["entity.name.function", "support.function", "meta.function-call entity.name.function", "variable.function"], settings: { foreground: "#93c5fd" } },
		{ scope: ["variable.parameter"], settings: { foreground: "#fda4af" } },
		{ scope: ["meta.object-literal.key", "support.type.property-name", "variable.other.property"], settings: { foreground: "#d4d4d8" } },
		{ scope: ["punctuation", "meta.brace", "keyword.operator"], settings: { foreground: "#a1a1aa" } },
		{ scope: ["variable.language.this", "variable.language"], settings: { foreground: "#a78bfa" } },
	],
};
