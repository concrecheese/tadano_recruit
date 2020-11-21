const gulp = require('gulp');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const browsersync = require('browser-sync').create();
const log = require('fancy-log');
const sourcemaps = require('gulp-sourcemaps');
// var appRoot = require('app-root-path');

// mode
const mode = require('gulp-mode')({
	modes: ['pro', 'development'],
	default: 'development',
	verbose: false
});

// 画像
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const gifsicle = require('imagemin-gifsicle');
const svgo = require('imagemin-svgo');
const webp = require('imagemin-webp');

// 整形
const beautify = require('gulp-jsbeautifier');
const prettier = require('gulp-prettier');

// html
const ejs = require('gulp-ejs');
const ejsLint = require('ejs-lint');

// css
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('autoprefixer');
const gulpStylelint = require('gulp-stylelint');
const postcss = require('gulp-postcss');
const mmq = require('gulp-merge-media-queries');
const purgecss = require('gulp-purgecss');
const critical = require('critical').stream;

// js
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;

// PATHS
// ======================================================================

// パスの指定に使う材料 指定には使わない
const root = {
	root: '.',
	src: 'src/',
	dest: 'dest/',
	build: 'build/'
};

// 共通フォルダの抽出 指定には使わない
const dir = {
	// IMGディレクトリの場所
	img: 'assets/img/'
};

// ------------------------------

// PATHS
const paths = {
	root: root.root,
	src: root.src,
	dest: root.dest,
	build: root.build,

	html: root.dest,
	css: root.dest + 'assets/css/',
	js: root.dest + 'assets/js/',

	// IMG
	imgSrc: root.src + dir.img,
	imgDest: root.dest + dir.img,
	webpSrc: root.src + dir.img,
	webpDest: root.dest + dir.img + 'webp/',
	inlineSrc: root.src + dir.img + 'svg_inline/',
	inlineDest: root.build + dir.img + 'svg_inline_min/',

	// EJS HTML
	ejsSrc: root.src + 'ejs/',
	ejsDest: root.dest,

	// SASS CSS
	sassSrc: root.src + 'assets/sass/',
	sassDest: root.dest + 'assets/css/',
	cssMinDest: root.build + 'assets/css/',
	cssCriticalDest: root.dest + 'assets/css/critical/',

	// JS
	jsSrc: root.src + 'assets/js/', // webpack
	jsBuild: root.build + 'assets/js/',
	jsDest: root.dest + 'assets/js/',

	jsSrcConcat: root.src + 'assets/jsConcat/', // concat
	jsSrcSimple: root.src + 'assets/jsSimple/', // simple

	// LICENSE.maps
	license: root.dest + 'license/',
	maps: root.build + 'maps/'
};

// FILE
const file = {
	index: 'index.html',

	html: '**/*.html',
	ejs: '**/*.ejs',
	ejsModules: '**/_*.ejs',
	css: '**/*.css',
	sass: '**/*.scss',
	js: '**/*.js',

	img: '**/*.{jpg,png,svg,gif}',
	bitmap: '**/*.{jpg,png}',
	svg: '**/*.svg',

	all: '**/*'
};

/* ==========================================================================

    THIS PROJECT

========================================================================== */

// Webpack
// ======================================================================

// ここで指定したもののみ、dest（本番）ディレクトリに送る。
// 指定したjsファイルと同名のライセンスファイルも、本番環境の指定の場所にコピーされる。
// htmlのlinkの修正は手作業。
const publicFileName = {
	js01: 'main',
	js02: 'vender.min'
	// js03: '',
	// js04: ''
};

// JsFile
const publicJsFile = [
	paths.jsBuild + publicFileName.js01 + '.js',
	paths.jsBuild + publicFileName.js02 + '.js'
	// paths.jsBuild + publicFileName.js03 + '.js',
	// paths.jsBuild + publicFileName.js04 + '.js'
];

// LicenseFile
const publicLicenseFile = [
	paths.jsBuild + publicFileName.js01 + '.licenses.txt',
	paths.jsBuild + publicFileName.js02 + '.licenses.txt'
	// paths.jsBuild + publicFileName.js03 + '.licenses.txt',
	// paths.jsBuild + publicFileName.js04 + '.licenses.txt'
];

// CSS ------------------------------

