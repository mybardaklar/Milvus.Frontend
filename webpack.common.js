const path = require("path");
const globule = require("globule");
const PugPlugin = require("pug-plugin");
const PrettierPlugin = require("prettier-webpack-plugin");

const outputPath = path.join(__dirname, "dist");

const viewTemplateFiles = {};
globule.find("src/app/pages/**/*.page.pug").forEach((filePath) => {
	const keyName = filePath.split(/\/|.page.pug/).splice(-2, 1)[0];

	Object.assign(viewTemplateFiles, {
		[keyName.toLowerCase()]: path.resolve(__dirname, filePath),
	});
});

module.exports = {
	entry: {
		...viewTemplateFiles,
	},

	output: {
		path: outputPath,
		publicPath: "",
		clean: true,
	},

	resolve: {
		extensions: [".ts", ".js"],
		alias: {
			"@": path.join(__dirname, "src"),
			"@app": path.join(__dirname, "src/app"),
			"@layouts": path.join(__dirname, "src/app/layouts"),
			"@widgets": path.join(__dirname, "src/app/widgets"),
			"@components": path.join(__dirname, "src/app/components"),
			"@pages": path.join(__dirname, "src/app/pages"),
			"@assets": path.join(__dirname, "src/assets"),
			"@styles": path.join(__dirname, "src/styles"),
		},
	},

	plugins: [
		new PugPlugin({
			css: {
				filename: (pathData) => {
					return "css/[name].[contenthash:8].css";
				},
			},
			js: {
				filename: "js/[name].[contenthash:8].js",
			},
		}),
		new PrettierPlugin({
			useTabs: true,
			printWidth: 100,
			tabWidth: 4,
			semi: true,
			arrowParens: "always",
			singleQuote: false,
			bracketSpacing: true,
			bracketSameLine: true,
			jsxBracketSameLine: true,
			fluid: false,
			sortTailwindcssClasses: true,
			encoding: "utf-8",
			extensions: [".css", ".scss", ".html", ".js", ".ts"],
		}),
	],

	module: {
		rules: [
			{
				test: /.pug$/,
				loader: PugPlugin.loader,
				options: {
					data: {
						global: {},
					},
				},
			},

			{
				test: /\.(gif|jpe?g|png|svg|webp|ico)$/i,
				type: "asset/resource",
				include: /images/,
				resourceQuery: { not: [/inline/] }, // ignore images with `?inline` query
				oneOf: [
					// use responsive-loader in JS file
					{
						issuer: /\.(js|ts)$/,
						type: "javascript/auto", // <== mega important for usage in JS
						generator: {
							filename: (pathData) => {
								return path
									.join(
										path.dirname(pathData.filename).replace("src/", ""),
										"[name][ext][query]"
									)
									.replace(/\\/g, "/");
							},
							// example how to generate dynamic filename
							// filename: (pathData) => (pathData.filename.endsWith('favicon.ico') ? 'favicon.ico' : filename),
						},
					},
					// use responsive-loader in CSS, Pug
					{
						type: "asset/resource", // <== mega important for usage in Pug/CSS
						generator: {
							filename: (pathData) => {
								return path
									.join(
										path.dirname(pathData.filename).replace("src/", ""),
										"[name][ext][query]"
									)
									.replace(/\\/g, "/");
							},
							// example how to generate dynamic filename
							// filename: (pathData) => (pathData.filename.endsWith('favicon.ico') ? 'favicon.ico' : filename),
						},
					},
				],
			},

			{
				test: /\.(jpe?g|png|webp)/,
				type: "asset/resource",
				include: /images/,
				resourceQuery: { not: [/inline/] }, // ignore images with `?inline` query
				oneOf: [
					// use responsive-loader in JS file
					{
						issuer: /\.(js|ts)$/,
						type: "javascript/auto", // <== mega important for usage in JS
						use: {
							loader: "responsive-loader",
							options: {
								name: "assets/images/[name]-[width]w.[hash:8].[ext]",
							},
						},
					},
					// use responsive-loader in CSS, Pug
					{
						type: "asset/resource", // <== mega important for usage in Pug/CSS
						use: {
							loader: "responsive-loader",
							options: {
								name: "assets/images/[name]-[width]w.[hash:8].[ext]",
							},
						},
					},
				],
			},

			{
				test: /\.(svg)$/i,
				type: "asset/inline",
				resourceQuery: /inline/,
			},

			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
			},

			{
				test: /\.(woff(2)?|ttf|otf|eot|svg)$/,
				type: "asset/resource",
				include: /fonts|node_modules/, // fonts from `assets/fonts` or `node_modules` directory only
				generator: {
					filename: (pathData) => {
						return path
							.join(
								path.dirname(pathData.filename).replace("src/", ""),
								"[name][ext][query]"
							)
							.replace(/\\/g, "/");
					},
				},
			},
		],
	},
};
