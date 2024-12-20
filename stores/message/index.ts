import { defineStore } from "pinia";
import { useRoute } from "vue-router";
import { useRuntimeConfig } from "#app"; // Importa useRuntimeConfig

import { type IMessage, Message } from "~/types/message";

const route = useRoute();

interface ApiResponse {
	savedMessage: {
		message: {
			title: string;
			text: string;
		};
		_id: string;
	};
}

interface GetApiResponse {
	message: IMessage;
}
export const messageStore = defineStore("message", {
	state: () => ({
		message: {} as IMessage, // Stato globale per i messaggi
	}),
	getters: {
		getMessage(state) {
			return state.message;
		},
	},
	actions: {
		setMessage(message: any) {
			this.message = message;
		},
		async get(id: string) {
			const config = useRuntimeConfig(); // Ottieni le variabili di configurazione

			try {
				let { _id } = this.getMessage;

				if (!_id) _id = id;

				const { message } = await $fetch<GetApiResponse>(`${config.public.apiURL}/message`, {
					method: "GET",
					params: { _id },
				});
				console.log("response", message);
				this.message = message;
			} catch (error) {
				console.error("Error fetching messages:", error);
			}
		},
		async post() {
			const config = useRuntimeConfig(); // Ottieni le variabili di configurazione

			try {
				const { title, text } = this.message;
				const message = new Message(title, text);
				const response = await $fetch<ApiResponse>(`${config.public.API_URL}/messages/create`, {
					method: "POST",
					body: { message },
				});
				const { savedMessage } = response;

				this.message = {
					_id: savedMessage._id,
					title: savedMessage.message.title,
					text: savedMessage.message.text,
				};

				return { data: response, err: false };
			} catch (err) {
				console.error("Errore durante il POST del messaggio:", err);
				throw { err };
			}
		},
	},
});
