<script setup lang="ts">
import TheFooter from "./components/layout/TheFooter.vue";
import TheHeader from "./components/layout/TheHeader.vue";
import OptionsSection from "./components/OptionsSection.vue";
import StatsSection from "./components/StatsSection.vue";
import TimerDisplay from "./components/TimerDisplay.vue";
import TimesSection from "./components/TimesSection.vue";
</script>

<template>
	<div class="text-white">
		<TheHeader />
		<TimerDisplay />
		<div
			class="flex flex-col m-auto w-[85%] md:w-[95%] md:grid md:grid-cols-[2fr_1fr_2fr] gap-12"
		>
			<StatsSection />
			<OptionsSection />
			<TimesSection />
		</div>
		<TheFooter />
	</div>
</template>

<style scoped></style>
