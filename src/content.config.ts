// The site's content collections: the facades of effectified/packages, one entry per facade, from the docs the
// engine generates into each (see src/data/packages.ts). A build shows what the repository holds when it runs.
import { defineCollection } from "astro:content";
import { readFacades } from "./data/packages";

const facades = defineCollection({
	loader: async () => (await readFacades()).map((facade) => ({ ...facade, id: facade.slug })),
});

export const collections = { facades };
