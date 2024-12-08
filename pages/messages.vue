<template>
	<h1 class="text-center pa-4">Christmas Message 🎄</h1>
	<div class="snowflakes" ref="snowflakes"></div>

	<MessagesTable />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const token = route.query.token || null;
const message = ref("Caricamento...");
</script>
