module.exports = {
    verbose: true,
    transform: {
        "^.+\\.js$": "babel-jest",
        "^.+\\.svelte$": "svelte-jester"
    },
    coverageReporters: [
        "text"
    ],
    moduleFileExtensions: [
        "js",
        "svelte"
    ],
    moduleNameMapper: {
        "src/(.*)$": "<rootDir>/src/$1"
    },
    setupFilesAfterEnv: [
        "@testing-library/jest-dom/extend-expect"
    ]
};
