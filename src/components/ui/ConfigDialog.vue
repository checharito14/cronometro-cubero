<template>
	<div
		class="hover:cursor-pointer bg-vulcan-50 dark:bg-secondary rounded-full p-2"
	>
		<Bolt :size="32" @click="openModal" aria-label="Abrir configuración" />
	</div>

	<!-- Dialog -->
	<TransitionRoot appear :show="isOpen" as="template">
		<Dialog as="div" @close="closeModal" class="relative z-10">
			<TransitionChild
				as="template"
				enter="duration-300 ease-out"
				enter-from="opacity-0"
				enter-to="opacity-100"
				leave="duration-200 ease-in"
				leave-from="opacity-100"
				leave-to="opacity-0"
			>
				<div class="fixed inset-0 bg-black/25" />
			</TransitionChild>

			<div class="fixed inset-0 overflow-y-auto">
				<div
					class="flex min-h-full items-center justify-center p-4 text-center"
				>
					<TransitionChild
						as="template"
						enter="duration-300 ease-out"
						enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100"
						leave="duration-200 ease-in"
						leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95"
					>
						<DialogPanel
							class="w-full max-w-md transform overflow-hidden rounded-2xl bg-vulcan-50 dark:bg-secondary p-6 text-left align-middle shadow-xl transition-all"
						>
							<DialogTitle
								as="h3"
								class="text-lg font-medium leading-6 text-primary dark:text-vulcan-50 p-5 border-vulcan-400 border-b dark:border-inherit mb-5"
							>
								Configuración
							</DialogTitle>

							<div class="h-[250px] relative">
								<!-- Switch de mantener pulsado -->
								<SwitchGroup>
									<div
										class="flex items-center justify-between p-4 text-vulcan-950 dark:text-vulcan-100 border-b border-vulcan-400 dark:border-vulcan-800 text-sm"
									>
										<SwitchLabel
											>Mantener pulsado para
											iniciar</SwitchLabel
										>
										<Switch
											v-model="store.needToHold"
											:class="
												store.needToHold
													? 'bg-blue-600'
													: 'bg-[#dcdde1]'
											"
											class="relative inline-flex h-5 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
										>
											<span
												:class="
													store.needToHold
														? 'translate-x-6'
														: 'translate-x-1'
												"
												class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
											/>
										</Switch>
									</div>
								</SwitchGroup>
								<!-- Switch del tema -->
								<SwitchGroup>
									<div
										class="flex items-center justify-between p-5 text-vulcan-950 dark:text-vulcan-100 border-b dark:border-vulcan-800 border-vulcan-400 text-sm"
									>
										<SwitchLabel>Modo: </SwitchLabel>

										<div class="flex items-center">
											<SwitchLabel
												class="text-xs text-vulcan-800 dark:text-vulcan-400"
												>Claro</SwitchLabel
											>
											<Switch
												v-model="store.darkMode"
												@update:modelValue="
													store.saveDarkMode
												"
												:class="
													store.darkMode
														? 'bg-blue-600'
														: 'bg-[#dcdde1]'
												"
												class="relative inline-flex h-5 w-11 mx-5 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
											>
												<span
													:class="
														store.darkMode
															? 'translate-x-6'
															: 'translate-x-1'
													"
													class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
												/>
											</Switch>
											<SwitchLabel
												class="text-xs text-vulcan-800 dark:text-vulcan-400"
												>Oscuro</SwitchLabel
											>
										</div>
									</div>
								</SwitchGroup>

								<div
									class="flex items-center justify-between p-4 text-vulcan-950 dark:text-vulcan-100 border-b border-vulcan-400 dark:border-vulcan-800 text-sm transition-all"
								>
									<p>
										{{
											!confirmDelete
												? "Borrar tiempos:"
												: "¿Estas seguro?"
										}}
									</p>
									<div>
										<button
											class="text-red-950 dark:text-red-600 bg-red-600 dark:bg-red-900 py-1 px-2 rounded-md"
											@click="handleConfirm"
											v-if="!confirmDelete"
										>
											Eliminar
										</button>

										<template v-else>
											<button
												class="text-secondary dark:text-vulcan-100 mr-6 py-1 px-2"
												@click="deleteSolves"
											>
												Si
											</button>
											<button
												class="text-red-600"
												@click="confirmDelete = false"
											>
												No
											</button>
										</template>
									</div>
								</div>

								<a
									href="https://www.freepik.com/icon/game_11066924#fromView=author&page=1&position=10&uuid=1b7951b8-2455-46b0-b5b2-e1c7598a93c1"
									target="_blank"
									class="text-vulcan-800 dark:text-vulcan-400 absolute bottom-0 right-0 text-sm"
									>Icon by rcherem</a
								>
							</div>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
			.
		</Dialog>
	</TransitionRoot>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import { Bolt } from "lucide-vue-next";
import { useTimesStore } from "../../store/timesStore";

import {
	TransitionRoot,
	TransitionChild,
	Dialog,
	DialogPanel,
	DialogTitle,
} from "@headlessui/vue";

const store = useTimesStore();

const isOpen = ref(false);
const confirmDelete = ref(false);

const handleConfirm = () => {
	confirmDelete.value = !confirmDelete.value;
};

const deleteSolves = () => {
	if (!store.solves.length) {
		confirmDelete.value = false;
		return;
	}
	store.clearSolves();
	confirmDelete.value = false;
};

watchEffect(() => {
	const html = document.documentElement;
	if (store.darkMode) {
		html.classList.add("dark");
	} else {
		html.classList.remove("dark");
	}
});

function closeModal() {
	confirmDelete.value = false;
	isOpen.value = false;
}
function openModal() {
	isOpen.value = true;
}
</script>
