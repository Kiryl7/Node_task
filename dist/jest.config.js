"use strict";
exports.__esModule = true;
var config = {
    preset: 'ts-jest',
    setupFiles: ['dotenv/config'],
    testEnvironment: 'node',
    testPathIgnorePatterns: ['mocks.[jt]s'],
    testRegex: '/test/.*\\.(test|spec)?\\.(ts|tsx)$'
};
exports["default"] = config;
//# sourceMappingURL=jest.config.js.map