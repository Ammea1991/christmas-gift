import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

type BuildConfig = {
	transpile: string[];
	loaders: {
		scss: {
			additionalData: string;
		};
		// Add other loaders here
	};
};

export default defineNuxtConfig({
	//...
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },
	$meta: {
		link: [
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Pacifico&display=swap",
			},
		],
	},
	ssr: true,
	app: {},
	css: [
		"@/assets/scss/main.scss", // Aggiungi qui il tuo file SCSS
	],
	build: {
		transpile: ["vuetify"],
		loaders: {
			scss: {
				additionalData: `@import "@/assets/scss/variables.scss";`, // Se hai un file di variabili globali
			},
		},
	} as BuildConfig,
	modules: [
		(_options, nuxt) => {
			nuxt.hooks.hook("vite:extendConfig", (config) => {
				// @ts-expect-error
				config.plugins.push(vuetify({ autoImport: true }));
			});
		},
		//...
	],

	vite: {
		vue: {
			template: {
				transformAssetUrls,
			},
		},
	},
});
