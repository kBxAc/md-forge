import { help, version, input, output } from "./actionUtils.js";

const ACTIONS = [
    "--help", "--version", "--input", "--output",
    "-h", "-v", "-i", "-o"
];

const cliActions = {
    "--help": help,
    "-h": help,
    "--version": version,
    "-v": version,
    "--input": input,
    "-i": input,
    "--output": output,
    "-o": output,
};

const parseCliOptions = (args) => {
    var INPUT_FILE_PATH = null;
    var OUTPUT_FILE_PATH = null;
    
    // check which actions are present
    let actions = args.filter(arg => ACTIONS.includes(arg));
    if (actions.length === 0) {
        help(1);
    }

    // Prioritize actions
    // 1. --help
    // 2. --version
    // 3. --input
    // 4. --output

    if (actions.includes("--help") || actions.includes("-h")) {
        help();
    } else if (actions.includes("--version") || actions.includes("-v")) {
        version();
    } else if (actions.includes("--input") || actions.includes("-i")) {
        // get the file path
        let index = args.indexOf("--input");
        if (index === -1) index = args.indexOf("-i");

        if (index === args.length - 1) {
            console.error("No input file path provided");
            help(1);
        }
        const filePath = args[index + 1];
        if (input(filePath)) {
            INPUT_FILE_PATH = filePath;
        }

        // Check for output file
        if (actions.includes("--output") || actions.includes("-o")) {
            // get the file path
            let index = args.indexOf("--output");
            if (index === -1) index = args.indexOf("-o");

            if (index === args.length - 1) {
                console.error("No output file path provided");
                help(1);
            }
            const filePath = args[index + 1];
            
            if (output(filePath)) {
                OUTPUT_FILE_PATH = filePath;
            }
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