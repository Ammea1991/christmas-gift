// server/api/messages.js
import { defineEventHandler, readBody } from "h3";
import { MongoClient } from "mongodb";

export default defineEventHandler(async (event) => {
	// Ottieni il corpo della richiesta
	const body = await readBody(event);

	const { token, message } = body;
	console.log("token", token, "message", message);
	// Connessione a MongoDB
	const client = new MongoClient(process.env.DB_URI);
	try {
		await client.connect();
		const db = client.db("christmas-gift"); // Sostituisci con il nome del tuo DB
		const collection = db.collection("messages"); // Sostituisci con il nome della tua collezione

		// Inserisci il messaggio nel DB con il token
		const result = await collection.insertOne({ token, message });
		return { status: "success", result };
	} catch (error) {
		return { status: "error", message: error.message };
	} finally {
		await client.close();
	}
});
