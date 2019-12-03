module.exports = {
    roots: ["<rootDir>/src"],
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.test.json"
        }
    },
    moduleNameMapper: {
        "^#aoc/(.*)$": "<rootDir>/$1",
        "^#aoc/utils/(.*)$": "<rootDir>/utils/$1"
    }
};
