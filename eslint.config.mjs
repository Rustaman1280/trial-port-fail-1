import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{ts,tsx,mdx}"],
    languageOptions: {
      globals: {
        React: "writable",
      },
    },
    rules: {
      "@next/next/no-img-element": "off",
      "react/no-unescaped-entities": "off",
    },
  },
  {
    files: ["**/*.test.{ts,tsx}", "**/__tests__/**/*.{ts,tsx}", "vitest.setup.{ts,tsx}"],
    languageOptions: {
      globals: {
        vi: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "contentlayer/generated/**",
      "public/sw.js",
    ],
  },
];

export default eslintConfig;
