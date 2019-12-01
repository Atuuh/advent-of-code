export interface Day {
    solve(): Solution;
}

export type Solution = {
    partOne: string | number;
    partTwo: string | number;
};
