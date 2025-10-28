import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv';
import path from 'node:path';
import pkg from './package.json';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

const envVariables: Record<string, string> = {};
for (const key in process.env) {
  if (key.startsWith('VITE_')) {
    envVariables[`process.env.${key}`] = JSON.stringify(
      process.env[key] as string
    );
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  define: {
    envVariables,
    _APP_VERSION_: JSON.stringify(pkg.version),
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
})
