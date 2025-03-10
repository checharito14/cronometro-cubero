<template>
	<section
		class="relative flex flex-col justify-center items-center gap-4"
	>
		<div class="absolute top-7 left-0 flex text-sm text-vulcan-400 border-b border-vulcan-400 p-1 cursor-pointer">
			<p>CUBO</p>
			<select
				id="cubo"
				v-model="solvesStore.categoryCube"
				class=" cursor-pointer bg-transparent"
			>
				<option value="222">2X2</option>
				<option value="333">3X3</option>
				<option value="444">4X4</option>
			</select>
		</div>

		<p class="text-vulcan-950 dark:text-inherit">Tiempo de inspección</p>
		<label class="inline-flex items-center cursor-pointer">
			<input
				type="checkbox"
				v-model="store.inspeccionMode"
				class="sr-only peer"
			/>
			<div
				class="relative w-11 h-6 bg-[#2e2e2ecb] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
			></div>
		</label>
		<select
			:class="{ hidden: !store.inspeccionMode }"
			id="inspeccion"
			class="w-[80px] text-gray-900 text-lg rounded-lg p-2.5 border"
			v-model="store.inspeccionTime"
		>
			<option value="3">3s</option>
			<option value="5">5s</option>
			<option value="10">10s</option>
			<option value="15">15s</option>
		</select>
	</section>
</template>

<script setup lang="ts">
import { useSolvesStore } from "../store/solvesStore";
import { useTimesStore } from "../store/timesStore";

const store = useTimesStore();
const solvesStore = useSolvesStore();




</script>
