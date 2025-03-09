import { defineStore } from "pinia";
import { useSolvesStore } from "./solvesStore";

interface AvgState {
	bestAvg: {
		[key: number]: number | null;
	};
}

export const useAvgStore = defineStore("avg", {
	state: (): AvgState => ({
		bestAvg: {
			3: null as number | null,
			5: null as number | null,
			12: null as number | null,
		},
	}),
	actions: {
		getBestTime() {
			const solvesStore = useSolvesStore();
			const solves = solvesStore.solves;
			if (solves.length === 0) return "-";
			const validTimes = solves
				.filter((solve) => !solve.isDnf)
				.map((solve) => solve.time);
			if (validTimes.length === 0) return "-";

			const best = Math.min(...validTimes);
			return best.toFixed(2);
		},

		getWorstTime() {
			const solvesStore = useSolvesStore();
			const solves = solvesStore.solves;
			if (solves.length === 0) return "-";
			const validTimes = solves
				.filter((solve) => !solve.isDnf)
				.map((solve) => solve.time);
			if (validTimes.length === 0) return "-";

			const worst = Math.max(...validTimes);

			return worst.toFixed(2);
		},

		getPromedioTime() {
			const solvesStore = useSolvesStore();
			const solves = solvesStore.solves;
			if (solves.length === 0) return "-";
			const validTimes = solves
				.filter((solve) => !solve.isDnf)
				.map((solve) => solve.time);
			if (validTimes.length === 0) return "-";

			const total = validTimes.reduce((sum, time) => sum + time, 0);
			const avg = total / solves.length;

			return avg.toFixed(2);
		},

		calculateAvg(count: number): string {
			const solvesStore = useSolvesStore();
			const solves = solvesStore.solves;
			if (solves.length < count) return "-";

			const lastSolves = solves.slice(0, count);

			// Separate DNF and valid solves
			const dnfSolves = lastSolves.filter((solve) => solve.isDnf);
			const validSolves = lastSolves.filter((solve) => !solve.isDnf);

			// Check DNF conditions
			if (count === 3 && dnfSolves.length > 0) return "DNF";
			if (count === 5 && dnfSolves.length > 1) return "DNF";
			if (count === 12 && dnfSolves.length > 2) return "DNF";

			// Sort valid times
			const sortedTimes = validSolves
				.map((solve) => solve.time)
				.sort((a, b) => a - b);

			// Add DNF times at the end
			const allSortedTimes = [
				...sortedTimes,
				...dnfSolves.map(() => Infinity),
			];

			// Determine how many times to remove
			const trimCount = count > 3 ? 1 : 0;

			// Slice the array, removing the lowest and highest times if necessary
			const timesToAvg = allSortedTimes.slice(
				trimCount,
				count - trimCount
			);

			// Calculate average only on non-DNF (finite) times
			const validTimesToAvg = timesToAvg.filter((time) => isFinite(time));

			if (validTimesToAvg.length === 0) return "DNF";

			const total = validTimesToAvg.reduce((sum, time) => sum + time, 0);
			const currentAvg = total / validTimesToAvg.length;

			return currentAvg.toFixed(2);
		},

		calculateBestAvg(count: number): string | null {
			const solvesStore = useSolvesStore();
			const solves = solvesStore.solves;
			if (solves.length < count) return "-";

			const lastSolves = solves.slice(0, count);

			// Separate DNF and valid solves
			const dnfSolves = lastSolves.filter((solve) => solve.isDnf);
			const validSolves = lastSolves.filter((solve) => !solve.isDnf);

			// Check DNF conditions
			if (count === 3 && dnfSolves.length > 0) return null;
			if (count === 5 && dnfSolves.length > 1) return null;
			if (count === 12 && dnfSolves.length > 2) return null;

			// Sort valid times
			const sortedTimes = validSolves
				.map((solve) => solve.time)
				.sort((a, b) => a - b);

			// Add DNF times at the end
			const allSortedTimes = [
				...sortedTimes,
				...dnfSolves.map(() => Infinity),
			];

			// Determine how many times to remove
			const trimCount = count > 3 ? 1 : 0;

			// Slice the array, removing the lowest and highest times if necessary
			const timesToAvg = allSortedTimes.slice(
				trimCount,
				count - trimCount
			);

			// Calculate average only on non-DNF (finite) times
			const validTimesToAvg = timesToAvg.filter((time) => isFinite(time));

			if (validTimesToAvg.length === 0) return null;

			const total = validTimesToAvg.reduce((sum, time) => sum + time, 0);
			const currentAvg = total / validTimesToAvg.length;

			let bestAvg = this.bestAvg[count];

			if (bestAvg === null || currentAvg < bestAvg) {
				bestAvg = currentAvg;
			}

			return bestAvg.toFixed(2);
		},
	},
});
