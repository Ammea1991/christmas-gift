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
	computed: {
		// qrValue() {
		// 	const token = encodeURIComponent(this.token);
		// 	return `https://mea-christmas-gift.netlify.app/?token=${token}`;
		// },
		// token() {
		// 	return uuidv4();
		// },
	},
	// watch: {
	// 	message() {
	// 		this.generateQRCode();
	// 	},
	// },
	async mounted() {
		await this.getMessages();
	},
	methods: {
		async getMessages() {
			try {
				const { data } = await axios.get("/api/messages/get");

				// Normalizza i messaggi
				this.messages = data.messages.map((item) => ({
					id: item._id,
					title: item.message?.title || "N/A",
					text: item.message?.text || "N/A",
				}));
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
