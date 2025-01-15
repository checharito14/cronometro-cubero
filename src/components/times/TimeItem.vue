<template>
	<div class="flex justify-between items-center">
		<p>18.54</p>
		<p class="tracking-widest text-sm text-gris">F U R F L B D</p>
		<div class="flex gap-3">
			<p class="hover:text-[#09BC8A] cursor-pointer">+2</p>
			<p class="hover:text-[#FFA62B] cursor-pointer">DNF</p>
			<Trash class="cursor-pointer"/>
		</div>
	</div>
    
</template>

<script setup lang="ts">
import { Trash } from "lucide-vue-next";
</script>
