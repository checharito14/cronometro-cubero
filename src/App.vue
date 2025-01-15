<script setup lang="ts">
import TheHeader from "./components/layout/TheHeader.vue";
import OptionsSection from "./components/OptionsSection.vue";
import StatsSection from "./components/StatsSection.vue";
import TimerDisplay from "./components/TimerDisplay.vue";
import TimesSection from "./components/times/TimesSection.vue";
</script>

<template>
	<div class="bg-primary min-h-screen text-white">
		<TheHeader />
		<TimerDisplay />
		<div class="flex flex-col m-auto w-[90%] md:grid md:grid-cols-3 gap-12">
			<StatsSection  />
			<OptionsSection />
			<TimesSection />
		</div>
	</div>
</template>

<style scoped></style>
