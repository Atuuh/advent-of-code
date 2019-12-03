import { Solution } from "#aoc/day";
import { Input } from "./input";

export const DayThree = (): Solution => {
    const wires = Input.split("\n").map(wire => wire.split(","));

    const partOne = "";
    const partTwo = "";

    return {
        partOne,
        partTwo
    };
};

export const findClosestIntersection = ([wire1, wire2]: string[][]): number => {
    //convert inputs into filled array
    // filter arrays against each other  to find where the cross
    // find one with shortest manhattan distance
    return 0;
};

export const getManhattanDistance = (
    point: { x: number; y: number },
    origin = { x: 0, y: 0 }
): number => {
    return Math.abs(origin.x - point.x) + Math.abs(origin.y - point.y);
};
