<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="6" offset-sm="3">
				<div>
					<v-text-field v-model="message" label="Inserisci il messaggio" outlined clearable></v-text-field>
				</div>

				<qrcode-vue :value="qrValue" size="256" />

				<v-btn color="primary" @click="generateQRCode"> Genera QR Code </v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import axios from "axios"; // Importa axios
import { v4 as uuidv4 } from "uuid"; // Importa la funzione per generare UUID
import QrcodeVue from "qrcode.vue";

export default {
	name: "QrCodeGenerator",
	components: {
		QrcodeVue,
	},
	data() {
		return {
			message: "", // Messaggio dell'utente
		};
	},
	computed: {
		// La URL con il token del messaggio
		qrValue() {
			const token = encodeURIComponent(this.message);
			return `https://example.com/read?token=${token}`;
		},
	},
	methods: {
		// Funzione per generare il QR code
		async generateQRCode() {
			if (this.message) {
				// Chiamata al backend per salvare il messaggio
				try {
					const response = await axios.post("/api/messages", {
						message: this.message,
					});

					const token = response.data.token; // Ottieni il token generato

					// Mostra il QR Code
					this.$toast.success("QR Code generato!");
					console.log("QR Code generato per:", this.qrValue);
				} catch (error) {
					this.$toast.error("Errore nel salvataggio del messaggio.");
				}
			} else {
				this.$toast.error("Inserisci un messaggio!");
			}
		},
	},
};
</script>

<style scoped>
v-btn {
	margin-top: 10px;
}
</style>
