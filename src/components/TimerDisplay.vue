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
			class="text-8xl flex justify-around items-center font-bold font-sans tracking-widest w-[80%] md:text-9xl border-red-500"
		>
			<img
				src="../../src/assets/icono_mano_izquierda.svg"
				alt="manos"
				class="w-48 h-48 hidden lg:block"
			/>
			<div
				:class="{
					'text-red-500': holdState === 'red',
					'text-green-500': holdState === 'green',
				}"
			>
				<h1 class="">
					{{ displayTime }}
				</h1>
			</div>
			<img
				src="../../src/assets/icono_mano.svg"
				alt="manos"
				class="w-48 h-48 hidden lg:block"
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
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { randomScrambleForEvent } from "cubing/scramble";
import { useTimesStore } from "../store/timesStore";
import { useSolvesStore } from "../store/solvesStore";

const timesStore = useTimesStore();
const solvesStore = useSolvesStore();

//Computed --------------------------------------------------
const isRunning = computed(() => timesStore.isRunning);
const holdState = computed(() => {
	if (timesStore.isReady) return "green";
	if (timesStore.isHolding) return "red";
	return "";
});

const displayTime = computed(() => {
	if (timesStore.currentInspeccionTime) {
		return `${timesStore.currentInspeccionTime}`;
	} else {
		const minutes = String(
			Math.floor(timesStore.currentTime / 60000)
		).padStart(2, "0");
		const seconds = String(
			Math.floor((timesStore.currentTime % 60000) / 1000)
		).padStart(2, "0");
		const milliseconds = String(
			Math.floor((timesStore.currentTime % 1000) / 10)
		).padStart(2, "0");

		if (minutes !== "00") {
			return `${minutes}:${seconds}.${milliseconds}`;
		} else {
			return `${seconds}.${milliseconds}`;
		}
	}
});

//Metodos --------------------------------------------------
const startTimer = () => {
	timesStore.startTimer();
	timesStore.resetHold();
};

//Manejo de eventos --------------------------------------------------
const handleKeyUp = (event: KeyboardEvent) => {
	if (event.code === "Space") {
		event.preventDefault();
		if (timesStore.isReady) {
			startTimer();
		}
		timesStore.resetHold();
	}
};

const handleKeyDown = (event: KeyboardEvent) => {
	if (event.code === "Space") {
		event.preventDefault();
	}
	if (timesStore.isPaused) return;
	//Si el cronometro esta corriendo se detiene
	if (timesStore.isRunning) {
		event.preventDefault();
		timesStore.stopTimer();
		solvesStore.addSolve({
			categoryCube: solvesStore.categoryCube,
			scramble: scramble.value,
			time: parseFloat((timesStore.currentTime / 1000).toFixed(2)),
			isDnf: false,
			penalty: false,
		});
		generateScramble();
		return;
	}
	if (
		timesStore.inspeccionMode &&
		timesStore.currentInspeccionTime !== null
	) {
		timesStore.stopInspeccion();
		return;
	}

	if (
		event.code === "Space" &&
		!timesStore.isRunning &&
		!timesStore.isHolding
	) {
		event.preventDefault();
		if (timesStore.inspeccionMode) {
			timesStore.startInspeccion();
		} else if (timesStore.needToHold) {
			timesStore.startHold();
		} else {
			timesStore.startTimer();
		}
	}
};

const handleMousePress = () => {
	if (timesStore.isRunning) {
		timesStore.stopTimer();
	}
};

//Scramble Generation --------------------------------------------------
const scramble = ref("");

const generateScramble = async () => {
	try {
		const selectedCategory = solvesStore.getCategoryCube;
		const result = await randomScrambleForEvent(selectedCategory);
		scramble.value = result.toString();
	} catch (error) {
		console.error("Error generando el scramble:", error);
		scramble.value = "Error al generar el scramble, intenta de nuevo";
	}
};

watch(
	() => solvesStore.categoryCube, // Observa cambios en categoryCube
	() => {
		generateScramble(); // Genera un nuevo scramble cuando cambia la categoría
	}
);

//Lyfecicle hooks ---------------------------------------------------
onMounted(() => {
	window.addEventListener("keydown", handleKeyDown);
	window.addEventListener("keyup", handleKeyUp);
	window.addEventListener("mousedown", handleMousePress);
	generateScramble();
});

onUnmounted(() => {
	window.removeEventListener("keydown", handleKeyDown);
	window.removeEventListener("keyup", handleKeyUp);
	window.removeEventListener("mousedown", handleMousePress);
});
</script>
