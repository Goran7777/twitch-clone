module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
  },
  setupFiles: ['raf/polyfill'],
  testRegex: '/__tests__/.*\\.(ts|tsx|js)$',
  moduleNameMapper: {
    '^.+\\.(css|jpg|png)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: [],
  snapshotSerializers: [],
};
