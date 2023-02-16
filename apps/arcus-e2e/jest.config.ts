/* eslint-disable */
export default {
	displayName: 'arcus-e2e',
	preset: '../../jest.preset.js',
	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/tsconfig.spec.json',
		},
	},
	globalSetup: '<rootDir>/src/support/global-setup.ts',
	globalTeardown: '<rootDir>/src/support/global-teardown.ts',
	setupFiles: ['<rootDir>/src/support/test-setup.ts'],
	testEnvironment: 'node',
	transform: {
		'^.+\\.[tj]s$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'js', 'html'],
	coverageDirectory: '../../coverage/arcus-e2e',
};
