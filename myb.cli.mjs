import { program } from "commander";
import path from "path";
import fs from "fs";
import ora from "ora";
import chalk from "chalk";
import { printTable } from "console-table-printer";
import inquirer from "inquirer";

async function listAllComponents(filepath) {
	try {
		const files = await fs.promises.readdir(filepath);
		const detailedFilesPromises = files.map(async (file) => {
			let fileDetails = await fs.promises.lstat(path.resolve(filepath, file));
			const { size, birthtime } = fileDetails;

			return {
				filename: file,
				"size(KB)": size,
				path: path.normalize(path.join(filepath, file)),
				created_at: birthtime,
			};
		});

		const detailedFiles = await Promise.all(detailedFilesPromises);
		printTable(detailedFiles);
	} catch (error) {
		console.log("Error occurred while reading the modules.", error);
	}
}

program
	.version("1.0.0")
	.description("module generation command")
	.command("generate <moduleType> <moduleName>")
	.alias("g")
	.option("-l, --layout <layoutModule>")
	.option("-p, --path <modulePath>")
	.option("--json")
	.action(async (moduleType, moduleName, options) => {
		if (moduleType === "l") {
			moduleType = "layout";
		} else if (moduleType === "w") {
			moduleType = "widget";
		} else if (moduleType === "c") {
			moduleType = "component";
		} else if (moduleType === "p") {
			moduleType = "page";
		}

		switch (moduleType) {
			case "layout":
			case "widget":
			case "component":
			case "page":
				let modulePath = `src/app/${moduleType}s/${moduleName}`;

				if (options.path) {
					const providedPath = await fs.existsSync(`src/${options.path}`);

					if (providedPath) {
						modulePath = `src/${options.path}/${moduleName}`;
					} else {
					}
				}

				const layoutJsContent = `console.log("this is ${moduleName} layout module.")\n`;
				const layoutScssContent = `.L${moduleName} {}\n`;
				const layoutPugContent = ``;

				const widgetJsContent = `console.log("this is ${moduleName} widget module.")\n`;
				const widgetScssContent = `.W${moduleName} {}\n`;
				const widgetPugContent = `mixin W${moduleName}()\n\t.W${moduleName}\n`;

				const componentJsContent = `console.log("this is ${moduleName} component module.")\n`;
				const componentScssContent = `.C${moduleName} {}\n`;
				const componentPugContent = `mixin C${moduleName}()\n\t.C${moduleName}\n`;

				const pageJsContent = `console.log("this is ${moduleName} page module.")\n`;
				const pageScssContent = `.P${moduleName} {}\n`;
				const pagePugContent = `extends @layouts/${options.layout}/${options.layout}.layout.pug\n\nblock append variables\n\t-\n\t\tpageProps.title = "${moduleName}"\n\nblock append styles\n\tlink(rel="stylesheet", href=require('./${moduleName}.${moduleType}.scss'))\n\nblock append scripts\n\tscript(src=require('./${moduleName}.${moduleType}.js'), defer)\n\nblock body\n`;

				if (await fs.existsSync(modulePath)) {
					console.log(
						chalk.red("ERROR"),
						`This ${moduleType} already exists: ${chalk.underline(modulePath)}`
					);
				} else {
					await fs.mkdirSync(modulePath);
					await fs.openSync(`${modulePath}/${moduleName}.${moduleType}.js`, "w");
					await fs.openSync(`${modulePath}/${moduleName}.${moduleType}.scss`, "w");
					await fs.openSync(`${modulePath}/${moduleName}.${moduleType}.pug`, "w");
					if (options.json) {
						await fs.openSync(`${modulePath}/${moduleName}.${moduleType}.json`, "w");
					}

					if (moduleType === "layout" || moduleType === "l") {
						await fs.writeFileSync(
							`${modulePath}/${moduleName}.${moduleType}.js`,
							layoutJsContent
						);
						await fs.writeFileSync(
							`${modulePath}/${moduleName}.${moduleType}.scss`,
							layoutScssContent
						);
						await fs.writeFileSync(
							`${modulePath}/${moduleName}.${moduleType}.pug`,
							layoutPugContent
						);
					} else if (moduleType === "widget" || moduleType === "w") {
						await fs.writeFileSync(
							`${modulePath}/${moduleName}.${moduleType}.js`,
							widgetJsContent
						);
						await fs.writeFileSync(
							`${modulePath}/${moduleName}.${moduleType}.scss`,
							widgetScssContent
						);
						await fs.writeFileSync(
							`${modulePath}/${moduleName}.${moduleType}.pug`,
							widgetPugContent
						);
					} else if (moduleType === "component" || moduleType === "c") {
						await fs.writeFileSync(
							`${modulePath}/${moduleName}.${moduleType}.js`,
							componentJsContent
						);
						await fs.writeFileSync(
							`${modulePath}/${moduleName}.${moduleType}.scss`,
							componentScssContent
						);
						await fs.writeFileSync(
							`${modulePath}/${moduleName}.${moduleType}.pug`,
							componentPugContent
						);
					} else if (moduleType === "page" || moduleType === "p") {
						await fs.writeFileSync(
							`${modulePath}/${moduleName}.${moduleType}.js`,
							pageJsContent
						);
						await fs.writeFileSync(
							`${modulePath}/${moduleName}.${moduleType}.scss`,
							pageScssContent
						);
						if (options.layout) {
							await fs.writeFileSync(
								`${modulePath}/${moduleName}.${moduleType}.pug`,
								pagePugContent
							);
						}
					}

					console.log(
						chalk.green("CREATE"),
						`${modulePath}/${moduleName}.${moduleType}.js`
					);
					console.log(
						chalk.green("CREATE"),
						`${modulePath}/${moduleName}.${moduleType}.scss`
					);
					console.log(
						chalk.green("CREATE"),
						`${modulePath}/${moduleName}.${moduleType}.pug`
					);

					if (options.json) {
						console.log(
							chalk.green("CREATE"),
							`${modulePath}/${moduleName}.${moduleType}.json`
						);
					}
					console.info(`The ${moduleType} module has been created successfuly!`);
				}

				break;

			default:
				console.error(chalk.red("ERROR"), `Please provide a module type and module name.`);
				console.log(chalk.bold(`e.g. component (alias: c)`));
				console.log(chalk.bold(`e.g. widget (alias: w)`));
				console.log(chalk.bold(`e.g. layout (alias: l)`));
				console.log(chalk.bold(`e.g. page (alias: p)`));
				break;
		}
	});

