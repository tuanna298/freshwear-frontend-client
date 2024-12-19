import react from '@vitejs/plugin-react'
import * as path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.join(__dirname, 'src'),
		},
	},
	server: {
		port: 5174,
	},
	esbuild: {
		target: 'esnext',
	},
})
