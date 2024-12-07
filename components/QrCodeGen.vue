<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="6" offset-sm="3">
				<div class="mb-6 text-center">
					<v-form ref="form">
						<v-text-field
							v-model="form.title"
							label="Inserisci il titolo del biglietto di auguri"
							outlined
							clearable
						></v-text-field>
						<v-text-field
							v-model="form.text"
							label="Inserisci il messaggio di auguri"
							outlined
							clearable
						></v-text-field>
					</v-form>
					<div class="qr-container">
						<canvas ref="qrCodeCanvas"></canvas>
					</div>
					<div class="pa-4">
						<v-btn color="primary" @click="sendMessage"> Genera QR Code </v-btn>
					</div>
					<div class="pa-4">
						<v-btn color="primary" @click="downloadQRCodeAsPDF">Scarica QR Code come PDF</v-btn>
					</div>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import QRCode from "qrcode"; // Importa QRCode dalla libreria
import jsPDF from "jspdf"; // Importa il pacchetto jsPDF

export default {
	name: "QrCodeGenerator",
	data() {
		return {
			form: {
				title: null,
				text: null,
			},
			qrValue: null,
			token: null,
			qrColor: "#234022", // Colore scuro del QR code
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
	methods: {
		async downloadQRCodeAsPDF() {
			if (!this.qrValue) return;
			const canvas = this.$refs.qrCodeCanvas;
			// Crea il PDF
			const doc = new jsPDF();

			// Imposta il testo da visualizzare
			const text = "Scan me";

			// Centra il QR code
			const x = (doc.internal.pageSize.width - 100) / 2;
			const y = (doc.internal.pageSize.height - 100) / 3; // Posiziona il QR code un po' più in alto della pagina

			// Aggiungi il QR code
			doc.addImage(canvas, "PNG", x, y, 100, 100); // 100 è la larghezza dell'immagine del QR code

			// Aggiungi il testo sotto il QR code
			doc.setFont("helvetica", "normal");
			doc.setFontSize(12);
			doc.text(text, doc.internal.pageSize.width / 2, y + 120, { align: "center" });

			// Salva il PDF
			doc.save("qrcode.pdf");
		},
		// Funzione per generare il QR code con canvas
		async generateQRCode() {
			if (this.form.title === null || this.form.text === null) return;
			const canvas = this.$refs.qrCodeCanvas;
			const token = uuidv4();
			const IRI = encodeURIComponent(token);

			this.token = token;
			this.qrValue = `https://mea-christmas-gift.netlify.app/?token=${IRI}`;

			const options = {
				errorCorrectionLevel: "H", // Livello di correzione dell'errore
				type: "image/png", // Tipo di immagine
				width: 256, // Larghezza del QR code
				color: {
					dark: "#000", // Colore scuro (colore principale del QR)
					light: "#9f1616", // Colore chiaro (sfondo)
				},
				background: "#234022", // Sfondo del QR code
				margin: 4, // Margine234022
				// Puoi aggiungere altre personalizzazioni come logo nel QR code
			};

			try {
				await QRCode.toCanvas(canvas, this.qrValue, options); // Genera il QR code sul canvas
				return { err: false };
			} catch (err) {
				return { err };
			}
		},

		async sendMessage() {
			try {
				const { err } = await this.generateQRCode();
				if (err) return;
				const response = await axios.post("/api/message/messages", {
					token: this.token,
					message: this.form,
				});
				console.log("Messaggio inviato:", response);
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