// criticalCSSを作る対象となるhtml
// ルートを場所指定済み・そこからの相対パス＆ファイル名
// 基本html全部で良いかな？
const criticalCssFile = [paths.html + file.html];

/* ==========================================================================

    BROWSERSYNC

========================================================================== */

// 動的サイトはproxy,静的サイトはserver,

// 動的サイト
// const browsersyncOption = {
// 	proxy: 'tempTest/', // Local by Flywheelのドメイン Webアプリケーションが動作しているアドレス(例ではIPアドレス)
// 	open: true,
// 	watchOptions: {
// 		debounceDelay: 1000
// 	},
// 	browser: ['google chrome']
// };

// 静的サイト
const browsersyncOption = {
	notify: false,
	port: 5000,
	server: {
		baseDir: paths.dest,
		index: file.index
	},
	open: 'external',
	watchOptions: {
		debounceDelay: 1000
	},
	browser: ['google chrome']
};

function buildserver(done) {
	browsersync.init(browsersyncOption);
	done();
}

function browserReload(done) {
	browsersync.reload();
	done();
}

/* ==========================================================================

    IMG

========================================================================== */

// jpeg,png,svg,gif
const imgminOption = [
	mozjpeg({
		quality: 80
	}),
	pngquant({
		quality: [0.65, 0.8]
	}),
	gifsicle(),
	svgo({
		plugins: [
			{ removeViewBox: false },
			{ removeMetadata: false },
			{ removeUnknownsAndDefaults: false },
			{ convertShapeToPath: false },
			{ collapseGroups: false },
			{ cleanupIDs: false }
		]
	})
];

// webp
const webpOption = [
	webp({
		quality: 70
	})
];

// inlinesvg
const inlineSvgOption = [
	svgo({
		plugins: [
			{ removeViewBox: false },
			{ removeMetadata: false },
			{ removeUnknownsAndDefaults: false },
			{ convertShapeToPath: false },
			{ collapseGroups: false },
			{ cleanupIDs: false },
			{ removeXMLNS: false } // インラインSVGはXMLNSを消すかどうか
		]
	})
];

// img function ----------------------------------

function imgMinMain() {
	return gulp
		.src(
			[
				paths.imgSrc + file.img,
				'!' + paths.inlineSrc + file.all,
				'!' + paths.inlineDest + file.all
			],
			{
				since: gulp.lastRun(imgMinMain)
			}
		)
		.pipe(
			plumber({
				errorHandler: notify.onError({
					title: 'メイン画像圧縮失敗',
					message: '<%= error.message %>'
				})
			})
		)
		.pipe(imagemin(imgminOption))
		.pipe(gulp.dest(paths.imgDest));
}

function imgMinWebp() {
	return gulp
		.src(paths.webpSrc + file.bitmap, {
			since: gulp.lastRun(imgMinWebp)
		})
		.pipe(
			plumber({
				errorHandler: notify.onError({
					title: 'ウェッピー失敗',
					message: '<%= error.message %>'
				})
			})
		)
		.pipe(imagemin(webpOption))
		.pipe(rename({ extname: '.webp' }))
		.pipe(gulp.dest(paths.webpDest));
}

function imgMinInlineSvg() {
	return gulp
		.src(paths.inlineSrc + file.svg, {
			since: gulp.lastRun(imgMinInlineSvg)
		})
		.pipe(
			plumber({
				errorHandler: notify.onError({
					title: 'インラインSVG失敗',
					message: '<%= error.message %>'
				})
			})
		)
		.pipe(imagemin(inlineSvgOption))
		.pipe(gulp.dest(paths.inlineDest));
}

/* ==========================================================================

    EJS

========================================================================== */

// .pipe(ejs({}, { rmWhitespace: true }, { ext: '.html' }))

function buildhtml() {
	return gulp
		.src([paths.ejsSrc + file.ejs, '!' + paths.ejsSrc + file.ejsModules])
		.pipe(
			plumber({
				errorHandler: notify.onError({
					title: 'htmlコンパイル失敗',
					message: '<%= error.message %>'
				})
			})
		)
		.pipe(mode.development(sourcemaps.init()))
		.pipe(ejs({}, {}, { ext: '.html' }))
		.pipe(rename({ extname: '.html' }))
		.pipe(prettier())
		.pipe(mode.development(sourcemaps.write('./maps/html/')))
		.pipe(gulp.dest(paths.ejsDest))
		.pipe(browsersync.stream());
}

