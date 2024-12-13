import { defineStore } from "pinia";
import { useRoute } from "vue-router";

const route = useRoute();

export const navStore = defineStore("navigation", {
	state: () => ({
		currentRoute: route?.name as string | null,
		routes: null,
	}),
	getters: {
		getCurrentRoute(state) {
			return state.currentRoute;
		},
		getRoutes(state) {
			return state.routes;
		},
	},
	actions: {
		setCurrentRoute(route: string) {
			this.currentRoute = route;
		},
	},
});
