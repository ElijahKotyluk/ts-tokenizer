module.exports = {
  preset: 'ts-jest',
  roots: ['tests/'],
  testMatch: ['**/tests/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
};
