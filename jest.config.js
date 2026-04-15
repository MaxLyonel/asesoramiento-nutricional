module.exports = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: 'src',
	testRegex: '.*\\.spec\\.ts$',
	transform: {
		'^.+\\.(t|j)s$': ['ts-jest', { isolatedModules: true }],
	},
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/$1',
	},
	collectCoverageFrom: [
		'**/*.(t|j)s',
		'!**/*.spec.ts',
		'!**/__tests__/**',
		'!**/node_modules/**',
		'!src/main.ts',
	],
	coverageDirectory: '../coverage',
	testEnvironment: 'node',
	setupFilesAfterEnv: [],
	testTimeout: 10000,
};
