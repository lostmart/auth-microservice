module.exports = {
	preset: "ts-jest/presets/default-esm",
	testEnvironment: "node",
	roots: ["<rootDir>/__test__"],
	testMatch: ["**/*.test.ts"],
	moduleFileExtensions: ["ts", "js", "json", "node"],
	extensionsToTreatAsEsm: [".ts"],
	globals: {
		"ts-jest": {
			tsconfig: "<rootDir>/tsconfig.json",
			useESM: true,
		},
	},
}
