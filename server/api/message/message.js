// server/api/messages.js

import { v4 as uuidv4 } from "uuid";

let messages = []; // Simulazione di un "database" in memoria (puoi sostituirlo con un database reale)

export default async (req, res) => {
	if (req.method === "POST") {
		const { message } = req.body;

		// Verifica che ci sia un messaggio
		if (!message) {
			return res.status(400).json({ error: "Messaggio mancante" });
		}

		const token = uuidv4(); // Genera un token UUID per il messaggio

		const newMessage = { message, token };
		messages.push(newMessage); // Aggiungi il messaggio al "database"

		return res.status(201).json(newMessage); // Risponde con il nuovo messaggio
	}

	// Se il metodo è diverso, restituisci un errore
	return res.status(405).json({ error: "Metodo non permesso" });
};
