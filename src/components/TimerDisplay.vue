<template>
	<section class="grid justify-center items-center cursor-pointer" @click="">
		<div class="text-4xl py-2 font-sans mx-auto">
			{{ scramble }}
		</div>
		<h1 class="text-9xl font-sans p-2 tracking-widest text-center w-32">
			{{ formattedTime }}
		</h1>
	</section>
	<p class="py-2 text-gris">Presiona espacio para iniciar</p>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useTimesStore } from "../store/timesStore";

const store = useTimesStore();

const time = ref(0);
const scramble = ref("R U U'");
const isRunning = ref(false);
let timer: number | null = null;

const formattedTime = computed(() => {
	const minutes = String(Math.floor(time.value / 60000)).padStart(2, "0");
	const seconds = String(Math.floor((time.value % 60000) / 1000)).padStart(
		2,
		"0"
	);
	const milliseconds = String(Math.floor((time.value % 1000) / 10)).padStart(
		2,
		"0"
	);

	if (minutes !== "00") {
		return `${minutes}:${seconds}.${milliseconds}`;
	} else {
		return `${seconds}.${milliseconds}`;
	}
});

//Iniciar el cronometro
const startTimer = () => {
	if (!isRunning.value) {
		isRunning.value = true;
		const startTime = performance.now() - time.value;
		timer = window.setInterval(() => {
			time.value = Math.floor(performance.now() - startTime);
		});
	}
};

//Detener el cronometro
const stopTimer = () => {
	if (isRunning.value) {
		isRunning.value = false;
		clearInterval(timer as number)
		timer = null

		store.addSolve({
			scramble: scramble.value,
			time: formattedTime.value
		})

		// TODO: scramble.value = scrambleGenerator()
	}
};

const handleKeyPress = (event: KeyboardEvent) => {
	if (isRunning.value) {
		stopTimer();
	} else {
		if (event.code === "Space") startTimer();
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
});

// onUnmounted(() => {
// 	window.removeEventListener("keydown", handleKeyPress);
// });
</script>
