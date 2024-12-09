<template>
	<v-container>
		<div class="mb-6 d-flex flex-column align-center">
			<v-form ref="form">
				<v-text-field
					class="pa-0"
					v-model="form.title"
					label="Titolo del biglietto di auguri"
					outlined
					clearable
				></v-text-field>
				<v-text-field v-model="form.text" label="Messaggio di auguri" outlined clearable></v-text-field>
				<div class="d-flex flex-column flex-sm-row">
					<span class="pa-2 text-center">Colore di sfondo del biglietto</span>
					<v-color-picker v-model="bgColor" mode="rgba" hide-inputs class="ma-4"></v-color-picker>
					<span class="pa-2 text-center">Colore del testo del biglietto</span>

					<v-color-picker
						v-model="fontColor"
						hide-inputs
						mode="rgba"
						class="ma-4"
						label="Colore testo biglietto"
					></v-color-picker>
				</div>
			</v-form>
			<div class="pa-4">
				<v-btn color="primary" @click="showPreview = true">Visaulizza anteprima</v-btn>
			</div>
			<div v-if="!qrValue" class="pa-4">
				<v-btn color="primary" @click="sendMessage"> Genera QR Code </v-btn>
			</div>
			<div v-if="qrValue" class="qr-container">
				<canvas ref="qrCodeCanvas"></canvas>
			</div>
			<div class="pa-4">
				<v-btn color="primary" @click="downloadQRCodeAsPDF">Scarica QR Code come PDF</v-btn>
			</div>
		</div>
	</v-container>
</template>

<script>
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
			showPreview: false,
			bgColor: null,
			fontColor: null,
			qrValue: null,
			token: null,
			qrColor: "#234022", // Colore scuro del QR code
		};
	},
	computed: {},

	methods: {
		async downloadQRCodeAsPDF() {
			if (!this.qrValue) return;
			const canvas = this.$refs.qrCodeCanvas;
			// Crea il PDF
			const doc = new jsPDF();

			// Imposta il testo da visualizzare

			// Centra il QR code
			const x = (doc.internal.pageSize.width - 100) / 2;
			const y = (doc.internal.pageSize.height - 100) / 3; // Posiziona il QR code un po' più in alto della pagina

			// Aggiungi il QR code
			doc.addImage(canvas, "PNG", x, y, 100, 100); // 100 è la larghezza dell'immagine del QR code

			// Aggiungi il testo sotto il QR code
			doc.setFont("helvetica", "normal");
			doc.setFontSize(12);
			doc.text(doc.internal.pageSize.width / 2, y + 120, { align: "center" });

			// Salva il PDF
			doc.save("qrcode.pdf");
		},
		// Funzione per generare il QR code con canvas
		async generateQRCode() {
			if (this.form.title === null || this.form.text === null) return;
			const canvas = this.$refs.qrCodeCanvas;

			const IRI = encodeURIComponent(this.token);

			this.qrValue = `https://mea-christmas-gift.netlify.app/?_id=${IRI}`;

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
				// if (err) return;
				// const response = await axios.post("/api/message/messages", {
				// 	token: this.token,
				// 	message: this.form,
				// });

				const { data, error } = await this.$axios.post("/messages/create", {
					message: this.form,
				});
				if (error) return;
				const { savedMessage } = data;

				this.token = savedMessage._id;

				const { err } = await this.generateQRCode();
				if (err) return;
				console.log("Messaggio inviato:", data);
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
.loading {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.message {
	position: relative;
	height: 100vh; /* Imposta l'altezza del contenitore */
	.title {
		font-family: "Pacifico", cursive;
		font-size: 4rem;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
	}
	.text {
		font-size: 1.5rem;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
	}
}

.content {
	position: absolute;
	top: 50%; /* Posiziona al 50% dall'alto */
	left: 50%; /* Posiziona al 50% da sinistra */
	transform: translate(-50%, -50%); /* Sposta indietro il div di metà della sua larghezza e altezza */
	width: 90%;
}
</style>