program
	.version("1.0.0")
	.description("listing modules command")
	.command("list <moduleType>")
	.alias("ls")
	.action(async (moduleType) => {
		if (moduleType === "l") {
			moduleType = "layouts";
		} else if (moduleType === "w") {
			moduleType = "widgets";
		} else if (moduleType === "c") {
			moduleType = "components";
		} else if (moduleType === "p") {
			moduleType = "pages";
		}

		const spinner = ora();

		switch (moduleType) {
			case "layouts":
			case "widgets":
			case "components":
			case "pages":
				spinner.text = `loading ${moduleType}...\n`;
				spinner.start();
				await listAllComponents(`src/app/${moduleType}`);
				spinner.stop();
				break;

			default:
				console.log(chalk.red("ERROR"), `Please provide a module type and module name.`);
				console.log(chalk.bold(`e.g. components (alias: c)`));
				console.log(chalk.bold(`e.g. widgets (alias: w)`));
				console.log(chalk.bold(`e.g. layouts (alias: l)`));
				console.log(chalk.bold(`e.g. pages (alias: p)`));
				break;
		}
	});

program.parse(process.argv);

/* async function input() {
	const replys = await inquirer.prompt([
		{ name: "moduleType", message: "What kind of module you want to create?", type: "input" },
		{ name: "moduleName", message: "What is the name of the module?", type: "input" },
	]);

	return replys;
}

const askQuestions = async () => {
	let loop = false;

	do {
		const userResponse = await input();
		const confirmQ = await inquirer.prompt([
			{ name: "confirm", message: "Do you want to add more modules?", type: "confirm" },
		]);

		console.log(userResponse);

		if (confirmQ.confirm) {
			loop = true;
		} else {
			loop = false;
		}
	} while (loop);
};

askQuestions(); */
