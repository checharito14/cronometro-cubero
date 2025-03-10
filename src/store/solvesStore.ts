import { defineStore } from "pinia";
import type { CubeCategory, Solve } from "../types";
// import { useAvgStore } from "./avgStore";

// const avgStore = useAvgStore();

export const useSolvesStore = defineStore("solves", {
	state: () => ({
		categoryCube: "333" as CubeCategory,
		solves: {
			"222": [] as Solve[],
			"333": [] as Solve[],
			"444": [] as Solve[],
		},
	}),
	actions: {
		addSolve(solve: Solve) {
			this.solves[this.categoryCube].unshift(solve);
			this.saveSolves();
		},

		deleteSolve(index: number) {
			this.solves[this.categoryCube].splice(index, 1);
            this.saveSolves();
		},

		clearSolves() {
			this.solves[this.categoryCube].splice(0);
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
			return this.solves[this.categoryCube];
		},
		getCategoryCube(): CubeCategory {
			return this.categoryCube;
		}
	},
});
