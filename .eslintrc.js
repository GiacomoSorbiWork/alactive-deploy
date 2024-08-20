export default {  
  root: true,  
  env: {  
    node: true,  
    es2020: true,  
  },  
  extends: [  
    'eslint:recommended',  
    'plugin:react/recommended',  
    'plugin:react/jsx-runtime',  
    'plugin:@typescript-eslint/recommended',  
  ],  
  parser: '@typescript-eslint/parser',  
  parserOptions: {  
    ecmaVersion: 2020,  
    sourceType: 'module'  
  },  
  rules: {  
    'react/react-in-jsx-scope': 'off',  
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],  
    '@typescript-eslint/no-unused-vars': ['warn'],  
    'no-console': 'warn',  
    'no-debugger': 'warn',  
  },  
  settings: {  
    react: {  
      version: 'detect'  
    }  
  },  
  globals: {  
    process: 'readonly'  
  },  
  overrides: [  
    {  
      files: ['*.ts', '*.tsx'],  
      rules: {  
        '@typescript-eslint/explicit-module-boundary-types': 'off',  
      }  
    }  
  ]  
};