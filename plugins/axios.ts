import axios, { AxiosInstance } from "axios";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
	// Ottieni l'URL base dall'ambiente
	const { $config } = nuxtApp;

	const baseURL = $config.public.apiURL;
	// Configura l'istanza di Axios
	const axiosInstance: AxiosInstance = axios.create({
		baseURL,
		timeout: 10000, // Timeout massimo in ms
		headers: {
			"Content-Type": "application/json",
		},
	});

	// Intercettori della richiesta
	axiosInstance.interceptors.request.use(
		(config) => {
			const token = nuxtApp.$auth?.getToken(); // Ottieni il token, se hai un modulo auth
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	// Interceptor per trasformare dinamicamente la risposta
	axiosInstance.interceptors.response.use(
		(response) => {
			const data = response.data;

			// Trova la chiave contenente un array (se esiste)
			const keyWithArray = Object.keys(data).find((key) => Array.isArray(data[key]));

			// Sovrascrivi `data` con il valore dell'array, se trovato
			if (keyWithArray) {
				response.data = data[keyWithArray];
			}

			return response;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	// Registra Axios come plugin globale
	nuxtApp.provide("axios", axiosInstance);
});
