import { defineStore } from "pinia";

export interface Solve {
	scramble: string;
	time: number;
	penalty: boolean;
	isDnf: boolean;
}

export const useTimesStore = defineStore("times", {
	state: () => ({
		solves: [] as Solve[],
		inspeccionMode: false,
		inspeccionTime: 15,
		currentInspeccionTime: 0,
		isRunning: false,
		currentTime: 0,
	}),
	actions: {
		addSolve(solve: Solve) {
			console.log(solve);
			this.solves.unshift(solve);
		},

		startTimer() {
			if (!this.isRunning) {
				this.isRunning = true;
				this.currentTime = 0;
				const startTime = performance.now();
				this.timer = window.setInterval(() => {
					this.currentTime = Math.floor(
						performance.now() - startTime
					);
				});
			}
		},
	},
});
