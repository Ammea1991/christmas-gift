<template>
	<v-container class="message">
		<v-progress-circular
			class="loading"
			v-if="loading"
			:size="70"
			:width="7"
			color="purple"
			indeterminate
		></v-progress-circular>
		<div v-else class="content">
			<h1 class="title text-center pa-4">{{ message.title }}</h1>

			<div class="menu-preview">
				<h1>Il tuo menu di Natale</h1>
				<div v-html="styledMenu"></div>
			</div>
		</div>
	</v-container>
</template>

<script>
import { messageStore } from "@/stores/message";

export default {
	name: "Message",

	setup() {
		definePageMeta({ layout: "outside" });
		return {
			store: messageStore(),
		};
	},
	data() {
		return {
			message: {},

			loading: false,
		};
	},
	computed: {
		message() {
			return this.store.getMessage;
		},
		styledMenu() {
			const message = this.store.getMessage;

			return message?.text
				?.split("\n")
				.map((line) => `<p>${line}</p>`)
				.join("");
		},
	},
	methods: {
		async getMessage() {
			const { _id } = this.$route.query;
			await this.store.get(_id);
		},
		// async getMessage() {
		// 	try {
		// 		const { _id } = this.$route.query;
		// 		if (!_id) return (this.message.title = "Nessun messaggio 🎄");

		// 		this.loading = true;
		// 		const { data, error } = await this.$axios.get("/message", {
		// 			params: { _id },
		// 		});

		// 		this.loading = false;
		// 		if (error) return (this.message = error);
		// 		this.message = data.message;
		// 	} catch (err) {
		// 		this.loading = false;

		// 		return (this.message.title = err.response.data.error);
		// 	}
		// },
	},
	mounted() {
		this.getMessage();
	},
};
// const route = useRoute();
// const loading = ref(false);
// const IRI = route.query._id || null;
// const message = ref("Caricamento...");

// onMounted(async () => {
// 	const { $axios } = useNuxtApp(); // Accedi a $axios dal Nuxt app

// 	if (IRI) {
// 		try {
// 			loading.value = true;
// 			;
// 			console.log(this);
// 			const { data } = await $axios.get("/message", { id: IRI });
// 			;
// 			// const data = await response.json();
// 			if (data.error) {
// 				message.value = data.error;
// 			} else {
// 				message.value = data.message;
// 			}
// 			loading.value = false;
// 		} catch (error) {
// 			message.value = "Errore nel caricamento del messaggio.";
// 		}
// 	} else {
// 		message.value = "Ops... Qualcosa e' andato storto.";
// 	}
// });
</script>
<style lang="scss" scoped>
.loading {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.message {
	position: relative;
	height: 100vh; /* Imposta l'altezza del contenitore */
	.title {
		font-family: "Pacifico", cursive;
		font-size: 4rem;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
	}
	.text {
		font-size: 1.5rem;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
	}
}

.content {
	position: absolute;
	top: 50%; /* Posiziona al 50% dall'alto */
	left: 50%; /* Posiziona al 50% da sinistra */
	transform: translate(-50%, -50%); /* Sposta indietro il div di metà della sua larghezza e altezza */
	width: 90%;
}
</style>
