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
			this.solves.unshift(solve);
		},

		startInspeccion() {
			// this.inspeccionMode = true;
			this.currentInspeccionTime = this.inspeccionTime;
			const interval = setInterval(() => {
				if (this.currentInspeccionTime > 1) {
					this.currentInspeccionTime -= 1;
				} else {
					clearInterval(interval);
					// this.inspeccionMode = false;
                    this.currentInspeccionTime = 0;
					this.startTimer();
				}
			}, 1000);
		},

		resetInspectionTime() {
			this.currentInspeccionTime = this.inspeccionTime;
		},

		startTimer() {
			if (!this.isRunning) {
				this.isRunning = true;
				this.currentTime = 0;
				const startTime = performance.now();
				const interval = setInterval(() => {
					if (this.isRunning) {
						this.currentTime = Math.floor(
							performance.now() - startTime
						);
					} else {
						clearInterval(interval);
					}
				}, 10);
			}
		},

		stopTimer() {
			if (this.isRunning) {
				this.isRunning = false;
			}
		},
	},
});
