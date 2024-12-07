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
			<p class="text text-center pa-4">{{ message.text }}</p>
		</div>
	</v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const loading = ref(false);
const token = route.query.token || null;
const message = ref("Caricamento...");

onMounted(async () => {
	if (token) {
		try {
			loading.value = true;
			const response = await fetch(`/api/message/${token}`);
			const data = await response.json();
			if (data.error) {
				message.value = data.error;
			} else {
				message.value = data.message;
			}
			loading.value = false;
		} catch (error) {
			message.value = "Errore nel caricamento del messaggio.";
		}
	} else {
		message.value = "Ops... Qualcosa e' andato storto.";
	}
});
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
