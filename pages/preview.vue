<template>
	<v-container class="message">
		<v-icon @click="$router.back()">mdi-chevron-left</v-icon>
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
			<p class="text text-center pa-4">{{ message.text }}</p>
		</div>
	</v-container>
</template>

<script>
import { messageStore } from "~/stores/message";
export default {
	name: "Message",
	data() {
		return {
			message: {},
			loading: false,
		};
	},
	setup() {
		definePageMeta({ layout: "outside" });

		return {
			store: messageStore(),
		};
	},
	// layout: "outside",
	methods: {
		async getMessage() {
			this.message = this.store.getMessage;
			debugger;
		},
	},
	async mounted() {
		await this.getMessage();
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
