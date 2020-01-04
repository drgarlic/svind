module.exports = {
    "env": {
        "browser": true,
        "cypress/globals": true,
        "es6": true,
        "jest": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "cypress",
        "jest",
        "svelte3"
    ],
    "overrides": [
        {
            "files": [ "**/*.svelte" ],
            "processor": "svelte3/svelte3"
        }
    ],
    "rules": {
    }
};
