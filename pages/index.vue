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
			<h1 class="text-center pa-4">{{ message.title }}</h1>
			<p class="text-center pa-4">{{ message.text }}</p>
		</div>
		<div class="gnomo">
			<div class="gnomo-cappello"></div>
			<div class="gnomo-corpo"></div>
			<div class="gnomo-barba"></div>
			<div class="gnomo-viso"></div>
			<div class="gnomo-occhi"></div>
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
}

.content {
	position: absolute;
	top: 50%; /* Posiziona al 50% dall'alto */
	left: 50%; /* Posiziona al 50% da sinistra */
	transform: translate(-50%, -50%); /* Sposta indietro il div di metà della sua larghezza e altezza */
	width: 90%;
}

body {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: #f5f5f5;
	margin: 0;
}

.gnomo {
	position: relative;
}

.gnomo-cappello {
	width: 80px;
	height: 100px;
	background-color: #ff4d4d; /* Cappello rosso */
	border-radius: 50% 50% 0 0;
	position: absolute;
	top: 0;
	left: 10px;
	z-index: 2;
}

.gnomo-corpo {
	width: 100px;
	height: 140px;
	background-color: #006400; /* Corpo verde */
	position: absolute;
	top: 90px;
	left: 0;
	border-radius: 10px;
}

.gnomo-barba {
	width: 120px;
	height: 40px;
	background-color: white;
	border-radius: 50%;
	position: absolute;
	top: 130px;
	left: -10px;
}

.gnomo-viso {
	width: 50px;
	height: 50px;
	background-color: #ffcc99; /* Viso beige */
	border-radius: 50%;
	position: absolute;
	top: 70px;
	left: 25px;
}

.gnomo-occhi {
	position: absolute;
	top: 85px;
	left: 35px;
	display: flex;
	justify-content: space-between;
	width: 30px;
}

.gnomo-occhi div {
	width: 10px;
	height: 10px;
	background-color: black;
	border-radius: 50%;
}
</style>
