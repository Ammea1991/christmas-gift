<template>
	<div>
		<h1 class="text-center pa-4">{{ message }}</h1>

		<QrCodeGen />
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const token = route.query.token || null;
const message = ref("Caricamento...");

onMounted(async () => {
	if (token) {
		try {
			const response = await fetch(`/api/message/${token}`);
			const data = await response.json();
			if (data.error) {
				message.value = data.error;
			} else {
				message.value = data.message;
			}
		} catch (error) {
			message.value = "Errore nel caricamento del messaggio.";
		}
	} else {
		message.value = "Token non valido.";
	}
});
</script>
