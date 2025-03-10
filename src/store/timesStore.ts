import { defineStore } from "pinia";

export const useTimesStore = defineStore("times", {
	state: () => ({
		currentTime: 0,
		isRunning: false,
		//Inspeccion
		inspeccionMode: false,
		inspeccionTime: 5,
		currentInspeccionTime: null as number | null,
		isPaused: false,

		//Hold
		needToHold: false,
		isHolding: false,
		holdStartTime: null as number | null,
		isReady: false,
		holdState: "",
	}),
	actions: {
		//Logica de inspeccion ---------------------------------------------------------
		startInspeccion() {
			this.currentInspeccionTime = this.inspeccionTime;
			const interval = setInterval(() => {
				if (this.currentInspeccionTime! > 1) {
					this.currentInspeccionTime!--;
				} else {
					this.startTimer();
					clearInterval(interval);
					this.currentInspeccionTime = null;
				}
			}, 1000);
		},

		stopInspeccion() {
			if (this.currentInspeccionTime !== null) {
				this.currentInspeccionTime = null;
				this.isPaused = true;
				setTimeout(() => {
					this.isPaused = false;
				}, 500);
			}
		},

		// Logica de mantener pulsado ---------------------------------------------
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

		// Logica de iniciar y detener el timer  ---------------------------------------------
		startTimer() {
			if (!this.isRunning && !this.isPaused) {
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
