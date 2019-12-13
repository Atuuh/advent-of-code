import { Day } from '#models/solution';
import { multiply } from '#utils/array/reducers';

export const DayTwelve: Day = () => {
    let moons = Input;

    for (let i = 0; i < 1000; i++) {
        moons = simulateTime(moons);
    }

    const partOne = getSystemEnergy(moons);

    moons = Input;
    const initialData = Input;
    const PositionalHistory: Vector3 = createVector3(0, 0, 0);
    let timeStep = 0;

    while (
        PositionalHistory.x === 0 ||
        PositionalHistory.y === 0 ||
        PositionalHistory.z === 0
    ) {
        moons = simulateTime(moons);
        timeStep += 1;
    }

    const partTwo = 0;

    return { partOne, partTwo };
};

const serialiseMoons = (moons: Moon[]): string => {
    return moons.reduce(
        (dataString, moon) =>
            dataString.concat(
                '' +
                    moon.position.x +
                    moon.position.y +
                    moon.position.z +
                    moon.velocity.x +
                    moon.velocity.y +
                    moon.velocity.z
            ),
        ''
    );
};

export const simulateTime = (moons: Moon[]): Moon[] => {
    const moonsAfterGravityApplied = moons.map((moon, _, allMoons) => {
        const otherMoons = allMoons.filter(value => moon != value);
        return applyGravity(moon, otherMoons);
    });
    const moonsAfterVelocityApplied = moonsAfterGravityApplied.map(
        applyVelocity
    );
    return moonsAfterVelocityApplied;
};

export const createVector3 = (x: number, y: number, z: number): Vector3 => {
    return { x, y, z };
};

export const applyGravityPlane = (target: number, source: number): number =>
    target < source ? 1 : target > source ? -1 : 0;

export const applyGravity = (moon: Moon, otherMoons: Moon[]): Moon => {
    return otherMoons.reduce((m, n) => {
        const { position, velocity } = m;
        return {
            position,
            velocity: createVector3(
                velocity.x + applyGravityPlane(position.x, n.position.x),
                velocity.y + applyGravityPlane(position.y, n.position.y),
                velocity.z + applyGravityPlane(position.z, n.position.z)
            ),
        };
    }, moon);
};

export const applyVelocity = ({
    position: oldPosition,
    velocity,
}: Moon): Moon => {
    const position = createVector3(
        oldPosition.x + velocity.x,
        oldPosition.y + velocity.y,
        oldPosition.z + velocity.z
    );

    return {
        position,
        velocity,
    };
};

export const getEnergy = (vector: Vector3) =>
    Math.abs(vector.x) + Math.abs(vector.y) + Math.abs(vector.z);

export const getSystemEnergy = (moons: Moon[]) => {
    const energyLevels = moons.map(({ position, velocity }) => {
        return [getEnergy(position), getEnergy(velocity)];
    });
    return energyLevels.reduce(
        (total, [potentialEnergy, kineticEnergy]) =>
            total + potentialEnergy * kineticEnergy,
        0
    );
};

const initialVelocity: Vector3 = createVector3(0, 0, 0);

const Input: Moon[] = [
    { position: { x: -4, y: 3, z: 15 }, velocity: { ...initialVelocity } },
    { position: { x: -11, y: -10, z: 13 }, velocity: { ...initialVelocity } },
    { position: { x: 2, y: 2, z: 18 }, velocity: { ...initialVelocity } },
    { position: { x: 7, y: -1, z: 0 }, velocity: { ...initialVelocity } },
];

export interface Moon {
    position: Vector3;
    velocity: Vector3;
}

type Vector3 = { x: number; y: number; z: number };
