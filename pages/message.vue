<template>
	<h1 class="text-center pa-4">Christmas Menu 🎄</h1>
	<div class="snowflakes" ref="snowflakes"></div>

	<QrCodeGen />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const token = route.query.token || null;
const message = ref("Caricamento...");
const snowflakes = ref(null);

// Funzione per generare i fiocchi di neve
const createSnowflakes = () => {
	const numberOfSnowflakes = 50; // Numero di fiocchi da generare
	for (let i = 0; i < numberOfSnowflakes; i++) {
		const snowflake = document.createElement("div");
		snowflake.classList.add("snowflake");

		// Aggiungi dimensioni randomiche ai fiocchi
		snowflake.style.width = `${Math.random() * 10 + 5}px`; // Tra 5px e 15px
		snowflake.style.height = snowflake.style.width; // Mantieni la stessa altezza

		// Posizione orizzontale randomica
		snowflake.style.left = `${Math.random() * 100}%`; // Posizione orizzontale tra 0% e 100%

		// Posizione verticale iniziale sopra lo schermo
		snowflake.style.top = `-${Math.random() * 50 + 10}px`; // Posiziona casualmente tra -10px e -50px sopra la finestra

		// Velocità di caduta randomica
		snowflake.style.animationDuration = `${Math.random() * 3 + 5}s`; // Tra 5 e 8 secondi
		snowflake.style.animationDelay = `${Math.random() * 3}s`; // Ritardo casuale

		// Aggiungi il fiocco al contenitore
		snowflakes.value.appendChild(snowflake);
	}
};

onMounted(async () => {
	createSnowflakes(); // Genera i fiocchi di neve al caricamento della pagina

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
