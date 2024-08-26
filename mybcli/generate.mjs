import path from "path";
import fs from "fs";
import chalk from "chalk";

export default async function (modulePath, moduleType, moduleName, options) {
	const moduleContents = {
		layout: {
			js: `console.log("this is ${moduleName} layout module.")\n`,
			scss: `.L${moduleName} {}\n`,
			pug: "",
		},

		widget: {
			js: `console.log("this is ${moduleName} widget module.")\n`,
			scss: `.W${moduleName} {}\n`,
			pug: `mixin W${moduleName}()\n\t.W${moduleName}\n`,
		},

		component: {
			js: `console.log("this is ${moduleName} component module.")\n`,
			scss: `.C${moduleName} {}\n`,
			pug: `mixin C${moduleName}()\n\t.C${moduleName}\n`,
		},

		page: {
			js: `console.log("this is ${moduleName} page module.")\n`,
			scss: `.P${moduleName} {}\n`,
			pug: `extends @layouts/${options.layout ? options.layout : "Default"}/${
				options.layout ? options.layout : "Default"
			}.layout.pug\n\nblock append variables\n\t-\n\t\tpageProps.title = "${moduleName}";\n\nblock append styles\n\tlink(rel="stylesheet", href=require('./${moduleName}.${moduleType}.scss'))\n\nblock append scripts\n\tscript(src=require('./${moduleName}.${moduleType}.js'), defer)\n\nblock body\n`,
		},
	};

	try {
		// generate module directory and generate module files (js, scss, pug)
		await fs.mkdirSync(modulePath);
		await fs.writeFileSync(
			path.join(modulePath, `${moduleName}.${moduleType}.js`),
			moduleContents[moduleType].js
		);
		await fs.writeFileSync(
			path.join(modulePath, `${moduleName}.${moduleType}.scss`),
			moduleContents[moduleType].scss
		);
		await fs.writeFileSync(
			path.join(modulePath, `${moduleName}.${moduleType}.pug`),
			moduleContents[moduleType].pug
		);

		// if there is an option like --json, then generate json module file
		if (options.json) {
			await fs.openSync(path.join(modulePath, `${moduleName}.${moduleType}.json`), "w");
		}

		// log the success notifications
		console.log(chalk.green("CREATE"), path.join(modulePath, `${moduleName}.${moduleType}.js`));
		console.log(
			chalk.green("CREATE"),
			path.join(modulePath, `${moduleName}.${moduleType}.scss`)
		);
		console.log(
			chalk.green("CREATE"),
			path.join(modulePath, `${moduleName}.${moduleType}.pug`)
		);
		if (options.json) {
			console.log(
				chalk.green("CREATE"),
				path.join(modulePath, `${moduleName}.${moduleType}.json`)
			);
		}
	} catch (error) {
		console.log(error);
	}
}
