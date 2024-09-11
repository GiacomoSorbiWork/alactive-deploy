import { CodegenConfig } from '@graphql-codegen/cli';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

const mode = process.env.NODE_ENV;
const envFile = `.env.${mode}`;
dotenv.config({ path: resolve(__dirname, envFile) });

console.log('Schema URL:', process.env.VITE_API_URL);
console.log(process.env.VITE_API_URL);

const config: CodegenConfig = {
  schema: process.env.VITE_API_URL,
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;