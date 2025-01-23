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
		currentTime: 0,
		isRunning: false,
		inspeccionMode: false,
		inspeccionTime: 15,
		currentInspeccionTime: 0,

		needToHold: true,
		//Hold
		isHolding: false,
		holdStartTime: null as number | null,
		isReady: false,
		holdState: "",

		darkMode: true,
	}),
	actions: {
		//Agregar nuevo solve
		addSolve(solve: Solve) {
			this.solves.unshift(solve);
		},

		//logica de inspeccion
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

		startHold() {
			this.isHolding = true;
			this.holdStartTime = Date.now();

			const progressInterval = setInterval(() => {
				if (!this.holdStartTime || !this.isHolding) {
					clearInterval(progressInterval);
					return;
				}

				const elapsed = Date.now() - this.holdStartTime;

				if (elapsed >= 500) {
					this.isReady = true;
					this.isHolding = false;
					clearInterval(progressInterval);
				}
				console.log(elapsed);
			}, 100);

		},

		resetHold() {
			if (!this.isReady) {
				this.holdStartTime = null;
				this.isHolding = false;
			}
			this.isReady = false;
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

		clearSolves() {
			this.solves = [];
		},
	},
});
