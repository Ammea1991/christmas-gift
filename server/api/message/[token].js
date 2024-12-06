import { MongoClient } from "mongodb";

const uri = process.env.DB_URI;
const client = new MongoClient(uri);

export default defineEventHandler(async (event) => {
	const { token } = event.context.params;
	debugger;
	try {
		await client.connect();
		const database = client.db("christmas-gift"); // Nome del tuo database
		const collection = database.collection("messages"); // Nome della collezione
		console.log("collection", collection);
		debugger; // Cerca il messaggio associato al token
		const messageDoc = await collection.findOne({ token });
		debugger;
		if (!messageDoc) {
			return { error: "Messaggio non trovato" };
		}

		return { message: messageDoc.message };
	} catch (error) {
		console.error("Errore nella connessione al database:", error);
		return { error: "Errore interno al server" };
	} finally {
		await client.close();
	}
});