/* ==========================================================================

    SASS

========================================================================== */

// .pipe(mmq()) //メディアクエリを最後にまとめるばいい追加
// .pipe(prettier())//プリティアを使用する場合

function buildcss() {
	return gulp
		.src(paths.sassSrc + file.sass)
		.pipe(
			plumber({
				errorHandler: notify.onError({
					title: 'SASSコンパイル失敗',
					message: '<%= error.message %>'
				})
			})
		)
		.pipe(mode.development(sourcemaps.init()))
		.pipe(sassGlob()) // Sassの@importにおけるglobを有効にする
		.pipe(sass({ outputStyle: 'expanded' }))
		.pipe(postcss([autoprefixer({ cascade: false })]))
		.pipe(
			gulpStylelint({
				fix: true,
				failAfterError: false // lintのエラーで止めない・コンソール出さない
			})
		)
		.pipe(mode.development(sourcemaps.write('../../maps/css/')))
		.pipe(gulp.dest(paths.sassDest))
		.pipe(browsersync.stream());
}

/* ==========================================================================

    CSS

========================================================================== */

/* PURGE_CSS ========================================================= */

const purgeContent = [paths.html + file.html, paths.js + file.js];
const purgeWhitelist = ['', ''];

// 未使用クラスの抽出・保存
function purgeCssRejected() {
	return gulp
		.src([paths.css + file.css, '!' + paths.css + 'critical/**/*'])
		.pipe(
			plumber({
				errorHandler: notify.onError({
					title: '未使用クラスの抽出・保存失敗',
					message: '<%= error.message %>'
				})
			})
		)
		.pipe(rename({ suffix: '.rejected' }))
		.pipe(
			purgecss({
				content: purgeContent,
				whitelist: purgeWhitelist,
				rejected: true
			})
		)
		.pipe(gulp.dest(paths.cssMinDest));
}

// 未使用クラスの削除
function purgeCssProduction() {
	return gulp
		.src([paths.css + file.css, '!' + paths.css + 'critical/**/*'])
		.pipe(
			plumber({
				errorHandler: notify.onError({
					title: '未使用クラスの削除失敗',
					message: '<%= error.message %>'
				})
			})
		)
		.pipe(
			purgecss({
				content: purgeContent,
				whitelist: purgeWhitelist
			})
		)
		.pipe(
			gulpStylelint({
				fix: true,
				failAfterError: false
			})
		)
		.pipe(gulp.dest(paths.css));
}

/* CRITICAL_CSS ========================================================= */

// criticalCSS
// https://www.npmjs.com/package/critical

// base: paths.dest,
// html: file.html, // src option.より優先
// folder: paths.html, // htmlファイルのソースフォルダhtmlオプションと合わせて使用される
// src: paths.html + '/' + file.index, // HTMLソースファイル 配列は無理 gulp部分でOK
// dest: paths.css, //gulp部分でOK
// penthouse: { timeout: 60000 }

// criticalCSSを作りたいhtmlファイルをONに

const criticalOption = {
	inline: false, // trueはhtml作成, falseはcss作成
	css: [paths.css + 'style.css'], // 参照するcssこれを書かないと読み散るhtmlに書かれたcssのパス全部見に行く
	ignore: ['font-face'], // ignore CSS rules
	minify: true,
	width: 1400,
	height: 1400
};

// ----------------------------------

function criticalCss() {
	return gulp
		.src(criticalCssFile)
		.pipe(
			plumber({
				errorHandler: notify.onError({
					title: 'クリティカルCSS作成失敗',
					message: '<%= error.message %>'
				})
			})
		)
		.pipe(critical(criticalOption))
		.on('error', function (err) {
			log.error(err.message);
		})
		.pipe(
			// ファイルネームに-criticalを付ける
			rename(function (path) {
				path.basename += '-critical';
			})
		)
		.pipe(gulp.dest(paths.cssCriticalDest));
}

/* ==========================================================================

    JS

========================================================================== */

/* WEBPACK ========================================================= */

function buildjs() {
	return webpackStream(webpackConfig, webpack)
		.on('error', function (e) {
			this.emit('end');
		})
		.pipe(gulp.dest(paths.jsBuild));
}

// JsFileをコピー
function destJs() {
	return gulp
		.src(publicJsFile) //
		.pipe(gulp.dest(paths.jsDest));
}

