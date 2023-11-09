import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import json from "@rollup/plugin-json";
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';

dotenv.config();

const production = process.env.NODE_ENV == "production";

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/bundle.js'
	},
	plugins: [
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			},
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		// !production && livereload('public'),
		!production && livereload({watch: 'public', port: 35730}),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),
		json(),

		// Assign .env fields as global variables here:
		replace({
			EXHIBITS_API_KEY: JSON.stringify(process.env.EXHIBITS_API_KEY),
			EXHIBITS_INDEX_DOMAIN: JSON.stringify(process.env.EXHIBITS_INDEX_DOMAIN),
			EXHIBITS_INDEX_NAME: JSON.stringify(process.env.EXHIBITS_INDEX_NAME),
			REPOSITORY_DOMAIN: JSON.stringify(process.env.REPOSITORY_DOMAIN),
			REPOSITORY_API_KEY: JSON.stringify(process.env.REPOSITORY_API_KEY),
			REPOSITORY_IIIF_TILESOURCE: JSON.stringify(process.env.REPOSITORY_IIIF_TILESOURCE),
			IIIF_MANIFEST_URL: JSON.stringify(process.env.IIIF_MANIFEST_URL),
			IIIF_IMAGE_SERVER_URL: JSON.stringify(process.env.IIIF_IMAGE_SERVER_URL),
			RESOURCE_LOCATION: JSON.stringify(process.env.RESOURCE_LOCATION)
        }) 
	],
	watch: {
		clearScreen: false
	}
};
