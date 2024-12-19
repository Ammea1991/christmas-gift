<template>
	<v-container>
		<div class="mb-6 text-center">
			<v-data-table :headers="headers" :items="messages" :items-per-page="5" class="elevation-1"> </v-data-table>
		</div>
	</v-container>
</template>

<script>
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import QRCode from "qrcode"; // Importa QRCode dalla libreria
import jsPDF from "jspdf"; // Importa il pacchetto jsPDF

export default {
	name: "MessagesTable",
	data() {
		return {
			headers: [
				{ title: "Titolo", align: "start", key: "title" },
				{ title: "Messaggio", align: "end", key: "text" },
			],

			messages: [],
		};
	},
	computed: {},
	async mounted() {
		await this.getMessages();
	},
	methods: {
		async getMessages() {
			try {
				const { data } = await this.$axios.get("/messages");
				// Normalizza i messaggi
				this.messages = data
					.map((item) => ({
						id: item?._id,
						title: item?.message?.title,
						text: item?.message?.text,
					}))
					.filter((item) => item.title !== null && item.text !== null);
			} catch (error) {
				console.error("Errore:", error);
			}
		},
	},
};
</script>
<style lang="scss" scoped>
.qr-container {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: transparent;
	// margin-top: 50px;
}
</style>
