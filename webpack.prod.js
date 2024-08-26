const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "production",
	module: {
		rules: [
			{
				test: /\.(css|sass|scss)$/,
				use: [
					"css-loader",
					"postcss-loader",
					{
						loader: "sass-loader",
						options: {
							sassOptions: {
								indentWidth: 4,
								indentType: "tab",
								outputStyle: "expanded",
							},
						},
					},
				],
			},
		],
	},

	optimization: {
		minimize: false,
	},
});
