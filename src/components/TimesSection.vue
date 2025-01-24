<template>
	<base-card>
		<div class="flex justify-between items-center w-[95%] relative">
			<p class="text-vulcan-700 dark:text-vulcan-300 ml-4 text-xs">
				Total: {{ solveLength}}/{{ solveLength }}
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

		<div class="p-6">
			<div
				class="p-2 text-xs"
				v-for="(solve, index) in store.solves"
				:key="index"
			>
				<div
					class="grid grid-cols-[1fr_2fr_1fr] justify-between items-center w-full border-b border-vulcan-400 dark:border-vulcan-800 py-1"
				>
					<!-- Tiempo -->
					<p class="md:text-sm">
						<span class="font-bold mr-1 text-xs"
							>{{ index + 1 }}.</span
						>
						{{ solve.isDnf ? "DNF" : solve.time.toFixed(2) }}
						<span v-if="solve.penalty" class="text-[8px]">+2</span>
					</p>

					<!-- Scramble -->
					<p
						class="tracking-widest text-center text-[10px] md:text-xs text-gray-700 dark:text-gris transition-opacity"
						:class="{ 'opacity-0': scrambleVisible }"
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
import { useTimesStore } from "../store/timesStore";
import { Trash, EyeClosed, Eye } from "lucide-vue-next";

const store = useTimesStore();
const solves = store.solves;
const scrambleVisible = ref<boolean>(true);

const toggleScramble = () => {
	scrambleVisible.value = !scrambleVisible.value;
};

const addPenalty = (index: number) => {
	if (solves[index].isDnf) return;
	const solve = solves[index];
	solve.penalty = !solve.penalty;

	if (solve.penalty) {
		solve.time = parseFloat((solve.time + 2).toFixed(2));
	} else {
		solve.time = parseFloat((solve.time - 2).toFixed(2));
	}
};

const addDNF = (index: number) => {
	const solve = solves[index];
	solve.isDnf = !solve.isDnf;
};



const solveLength = computed(() => {
	return store.solves.length
})
</script>
