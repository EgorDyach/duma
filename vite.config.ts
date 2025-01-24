import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

const aliasFolders = [
  'components',
  'type',
  'lib',
  'modules',
  'store',
  'hooks',
  'hocs',
  'assets',
  'layouts',
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      ...Object.fromEntries(
        aliasFolders.map((v) => [
          `@${v}`,
          `${path.resolve(__dirname, `./src/${v}/`)}`,
        ]),
      ),
      '@public': `${path.resolve(__dirname, './public/')}`,
    },
  },
});
