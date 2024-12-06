export default defineEventHandler((event) => {
	const { req, res } = event.node;

	// Controlla se la richiesta è per /api/messages
	if (!req?.url?.startsWith("/message")) {
		return; // Ignora altre rotte
	}

	// Creazione delle credenziali valide
	const validAuth = "Basic " + Buffer.from("admin:M.A3091@christmas").toString("base64");

	// Recupera l'header di autenticazione
	const authHeader = req.headers.authorization;

	// Verifica se l'header di autorizzazione è presente e corretto
	if (!authHeader || authHeader !== validAuth) {
		res.statusCode = 401;
		res.setHeader("WWW-Authenticate", 'Basic realm="Restricted Area"');
		res.end("Unauthorized");
		return;
	}
});
