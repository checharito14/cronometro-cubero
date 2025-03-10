export interface Solve {
	categoryCube: string;
	scramble: string;
	time: number;
	penalty: boolean;
	isDnf: boolean;
}

export type CubeCategory = "222" | "333" | "444";