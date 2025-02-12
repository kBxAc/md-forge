import { help, version, input, output } from "./actionUtils.js";

var INPUT_FILE_PATH = null;
var OUTPUT_FILE_PATH = null;

const ACTIONS = ["--help", "--version", "--input", "--output"];

const cliActions = {
    "--help": help,
    "--version": version,
    "--input": input,
    "--output": output,
};

const parseCliOptions = (args) => {
    // check which actions are present
    let actions = args.filter(arg => ACTIONS.includes(arg));
    if (actions.length === 0) {
        help(1);
    }
    console.log(actions);

    // Prioritize actions
    // 1. --help
    // 2. --version
    // 3. --input
    // 4. --output

    if (actions.includes("--help")) {
        help();
    } else if (actions.includes("--version")) {
        version();
    } else if (actions.includes("--input")) {
        // get the file path
        let index = args.indexOf("--input");
        if (index === args.length - 1) {
            console.error("No input file path provided");
            help(1);
        }
        const filePath = args[index + 1];
        if (input(filePath)) {
            INPUT_FILE_PATH = filePath;
        }
    } else if (actions.includes("--output")) {
        // get the file path
        let index = args.indexOf("--output");
        if (index === args.length - 1) {
            console.error("No output file path provided");
            help(1);
        }
        const filePath = args[index + 1];
        if (output(filePath)) {
            OUTPUT_FILE_PATH = filePath;
        }
    }

    // if no INPUT_FILE_PATH is provided, show help
    if (!INPUT_FILE_PATH) {
        console.error("No input file path provided");
        help(1);
    }

    // if no OUTPUT_FILE_PATH is provided, use the same as INPUT_FILE_PATH.html
    if (INPUT_FILE_PATH && !OUTPUT_FILE_PATH) {
        OUTPUT_FILE_PATH = INPUT_FILE_PATH + ".html";
    }

    return {
        INPUT_FILE_PATH,
        OUTPUT_FILE_PATH,
    };
}

export {
    parseCliOptions
}