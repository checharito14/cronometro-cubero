<template>
	<section
		class="flex flex-col mx-auto gap-4 items-center cursor-pointer max-w-[90%] mb-6 md:mb-0 md:gap-1"
	>
		<div
			class="text-xl py-2 font-sans tracking-[0.1em] text-center md:text-2xl"
		>
			{{ scramble }}
		</div>
		<div
			class="text-8xl flex justify-around items-center font-sans tracking-widest text-center w-[80%] md:text-9xl"
		>
			<img
				src="../../src/assets/manos.svg"
				alt="manos"
				class="w-32 h-32"
				n
			/>
			<div
				class="w-64"
				:class="{
					'text-red-500': holdState === 'red',
					'text-green-500': holdState === 'green',
					'text-white': !holdState,
				}"
			>
				<h1>
					{{ displayTime }}
				</h1>
			</div>
			<img
				src="../../src/assets/manos.svg"
				alt="manos"
				class="w-32 h-32"
			/>
		</div>
		<p class="text-sm py-2 text-gray-700 dark:text-gris md:text-base">
			{{
				isRunning
					? "Presiona cualquier tecla para detener"
					: "Presiona espacio para iniciar"
			}}
		</p>
	</section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useTimesStore } from "../store/timesStore";

const store = useTimesStore();

const isRunning = computed(() => store.isRunning);
const holdState = computed(() => {
	if (store.isReady) return "green";
	if (store.isHolding) return "red";
	return "";
});

const displayTime = computed(() => {
	if (store.inspeccionMode) {
		return `${store.currentInspeccionTime}`;
	} else {
		const minutes = String(Math.floor(store.currentTime / 60000)).padStart(
			2,
			"0"
		);
		const seconds = String(
			Math.floor((store.currentTime % 60000) / 1000)
		).padStart(2, "0");
		const milliseconds = String(
			Math.floor((store.currentTime % 1000) / 10)
		).padStart(2, "0");

		if (minutes !== "00") {
			return `${minutes}:${seconds}.${milliseconds}`;
		} else {
			return `${seconds}.${milliseconds}`;
		}
	}
});

const handleKeyUp = (event: KeyboardEvent) => {
	if (event.code === "Space") {
		event.preventDefault();  
		if (store.isReady) {
			startTimer();
		}
		store.resetHold();
	}
};

const handleKeyDown = (event: KeyboardEvent) => {
	if(event.code === 'Space') {
		event.preventDefault()
	}
	if (store.isRunning) {
		event.preventDefault();
		store.stopTimer();
		store.addSolve({
			scramble: scramble.value,
			time: parseFloat((store.currentTime / 1000).toFixed(2)),
			isDnf: false,
			penalty: false,
		});
		scramble.value = scrambleGenerator();
		return;
	}
	if (event.code === "Space" && !store.isRunning && !store.isHolding) {
		event.preventDefault();
		if (store.inspeccionMode) {
			store.startInspeccion();
		} else if (store.needToHold) {
			store.startHold();
		} else {
			store.startTimer();
		}
	}
};

const handleMousePress = () => {
	if (store.isRunning) {
		store.stopTimer();
	}
};

const startTimer = () => {
	store.startTimer();
	store.resetHold();
};

//Scramble Generation
const scramble = ref("");

const scrambleGenerator = (): string => {
	const movements = ["F", "U", "D", "R", "L", "B"];
	const modifiers = ["", "'", "2"];
	let previousMove = ""; // Para rastrear el último movimiento generado

	return Array.from({ length: 20 })
		.map(() => {
			let newMove;
			do {
				// Genera un nuevo movimiento aleatorio
				newMove =
					movements[Math.floor(Math.random() * movements.length)] +
					modifiers[Math.floor(Math.random() * modifiers.length)];
			} while (newMove[0] === previousMove[0]); // Evita movimientos consecutivos iguales

			previousMove = newMove[0]; // Actualiza el último movimiento
			return newMove;
		})
		.join(" ");
};

onMounted(() => {
	window.addEventListener("keydown", handleKeyDown);
	window.addEventListener("keyup", handleKeyUp);
	window.addEventListener("mousedown", handleMousePress);
	scramble.value = scrambleGenerator();
});

onUnmounted(() => {
	window.removeEventListener("keydown", handleKeyDown);
	window.removeEventListener("keyup", handleKeyUp);
	window.removeEventListener("mousedown", handleMousePress);
});
</script>
