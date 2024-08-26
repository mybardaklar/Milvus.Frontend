/** @type {import('postcss-load-config').Config} */
module.exports = (ctx) => {
	return {
		plugins: [
			require("autoprefixer"),
			require("postcss-short")({ skip: "null" }),
			require("postcss-sort-media-queries"),
			require("cssnano")({
				preset: [
					"default",
					{
						normalizeWhitespace: false,
					},
				],
			}),
		],
	};
};
