/** @type {import('ts-jest').JestConfigWithTsJest} */
import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
    clearMocks: true,
    coverageProvider: "v8",
    moduleFileExtensions: ["js", "ts", "node", "json"],
  
    roots: ["<rootDir>"],
  
    testMatch: ["**/tests/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
    },
}

export default config