<template>
	<div>
		<v-app-bar color="primary" dark>
			<v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
			<v-toolbar-title> {{ route.name }} </v-toolbar-title>
		</v-app-bar>
		<v-navigation-drawer v-model="drawer" absolute temporary>
			<v-list nav dense>
				<v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
					<v-list-item v-for="item in routes" :key="item.name">
						<v-icon>{{ item.icon }}</v-icon
						><v-list-item-title> {{ item.name }} </v-list-item-title>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script>
import { navStore } from "@/stores/navigation";

export default {
	data: () => ({
		drawer: false,
		group: null,
		routes: null,
	}),
	setup() {
		return {
			store: navStore(),
			route: useRoute(),
		};
	},
	// mounted() {
	// 	console.log(this.$route.name);
	// },
	watch: {
		group() {
			this.drawer = false;
		},
	},
	async mounted() {
		// await console.log(this.$router.options.routes);
		this.routes = await this.$router.options.routes;
	},
	methods: {
		toggleDrawer() {
			this.drawer = !this.drawer;
		},
	},
};
</script>
<style lang="scss" scoped>
header {
	background-color: transparent !important;
}
</style>
