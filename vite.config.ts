import { copyFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { defineConfig, type Plugin } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** GitHub Pages workaround */
const spaGithubPages404 = (): Plugin => {
	return {
		name: 'spa-github-pages-404',
		closeBundle() {
			const dist = path.resolve(__dirname, 'dist');
			copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'));
		},
	};
};

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
	plugins: [react(), tailwindcss(), svgr(), ...(command === 'build' ? [spaGithubPages404()] : [])],
	base: command === 'build' ? '/air-quality-frontend/' : '/',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
}));
