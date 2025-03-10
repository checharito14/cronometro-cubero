import { defineStore } from "pinia";
import { useSolvesStore } from "./solvesStore";

export const useConfigStore = defineStore("config", {
	state: () => ({
		darkMode: true,
	}),
	actions: {
		saveCubeCategory() {
			const solvesStore = useSolvesStore()
			const categoryCube = solvesStore.categoryCube
			localStorage.setItem("categoryCube", JSON.stringify(categoryCube));
		},

		loadCubeCategory() {
			const storedCategoryCube = localStorage.getItem("categoryCube");
			const solvesStore = useSolvesStore()
			solvesStore.categoryCube = storedCategoryCube ? JSON.parse(storedCategoryCube) : "333"; // Default: 3x3
		},
		//Persistencia de darkmode---------------------------------------------
		saveDarkMode() {
			localStorage.setItem("darkMode", JSON.stringify(this.darkMode));
		},

		loadDarkMode() {
			const storedDarkMode = localStorage.getItem("darkMode");
			this.darkMode = storedDarkMode ? JSON.parse(storedDarkMode) : true; // Default: true
		},
	},
});
