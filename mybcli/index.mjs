import { program } from "commander";
import path from "path";
import fs from "fs";
import chalk from "chalk";
import generate from "./generate.mjs";

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

		if (
			moduleType === "layout" ||
			moduleType === "widget" ||
			moduleType === "component" ||
			moduleType === "page"
		) {
			try {
				let modulePath = "src";
				if (options.path) {
					const providedPath = path.join(modulePath, options.path);
					await fs.mkdirSync(providedPath, { recursive: true });
					modulePath = path.join(providedPath, moduleName);
				} else {
					modulePath = path.join(modulePath, "app", moduleType + "s", moduleName);
				}

				if (await fs.existsSync(modulePath)) {
					console.error(
						chalk.red("ERROR"),
						`This ${moduleType} already exists in ${chalk.underline(modulePath)}`
					);
				} else {
					await generate(modulePath, moduleType, moduleName, options);
					console.info(`The ${moduleType} module has been created successfuly!`);
				}
			} catch (error) {
				console.error(error);
			}
		} else {
			console.error(chalk.red("ERROR"), `Please provide a valid module type.`);
			console.log(chalk.bold(`e.g. component (alias: c)`));
			console.log(chalk.bold(`e.g. widget (alias: w)`));
			console.log(chalk.bold(`e.g. layout (alias: l)`));
			console.log(chalk.bold(`e.g. page (alias: p)`));
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
