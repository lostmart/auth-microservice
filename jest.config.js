// jest.config.js
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	roots: ["<rootDir>/src"],
	testMatch: ["**/__test__/**/*.test.ts"],
	moduleFileExtensions: ["ts", "js", "json"],
	collectCoverageFrom: [
		"src/**/*.ts",
		"!src/**/*.test.ts",
		"!src/**/__test__/**",
		"!src/index.ts",
	],
	coverageThreshold: {
		global: {
			branches: 32,
			functions: 40,
			lines: 50,
			statements: 50,
		},
	},
}
