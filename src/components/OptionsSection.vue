<template>
	<section class="flex flex-col justify-center items-center gap-4">
		<p class="text-vulcan-950 dark:text-inherit">Tiempo de inspeccion</p>
		<label class="inline-flex items-center cursor-pointer">
			<input
				type="checkbox"
				v-model="store.inspeccionMode"
				class="sr-only peer"
			/>
			<div
				class="relative w-11 h-6 bg-[#dcdde1] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
			></div>
		</label>
		<select
			:class="{ 'opacity-0': !store.inspeccionMode }"
			id="inspeccion"
			class="w-[80px] text-gray-900 text-lg rounded-lg p-2.5 transition-opacity"
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
import { useTimesStore } from "../store/timesStore";
// import {
// 	Listbox,
// 	ListboxButton,
// 	ListboxOptions,
// 	ListboxOption,
// } from "@headlessui/vue";

const store = useTimesStore();
</script>
