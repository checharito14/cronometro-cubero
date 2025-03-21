<template>
	<base-card>
		<div class="flex justify-between items-center w-[95%] relative">
			<p class="text-vulcan-700 dark:text-vulcan-300 ml-4 text-xs">
				Total: {{ solveLength }}/{{ solveLength }}
			</p>
			<h3 class="text-center text-base md:text-lg">Tiempos</h3>
			<!-- Icono ojo -->
			<i class="right-[10px] cursor-pointer" @click="toggleScramble">
				<div class="relative group">
					<Eye v-if="!scrambleVisible" :size="20" />
					<EyeClosed v-else :size="20" />
					<div
						class="absolute left-1/2 transform -translate-x-1/2 top-full mb-2 opacity-0 group-hover:opacity-100 group-hover:z-10 transition-opacity duration-200 delay-300 text-xs bg-vulcan-200 dark:bg-vulcan-600 text-primary dark:text-vulcan-100 p-2 rounded text-center"
					>
						Ver scramble
					</div>
				</div>
			</i>
		</div>

		<div v-if="solves.length === 0" class="flex justify-center items-center h-60">
			<p class="text-sm text-center w-[70%] text-vulcan-700 dark:text-vulcan-300 leading-loose uppercase">Aún no hay tiempos registrados.<br/> ¡Haz tu primer intento ahora!</p>
		</div>

		<div v-else class="p-6">
			<div
				class="p-2 text-xs"
				v-for="(solve, index) in store.getSolves"
				:key="index"
			>
				<div
					class="grid grid-cols-[1fr_2fr_1fr] items-center w-full border-b border-vulcan-400 dark:border-vulcan-800 py-1 rounded-sm"
					:class="{
						'bg-green-500 dark:bg-green-800': index === bestIndex,
						'bg-red-600 dark:bg-red-900': index === worstIndex,
					}"
				>
					<!-- Tiempo -->
					<p class="md:text-sm px-2">
						<span class="font-bold mr-1 text-xs"
							>{{ index + 1 }}.</span
						>
						{{ solve.isDnf ? "DNF" : solve.time.toFixed(2) }}
						<span v-if="solve.penalty" class="text-[8px]">+2</span>
					</p>

					<!-- Scramble -->
					<p
						class="tracking-widest flex items-center text-center text-[10px] md:text-xs text-gray-700 dark:text-gris transition-all duration-300"
						:class="
							scrambleVisible
								? 'min-h-[32px] scale-y-100 opacity-100'
								: 'h-[32px] scale-y-0 opacity-0'
						"
					>
						{{ solve.scramble }}
					</p>

					<!-- Acciones -->
					<div class="flex gap-2 justify-center">
						<p
							class="hover:text-[#09BC8A] cursor-pointer"
							:class="{ 'text-[#09BC8A]': solve.penalty }"
							@click="addPenalty(index)"
						>
							+2
						</p>
						<p
							class="hover:text-[#FFA62B] cursor-pointer"
							:class="{ 'text-[#FFA62B]': solve.isDnf }"
							@click="addDNF(index)"
						>
							DNF
						</p>
						<Trash
							class="cursor-pointer"
							:size="20"
							@click="store.deleteSolve(index)"
						/>
					</div>
				</div>
			</div>
		</div>
	</base-card>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Trash, EyeClosed, Eye } from "lucide-vue-next";
import { useSolvesStore } from "../store/solvesStore";

const store = useSolvesStore();
const solves = computed(() => store.getSolves);
const scrambleVisible = ref<boolean>(true);

const bestIndex = computed(() => {
	const times = solves.value.map((solve) => solve.time);
	const bestTime = times.indexOf(Math.min(...times));
	return bestTime;
});

const worstIndex = computed(() => {
	const times = solves.value.map((solve) => solve.time);
	const worstTime = times.indexOf(Math.max(...times));
	return worstTime;
});

const toggleScramble = () => {
	scrambleVisible.value = !scrambleVisible.value;
};

const addPenalty = (index: number) => {
	if (solves.value[index].isDnf) return;
	const solve = solves.value[index];
	solve.penalty = !solve.penalty;

	if (solve.penalty) {
		solve.time = parseFloat((solve.time + 2).toFixed(2));
	} else {
		solve.time = parseFloat((solve.time - 2).toFixed(2));
	}
};

const addDNF = (index: number) => {
	const solve = solves.value[index];
	solve.isDnf = !solve.isDnf;
};

const solveLength = computed(() => {
	return store.getSolves.length;
});
</script>
