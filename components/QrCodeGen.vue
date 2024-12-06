<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="6" offset-sm="3">
				<div class="mb-6 text-center">
					<v-text-field v-model="message" label="Inserisci il messaggio" outlined clearable></v-text-field>

					<canvas ref="qrCodeCanvas"></canvas>

					<v-btn color="primary" @click="sendMessage"> Genera QR Code </v-btn>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import QRCode from "qrcode"; // Importa QRCode dalla libreria

export default {
	name: "QrCodeGenerator",
	data() {
		return {
			message: null,
			qrColor: "#234022", // Colore scuro del QR code
		};
	},
	computed: {
		qrValue() {
			const token = encodeURIComponent(this.token);
			return `https://mea-christmas-gift.netlify.app/?token=${token}`;
		},
		token() {
			return uuidv4();
		},
	},
	// watch: {
	// 	message() {
	// 		this.generateQRCode();
	// 	},
	// },
	methods: {
		// Funzione per generare il QR code con canvas
		async generateQRCode() {
			const canvas = this.$refs.qrCodeCanvas;
			const options = {
				errorCorrectionLevel: "H", // Livello di correzione dell'errore (High)
				width: 256, // Larghezza del QR Code
				color: {
					dark: this.qrColor, // Colore scuro del QR code
					light: "#ffffff", // Colore chiaro dello sfondo
				},
				margin: 2, // Margine intorno al QR code
			};

			try {
				await QRCode.toCanvas(canvas, this.qrValue, options); // Genera il QR code sul canvas
			} catch (error) {
				console.error("Errore nella generazione del QR Code:", error);
			}
		},

		async sendMessage() {
			try {
				await this.generateQRCode();
				const response = await axios.post("/api/message/messages", {
					token: this.token,
					message: this.message,
				});
				console.log("Messaggio inviato:", response);
			} catch (error) {
				console.error("Errore:", error);
			}
		},
	},
};
</script>
