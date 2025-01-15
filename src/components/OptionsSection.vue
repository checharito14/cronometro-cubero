<template>
	<section class="flex flex-col justify-center items-center gap-4">
		<p>Tiempo de inspeccion</p>
		<InspeccionSwitch />
		<select
			id="inspeccion"
			class=" w-[80px] text-gray-900 text-lg rounded-lg p-2.5"
		>
			<option value="3">3s</option>
			<option value="5">5s</option>
			<option value="10">10s</option>
			<option value="15">15s</option>
		</select>
	</section>
</template>

<script setup lang="ts">
import InspeccionSwitch from "./InspeccionSwitch.vue";
</script>
