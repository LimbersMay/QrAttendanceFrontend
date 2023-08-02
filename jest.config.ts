export default {
    testEnvironment: "jest-environment-jsdom",
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    setupFiles: ['./jest.setup.ts'],
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy'
    },
    setupFilesAfterEnv: [
        '<rootDir>/jest.env.ts',
    ]
}