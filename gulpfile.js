'use strict'

const sourcemaps = require('gulp-sourcemaps') //Mapea codigo SASS para debug no console
const sass = require('gulp-sass')(require('sass')) //SASS
const autoprefixer = require('autoprefixer') //Aplica prefixo de navegadores antigos
const postcss = require('gulp-postcss') //PostCSS
const cssnano = require('cssnano') //Minifica css
const mqpacker = require('css-mqpacker') //Unifica todas as @medias da mesma condição em apenas uma
const terser = require('gulp-terser') //Minifica os arquivos js
const webp = require('gulp-webp') //transforma imagens para o formato webp
const changed = require('gulp-changed') //Verifica se houve alterações
const rename = require('gulp-rename') // Renomeia arquivos
const browserSync = require('browser-sync').create() //Synca os arquivos com o browser e faz o proxy reverso dos arquivos
const browserify = require('browserify') //Converte commonJs para ES
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const babelify = require('babelify') //Transpila arquivos js para versões antigas do ES
const glob = require('glob') //Possibilita o uso da escrita do terminal no browserify
const gulp = require('gulp')
const tsify = require('tsify')

const paths = {
	dist: {
		dest: '/'
	},
	templates: {
		src: './src/templates/**/*.html',
		dest: './build/templates/',
		init: './src/templates_init/**/*.html',
		dest_init: './src/templates'
	},
	styles: {
		input: './src/styles/*.scss',
		dest: './build/arquivos/',
		src: './src/styles/**/*.scss'
	},
	scripts: {
		input: './src/scripts/main.ts',
		dest: './build/arquivos/',
		src: './src/scripts/**/*.ts'
	},
	images: {
		src: './src/images/*',
		dest: './build/arquivos/'
	}
}

gulp.task('style', function () {
	let processors = [autoprefixer, cssnano, mqpacker]
	return gulp
		.src(paths.styles.input)
		.pipe(sass())
		.pipe(rename(`loja-map-page-style.css`))
		.pipe(postcss(processors))
		.pipe(gulp.dest(paths.styles.dest))
})

gulp.task('style-dev', function () {
	let processors = [autoprefixer, mqpacker]
	return gulp
		.src(paths.styles.input)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(rename(`style.css`))
		.pipe(postcss(processors))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.styles.dest))
})

gulp.task('script', function () {
	const testFiles = glob.sync(paths.scripts.input)
	return browserify({
		entries: testFiles
	})
		.plugin(tsify)
		.transform(
			babelify.configure({
				presets: ['@babel/env'],
				plugins: ['@babel/plugin-transform-runtime']
			})
		)
		.bundle()
		.pipe(source(`loja-map-page-script.js`))
		.pipe(buffer())
		.pipe(
			terser({
				toplevel: true
			})
		)
		.pipe(gulp.dest(paths.scripts.dest))
})

gulp.task('script-dev', function () {
	return browserify(paths.scripts.input, {
		debug: true,
	})
		.plugin(tsify)
		.transform(
			babelify.configure({
				presets: ['@babel/env'],
				plugins: ['@babel/plugin-transform-runtime'],
				sourceMaps: true
			})
		)
		.bundle()
		.pipe(source(`index.js`))
		.pipe(buffer())
		.pipe(gulp.dest(paths.scripts.dest))
		.on('finish', () => browserSync.active && browserSync.reload())
})

gulp.task('transformto-webp', function () {
	return gulp
		.src(paths.images.src)
		.pipe(changed(paths.images.src))
		.pipe(webp())
		.pipe(gulp.dest(paths.images.dest))
})

gulp.task('startDevServer', () => {
	browserSync.init(
		{
			ui: false,
			server: { baseDir: './' },
			port: 3001
		},
		() => console.log('\n\x1b[32mServer online\x1b[0m') // <green>Server online</green>
	)
})

// const watch = () => {
// 	gulp
// 		.watch(paths.styles.src, gulp.series('style'))
// 		.on('change', browserSync.reload)
// 	gulp
// 		.watch(paths.scripts.src, gulp.series('script'))
// 		.on('change', browserSync.reload)
// 	// gulp
// 	// 	.watch(paths.images.src, gulp.series('image-minify'))
// 	// 	.on('change', browserSync.reload)
// }

const watchDev = () => {
	gulp
		.watch(paths.styles.src, gulp.series('style-dev'))
		.on('change', () => browserSync.reload('*.css'))
	gulp.watch(paths.scripts.src, gulp.series('script-dev'))
}

gulp.task(
	'dev',
	gulp.parallel('style-dev', 'script-dev', 'startDevServer', watchDev)
)
gulp.task('build', gulp.parallel('style', 'script'))
