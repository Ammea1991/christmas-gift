import { MongoClient } from "mongodb";

const uri = process.env.DB_URI;
const client = new MongoClient(uri);

export default defineEventHandler(async () => {
	try {
		// Connessione al database
		await client.connect();
		const database = client.db("christmas-gift"); // Nome del tuo database
		const collection = database.collection("messages"); // Nome della collezione

		// Recupero dei messaggi
		const messages = await collection
			.find({
				"message.title": { $ne: null },
				"message.text": { $ne: null },
			})
			.toArray();

		if (!messages || messages.length === 0) {
			return { error: "Nessun messaggio trovato" };
		}

		return { messages };
	} catch (error) {
		console.error("Errore nella connessione al database:", error);
		return { error: "Errore interno al server" };
	}
	// try {
	// 	await client.connect();
	// 	const database = client.db("christmas-gift"); // Nome del tuo database
	// 	const collection = database.collection("messages"); // Nome della collezione
	// 	console.log("collection", collection); // Cerca il messaggio associato al token
	// 	const messages = await collection.find();
	// 	debugger;
	// 	console.log("messages", messages);
	// 	if (!messages) {
	// 		return { error: "Messaggi non trovati" };
	// 	}

	// 	return { messages };
	// } catch (error) {
	// 	console.error("Errore nella connessione al database:", error);
	// 	return { error: "Errore interno al server" };
	// } finally {
	// 	await client.close();
	// }
});