// LicenseFileをコピー
function destLicense() {
	return gulp
		.src(publicLicenseFile) //
		.pipe(gulp.dest(paths.license));
}

// webpack側から使おうとした名残？
exports.destjs = destJs;
exports.destlicense = destLicense;

/* CONCAT ========================================================= */

// gulp-concatでシンプルに合体
// バベル設定↓
// https://babeljs.io/docs/en/usage
// babel.config.jsonがあっても、こちらにオプションの記述があればこっちが優先ぽい
// babelでプリセットを全部オフにすると、コメントのみオフにできる

// 共通plumber設定
const buildjsConcatPlumber = {
	errorHandler: notify.onError({
		title: 'jsコンパイル失敗-concat',
		message: '<%= error.message %>'
	})
};

// 共通バベル設定
const buildjsConcatBabel = {
	comments: false,

	// バベルを通したくないもの=minifyしたもの（コメントが消せないが、通すと正常に機能しなくなる）
	ignore: [
		paths.jsSrcConcat + 'modules/swiper-bundle.min.js',
		paths.jsSrcConcat + 'modules/swiper5_4_5.js',
		paths.jsSrcConcat + 'modules/swiper5_4_5.min.js',
		paths.jsSrcConcat + 'modules/what-input.min.js'
	],
	presets: [
		[
			'@babel/preset-env',
			{
				modules: 'auto', // webpackではfalse・推奨初期値はauto
				useBuiltIns: 'usage', // usageは自動・entryは手動
				corejs: 3,
				targets: {
					// ie: '11'
				}
			}
		]
	]
};

// concatのコンパイル設定
// ----------------------------------

// 01
const concatFile01 = 'main.js';
const concatEntry01 = [
	paths.jsSrcConcat + 'modules/loading.js',
	// paths.jsSrcConcat + 'modules/drawer.js',
	paths.jsSrcConcat + 'modules/what-input.min.js'
];

// 02
const concatFile02 = 'vender-swiper.js';
const concatEntry02 = [
	paths.jsSrcConcat + 'modules/swiper5_4_5.min.js',
	paths.jsSrcConcat + 'modules/swiper-overwrite.js'
];

// 03
const concatFile03 = '';
const concatEntry03 = [paths.jsSrcConcat + ''];

// 04
const concatFile04 = '';
const concatEntry04 = [paths.jsSrcConcat + ''];

// concat内容ｓ
// ----------------------------------

// concat01
function buildjsConcat01() {
	return (
		gulp
			.src(concatEntry01)
			.pipe(plumber(buildjsConcatPlumber))
			.pipe(mode.development(sourcemaps.init()))
			.pipe(babel(buildjsConcatBabel))
			.pipe(concat(concatFile01))
			.pipe(prettier())
			// .pipe(mode.production(uglify()))
			.pipe(mode.development(sourcemaps.write('../../maps/js/')))
			.pipe(gulp.dest(paths.jsDest))
	);
}

// concat02
function buildjsConcat02() {
	return gulp
		.src(concatEntry02)
		.pipe(plumber(buildjsConcatPlumber))
		.pipe(mode.development(sourcemaps.init()))
		.pipe(babel(buildjsConcatBabel))
		.pipe(concat(concatFile02))
		.pipe(prettier())
		.pipe(mode.development(sourcemaps.write('../../maps/js/')))
		.pipe(gulp.dest(paths.jsDest));
}

// concat03
function buildjsConcat03() {
	return gulp
		.src(concatEntry03)
		.pipe(plumber(buildjsConcatPlumber))
		.pipe(mode.development(sourcemaps.init()))
		.pipe(babel(buildjsConcatBabel))
		.pipe(concat(concatFile03))
		.pipe(prettier())
		.pipe(mode.development(sourcemaps.write('../../maps/js/')))
		.pipe(gulp.dest(paths.jsDest));
}

// concat04
function buildjsConcat04() {
	return gulp
		.src(concatEntry04)
		.pipe(plumber(buildjsConcatPlumber))
		.pipe(mode.development(sourcemaps.init()))
		.pipe(babel(buildjsConcatBabel))
		.pipe(concat(concatFile04))
		.pipe(prettier())
		.pipe(mode.development(sourcemaps.write('../../maps/js/')))
		.pipe(gulp.dest(paths.jsDest));
}

// concatまとめ
// ----------------------------------

