import {
    Moon,
    applyVelocity,
    createVector3,
    applyGravity,
    getSystemEnergy,
} from './day-12';

describe('2019 - Day Twelve', () => {
    describe('applyGravity', () => {
        test('should correctly apply the gravity of the other moons', () => {
            const velocity = createVector3(0, 0, 0);
            const moon: Moon = {
                position: createVector3(-1, 0, 2),
                velocity,
            };
            const otherMoons: Moon[] = [
                {
                    position: createVector3(2, -10, -7),
                    velocity,
                },
                {
                    position: createVector3(4, -8, 8),
                    velocity,
                },
                {
                    position: createVector3(3, 5, -1),
                    velocity,
                },
            ];
            const expected: Moon = {
                position: createVector3(-1, 0, 2),
                velocity: createVector3(3, -1, -1),
            };

            expect(applyGravity(moon, otherMoons)).toEqual(expected);
        });
    });

    describe('applyVelocity', () => {
        test('should correctly apply the velocity', () => {
            const moon: Moon = {
                position: createVector3(1, 2, 3),
                velocity: createVector3(-2, 0, 3),
            };
            const expected: Moon = {
                position: createVector3(-1, 2, 6),
                velocity: createVector3(-2, 0, 3),
            };

            expect(applyVelocity(moon)).toEqual(expected);
        });
    });

    describe('getSystemEnergy', () => {
        test('Example 1', () => {
            const moons: Moon[] = [
                {
                    position: createVector3(2, 1, -3),
                    velocity: createVector3(-3, -2, 1),
                },
                {
                    position: createVector3(1, -8, 0),
                    velocity: createVector3(-1, 1, 3),
                },
                {
                    position: createVector3(3, -6, 1),
                    velocity: createVector3(3, 2, -3),
                },
                {
                    position: createVector3(2, 0, 4),
                    velocity: createVector3(1, -1, -1),
                },
            ];

            expect(getSystemEnergy(moons)).toBe(179);
        });
    });
});
