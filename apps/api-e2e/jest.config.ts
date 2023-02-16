/* eslint-disable */
export default {
	displayName: 'api-e2e',
	preset: '../../jest.preset.js',
	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/tsconfig.spec.json',
		},
	},
	globalSetup: '<rootDir>/source/support/global-setup.ts',
	globalTeardown: '<rootDir>/source/support/global-teardown.ts',
	setupFiles: ['<rootDir>/source/support/test-setup.ts'],
	testEnvironment: 'node',
	transform: {
		'^.+\\.[tj]s$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'js', 'html'],
	coverageDirectory: '../../coverage/api-e2e',
};
