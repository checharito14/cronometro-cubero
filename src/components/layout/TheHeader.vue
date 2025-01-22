<
<template>
	<header>
		<div class="w-[90%] mx-auto h-20 flex items-center justify-between">
			<img src="../../assets/logo_rubik_light.svg" alt="Logo" v-if="!store.darkMode"/>
			<img src="../../assets/logo_rubik.svg" alt="Logo" v-else/>
			
			<ConfigDialog/>
		</div>
	</header>
</template>

<script setup lang="ts">
import ConfigDialog from "../ui/ConfigDialog.vue";
import { useTimesStore } from "../../store/timesStore";

const store = useTimesStore()
</script>
