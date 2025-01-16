<template>
	<base-card>
		<div class="flex justify-center relative">
			<h3 class="text-center text-base mb-3 md:text-lg">Tiempos</h3>
			<!-- Icono ojo -->
			<i class="absolute right-[10px] cursor-pointer" @click="toggleScramble">
				<div class="relative group">
					<Eye v-if="!scrambleVisible"/>
					<EyeClosed v-else />
					<div class="absolute left-1/2 transform -translate-x-1/2 top-full mb-2 opacity-0 group-hover:opacity-100  group-hover:z-10 transition-opacity duration-200 delay-300 text-xs bg-vulcan-600 text-vulcan-100 p-2 rounded text-center">
						Ver scramble
					</div>
				</div>
			</i>
		</div>

		<div class="p-2 text-xs" v-for="(solve, index) in store.solves" :key="index">
			<div class="grid grid-cols-[1fr_2fr_1fr] justify-between items-center w-full border-b border-vulcan-800 py-1"
>
				<!-- Tiempo -->
				<p class="md:text-sm">
					<span class="font-bold mr-1 text-xs">{{ index + 1 }}.</span
					>{{ solve.time }}
				</p>

				<!-- Scramble -->
				<p class="tracking-widest text-center text-[10px] md:text-xs text-gris transition-opacity" :class="{ 'opacity-0': scrambleVisible}">
					{{ solve.scramble }}
				</p>

				<!-- Acciones -->
				<div class="flex gap-2 justify-center">
					<p class="hover:text-[#09BC8A] cursor-pointer" @click="addPenalty(index)">
						+2
					</p>
					<p class="hover:text-[#FFA62B] cursor-pointer" @click="addDNF(index)">
						DNF
					</p>
					<Trash class="cursor-pointer" :size="20" @click="deleteSolve(index)"/>
				</div>
			</div>
		</div>
	</base-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTimesStore } from "../store/timesStore";
import { Trash, EyeClosed, Eye } from "lucide-vue-next";

const store = useTimesStore();
const solves = store.solves;
const scrambleVisible = ref<boolean>(true);

const toggleScramble = () => {
	scrambleVisible.value = !scrambleVisible.value;
};

const addPenalty = (index: number) => {
	const solve = solves[index]
};

const addDNF = (index: number) => {
	solves[index].time = "DNF";
};

const deleteSolve = (index: number) => {
	solves.splice(index, 1);
};
</script>
