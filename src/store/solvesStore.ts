import { defineStore } from "pinia";
import type { Solve } from "../types";
// import { useAvgStore } from "./avgStore";

// const avgStore = useAvgStore();

export const useSolvesStore = defineStore("solves", {
	state: () => ({
		solves: [] as Solve[],
	}),
	actions: {
		addSolve(solve: Solve) {
			this.solves.unshift(solve);
			this.saveSolves();
		},

		deleteSolve(index: number) {
			this.solves.splice(index, 1);
			
            this.saveSolves();
		},

		clearSolves() {
			this.solves.splice(0);
			localStorage.removeItem("solves");
		},

		//Guardar en localstorage
		saveSolves() {
			localStorage.setItem("solves", JSON.stringify(this.solves));
		},

		loadSolves() {
			const solves = localStorage.getItem("solves");
			if (solves) {
				this.solves = JSON.parse(solves);
			}
		},
	},
	getters: {
		getSolves(): Solve[] {
			return this.solves;
		},
	},
});
