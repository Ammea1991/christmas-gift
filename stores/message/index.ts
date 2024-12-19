import { defineStore } from "pinia";
import { useRoute } from "vue-router";
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
			try {
				let { _id } = this.getMessage;

				if (!_id) _id = id;

				debugger;
				const { message } = await $fetch<GetApiResponse>("http://localhost:3001/api/message", {
					method: "GET",
					params: { _id },
				});
				debugger;
				console.log("response", message);
				this.message = message;
			} catch (error) {
				console.error("Error fetching messages:", error);
			}
		},
		async post() {
			try {
				const { title, text } = this.message;
				const message = new Message(title, text);
				const response = await $fetch<ApiResponse>("http://localhost:3001/api/messages/create", {
					method: "POST",
					body: { message },
				});
				debugger;
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
