/** @type {import('jest').Config} */

const path = require("path");
const esModules = [
    "@lumino",
    "lib0",
    "nanoid",
    "y-protocols",
    "internmap",
    "delaunator",
    "robust-predicates",
    "lodash-es",
    "tree-finder",
].join("|");

const config = {
    preset: "ts-jest/presets/js-with-ts",
    reporters: ["default", "jest-junit"],
    testEnvironment: "jsdom",
    testMatch: ["**/tests/unit/**/*.[jt]s?(x)"],
    testPathIgnorePatterns: ["/lib/", "/node_modules/", "node_modules/"],
    transform: {
        "^.+\\.(ts|tsx)$": [
            "ts-jest",
            {
                // in tsconfig.test.json, rootDir is parent of both tests and src dirs
                tsconfig: path.resolve(__dirname, "tsconfig.test.json"),
            },
        ],
    },
    transformIgnorePatterns: [`node_modules/(?!(${esModules}))`],
    verbose: true,
};

module.exports = config;
