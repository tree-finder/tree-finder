/** @type {import('jest').Config} */

const config = {
    preset: "ts-jest/presets/js-with-ts",
    reporters: ["default", "jest-junit"],
    testEnvironment: "jsdom",
    testMatch: ["**/tests/unit/**/*.[jt]s?(x)"],
    testPathIgnorePatterns: ["/lib/", "/node_modules/"],
    transform: {
        "^.+\\.(ts|tsx)$": [
            "ts-jest",
            {
                // in tsconfig.test.json, rootDir is parent of both tests and src dirs
                tsconfig: "tsconfig.test.json",
            },
        ],
    },

    verbose: true,
};

module.exports = config;

// Saving this here for later work
// const esModules = ["@lumino", "lib0", "nanoid", "y-protocols", "internmap", "delaunator", "robust-predicates", "lodash-es", "tree-finder"].join("|");
// transformIgnorePatterns: [`node_modules/(?!(${esModules}))`],
