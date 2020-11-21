const path = require('path');
const glob = require('glob');
const TerserPlugin = require('terser-webpack-plugin');
const LicenseWebpackPlugin = require('license-webpack-plugin')
	.LicenseWebpackPlugin;
// const CopyPlugin = require('copy-webpack-plugin');

// ライセンスファイルのアドレス
const licenseUrl =
	'https://concrecheese.com/sample/kinomi-dental-clinic/license/';

module.exports = {
	// モード値を production に設定すると最適化された状態で、
	// development に設定するとソースマップ有効でJSファイルが出力される
	// none
	mode: 'production',
	devtool: false,
	entry: {
		main: './src/assets/js/main.js',
		'main.min': './src/assets/js/main.js',
		vender: './src/assets/js/vender.js',
		'vender.min': './src/assets/js/vender.js'
	},

	output: {
		path: `${__dirname}/dest`, // gulpのが優先？
		filename: '[name].js'
	},

	plugins: [
		new LicenseWebpackPlugin({
			pattern: /^(.*)$/,
			addBanner: true,
			renderBanner: (filename, modules) => {
				return '/*! licenses are at ' + licenseUrl + filename + ' */';
			},
			// perChunkOutput: true, // trueチャンクごとデフォ falseひとつ なぜか有効かするとどっちもひとつになる。
			filename: '[name].licenses.txt'
		})
	],

	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				test: /\.min\.js(\?.*)?$/i,
				extractComments: false, // コメントを別ファイルに抽出 ライセンスだけ→ /@license/i
				terserOptions: {
					output: {
						comments: /^!/ // コメント自体を残すかどうか(extractCommentsとは独立した動き) falseで全消し
					}
				}
			})
		],
		usedExports: true // モジュールを使うものだけエクスポート
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				C: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							// バンドルする前のコメントを消す。minifyしないがコメントを消したい時に。
							// falseで全消し。
							comments: false,
							presets: [
								[
									'@babel/preset-env',
									{
										modules: false,
										useBuiltIns: 'usage', // usageは自動・entryは手動
										corejs: 3,
										targets: {
											// ie: '11'
										}
										// debug: true // 何のポリフィルが追加されたか見れる
									}
								]
							]
						}
					}
				]
			}
		]
	}
};
