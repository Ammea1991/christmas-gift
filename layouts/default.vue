<!-- layouts/default.vue -->
<template>
	<div class="layout-wrapper">
		<!-- Il contenuto principale della pagina -->
		<v-app>
			<slot> </slot>
			<div class="snowflakes" ref="snowflakes"></div>

			<!-- Qui verrà renderizzato il contenuto della pagina -->
		</v-app>
	</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
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
});
</script>

<style scoped></style>
