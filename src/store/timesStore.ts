import { defineStore } from "pinia";

export interface Solve {
    scramble: string;
    time: string
}

export const useTimesStore = defineStore('times', {
    state: () => ({
        solves: [] as Solve[]
    }),
    actions: {
        addSolve(solve: Solve) {
            this.solves.push(solve)
        }
    }
})