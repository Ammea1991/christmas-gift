import { defineStore } from "pinia";
import { useRoute } from "vue-router";

const route = useRoute();

export const messageStore = defineStore("message", {
	state: () => ({
		message: null,
	}),
	getters: {
		getMessage(state) {
			return state.message;
		},
	},
	actions: {
		setMessage(message: any) {
			debugger;
			this.message = message;
		},
	},
});
