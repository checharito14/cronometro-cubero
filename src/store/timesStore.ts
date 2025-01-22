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
		pressStartTime: 0,
		currentHoldTime: 0,
		holdState: '',
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

		startPress() {
			if (this.isRunning || this.pressStartTime > 0) return;
		  
			this.pressStartTime = Date.now();
			this.currentHoldTime = 0;
			this.holdState = '';
		  
			const interval = setInterval(() => {
			  this.currentHoldTime = Math.floor((Date.now() - this.pressStartTime) / 1000);
		  
			  if (this.currentHoldTime >= 2) {
				this.holdState = 'green';
				clearInterval(interval); // Detenemos el intervalo al alcanzar el estado "verde"
			  } else if (this.currentHoldTime < 1) {
				this.holdState = 'red';
			  }
			}, 100);
		  },

		  releasePress() {
			if (this.currentHoldTime >= 2) {
			  this.startTimer();
			}
			this.pressStartTime = 0;
			this.currentHoldTime = 0;
			this.holdState = '';
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
