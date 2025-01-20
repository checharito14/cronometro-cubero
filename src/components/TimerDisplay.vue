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
			class="text-8xl font-sans tracking-widest text-center w-64 md:text-9xl"
		>
			<h1>
				{{ displayTime }}
			</h1>
		</div>
		<p class="text-sm py-2 text-gris md:text-base">
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


const handleKeyPress = (event: KeyboardEvent) => {
	if (store.isRunning) {
		event.preventDefault();
		store.stopTimer();
		store.addSolve({
			scramble: scramble.value,
			time: parseFloat((store.currentTime / 1000).toFixed(2)),
			isDnf: false,
			penalty: false,
		});
		scramble.value = scrambleGenerator() 
	} else if (event.code === "Space") {
		event.preventDefault();
		if (store.inspeccionMode) {
			store.startInspeccion();
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

onMounted(() => {
	window.addEventListener("keydown", handleKeyPress);
	window.addEventListener("mousedown", handleMousePress);
	scramble.value = scrambleGenerator();
});

onUnmounted(() => {
	window.removeEventListener("keydown", handleKeyPress);
	window.removeEventListener("mousedown", handleMousePress);
});
</script>
