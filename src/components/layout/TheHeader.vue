<
<template>
	<header>
		<div class="w-[90%] mx-auto h-20 flex items-center justify-between">
			<p class="text-m">RubiksTimer</p>
			<div class="cursor-pointer bg-secondary rounded-full p-2">
				<Settings :size="32" />
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import { Settings } from "lucide-vue-next";
</script>
