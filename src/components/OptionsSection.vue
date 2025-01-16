<template>
	<section class="flex flex-col justify-center items-center gap-4">
		<p>Tiempo de inspeccion</p>
		<label class="inline-flex items-center cursor-pointer">
			<input type="checkbox" v-model="isChecked" class="sr-only peer" />
			<div
				class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
			></div>
		</label>
			<select
				:class="{ 'opacity-0': !isChecked}"
				id="inspeccion"
				class="w-[80px] text-gray-900 text-lg rounded-lg p-2.5 transition-opacity"
			>
				<option value="3">3s</option>
				<option value="5">5s</option>
				<option value="10">10s</option>
				<option value="15">15s</option>
			</select>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isChecked = ref(false);
</script>