// 使わないものはOFFにしないとエラー。
function buildjsConcat(done) {
	buildjsConcat01();
	buildjsConcat02();
	// buildjsConcat03();
	// buildjsConcat04();
	done();
}

/* COPY ========================================================= */

// コピーするだけ
function buildjsSimple() {
	return gulp
		.src([
			paths.jsSrcSimple + file.js,
			'!' + paths.jsSrcSimple + 'modules/**/*' // modulesの中はただのコピペ元と考える
		])
		.pipe(gulp.dest(paths.jsDest));
}

/* ==========================================================================

    FUNCTION

========================================================================== */

// gulp.watchはこの書き方でまとめられるけど、
// gulp.seriesとかはこのfunctionの書き方ではまとめられない。
// done()を追加しても、retuneを入れても、うまく動かなくなる。
// gulp.taskに渡すfunctionはパラメーターdoneをとって、そこに渡されるコールバックメソッドを最後に呼び出さないといけない

// IMG監視・圧縮
function watchImg(done) {
	gulp.watch(
		paths.imgSrc,
		gulp.parallel(imgMinMain, imgMinWebp, imgMinInlineSvg)
	);
	done();
}

// EJS監視・コンパイル
function watchEjs(done) {
	gulp.watch(paths.ejsSrc, gulp.series(buildhtml));
	done();
}

// SASS監視・コンパイル
function watchSass(done) {
	gulp.watch(paths.sassSrc, gulp.series(buildcss));
	done();
}

// JS監視・コンパイル
// 必要なものをONに
function watchJs(done) {
	// gulp.watch(paths.jsSrc, gulp.series(buildjs, destJs));//webpack
	gulp.watch(paths.jsSrcConcat, gulp.series(buildjsConcat)); // concat
	// gulp.watch(paths.jsSrcSimple, gulp.series(buildjsSimple)); // simple
	done();
}

// 上記全部をウォッチ・変更があればリロード
// function watchReload(done) {
// 	gulp.watch(
// 		paths.imgSrc,
// 		gulp.series(
// 			gulp.parallel(imgMinMain, imgMinWebp, imgMinInlineSvg),
// 			browserReload
// 		)
// 	);
// 	gulp.watch(paths.ejsSrc, gulp.series(buildhtml));
// 	gulp.watch(paths.sassSrc, gulp.series(buildcss));

// 	// gulp.watch(paths.jsSrc, gulp.series(buildjs, destJs, browserReload));//webpack
// 	gulp.watch(paths.jsSrcConcat, gulp.series(buildjsConcat, browserReload)); // concat
// 	// gulp.watch(paths.jsSrcSimple, gulp.series(buildjsSimple, browserReload)); // simple
// 	done();
// }

function watchReload(done) {
	watchImg(done);
	watchEjs(done);
	watchSass(done);
	watchJs(done);
	browserReload(done);
	done();
}

/* ==========================================================================

    TASK

========================================================================== */

// TASKのキーは、「作業の種類(min)」+「対象(img)」

exports.default = gulp.series(buildserver, watchReload);

// WATCH
exports.watchall = gulp.parallel(watchImg, watchEjs, watchSass, watchJs);
exports.watchimg = watchImg;
exports.watchejs = watchEjs;
exports.watchsass = watchSass;
exports.watchjs = watchJs;

// 個別画像圧縮
exports.minimg = gulp.parallel(imgMinMain, imgMinWebp, imgMinInlineSvg);
exports.minmain = imgMinMain;
exports.minwebp = imgMinWebp;
exports.mininline = imgMinInlineSvg;

// 個別
exports.ejs = buildhtml;
exports.sass = buildcss;
exports.mincss = gulp.series(purgeCssRejected, purgeCssProduction);
exports.critical = gulp.series(criticalCss);

// exports.js = gulp.series(buildjs, destJs, destLicense);
exports.js = buildjsConcat;
// exports.js = buildjsSimple;

// 全部ビルド
// 必要なものをON npx gulp buildall --pro でmapを書き出さないproductionモードに。
exports.buildall = gulp.series(
	buildhtml,
	buildcss,

	// buildjs,//webpack
	// destJs,//webpack
	// destLicense,//webpack
	buildjsConcat // concat
	// buildjsSimple // simple
);

// 最後にすること
exports.last = gulp.series(purgeCssRejected, purgeCssProduction, criticalCss);
