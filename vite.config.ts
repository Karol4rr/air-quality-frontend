import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
	plugins: [react(), tailwindcss(), svgr()],
	base: command === 'build' ? '/air-quality-frontend/' : '/',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
}));
