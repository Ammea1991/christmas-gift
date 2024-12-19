// composables/useApi.ts

export const useApi = (endpoint: string, options?: any) => {
	const config = useRuntimeConfig();

	// const apiFetch = (endpoint: string, options?: any) => {
	// 	return $fetch(`${config.public.apiURL}${endpoint}`, options);
	// };

	// return { apiFetch };
};
