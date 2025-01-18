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
				{{ formattedTime }}
			</h1>
		</div>
		<p class="text-sm py-2 text-gris md:text-base" v-if="!isRunning">
			Presiona espacio para iniciar
		</p>
		<p class="text-sm py-2 text-gris md:text-base" v-else>
			Presiona cualquier tecla para detener
		</p>
	</section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, inject } from "vue";
import { useTimesStore } from "../store/timesStore";

const store = useTimesStore();

const currentTime = ref(0);
const scramble = ref("");
const isRunning = ref(false);
let timer: number | null = null;


const formattedTime = computed(() => {
	const minutes = String(Math.floor(currentTime.value / 60000)).padStart(
		2,
		"0"
	);
	const seconds = String(
		Math.floor((currentTime.value % 60000) / 1000)
	).padStart(2, "0");
	const milliseconds = String(
		Math.floor((currentTime.value % 1000) / 10)
	).padStart(2, "0");

	if (minutes !== "00") {
		return `${minutes}:${seconds}.${milliseconds}`;
	} else {
		return `${seconds}.${milliseconds}`;
	}
});



//Detener el cronometro
const stopTimer = () => {
	if (isRunning.value) {
		isRunning.value = false;
		clearInterval(timer as number);
		timer = null;
		store.addSolve({
			scramble: scramble.value,
			time: parseFloat(formattedTime.value),
			penalty: false,
			isDnf: false,
		});

		scramble.value = scrambleGenerator();
	}
};

const scrambleGenerator = (): string => {
	const movements = ["F", "U", "D", "R", "L", "B"];
	const modifiers = ["", "'", "2"];
	return Array.from({ length: 20 })
		.map(
			() =>
				movements[Math.floor(Math.random() * movements.length)] +
				modifiers[Math.floor(Math.random() * modifiers.length)]
		)
		.join(" ");
};

const handleKeyPress = (event: KeyboardEvent) => {
	if (isRunning.value) {
		event.preventDefault();
		stopTimer();
	} else {
		if (event.code === "Space") {
			event.preventDefault();
			startTimer();
		}
	}
};

const handleMousePress = () => {
	if (isRunning.value) {
		stopTimer();
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
