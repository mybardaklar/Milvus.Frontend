const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const outputPath = path.join(__dirname, "dist");

module.exports = merge(common, {
	mode: "development",
	devtool: "source-map",

	devServer: {
		port: 3000,
		compress: true,
		static: {
			directory: outputPath,
			watch: true,
		},
		watchFiles: {
			paths: ["src/**/*.*"],
			options: {
				usePolling: true,
			},
		},
	},

	module: {
		rules: [
			{
				test: /\.(css|sass|scss)$/,
				use: ["css-loader", "postcss-loader", "sass-loader"],
			},
		],
	},
});
