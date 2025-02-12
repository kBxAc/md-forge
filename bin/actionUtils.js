import { VERSION } from "../index.js";
import fs from 'fs';

const help = (exitCode = 0) => {
    console.log("Usage: md-forge [--help|--version|--input <input file>|--output <output file>]");
    console.log("Options:");
    console.log("  --help     Show help");
    console.log("  --version  Show version number");
    console.log("  --input    Input file path");
    console.log("  --output   Output file path");
    console.log();
    version();
    process.exit(exitCode);
};

const version = () => {
    console.log(`md-forge v${VERSION}`);
    process.exit(0);
};

const input = (filePath) => {
    if (!fs.existsSync(filePath)) {
        console.error("File does not exist");
        help(1);
    } else {
        return true;
    }
};

const output = (filePath) => {
    if (!fs.existsSync(filePath)) {
        console.error("File does not exist");
        help(1);
    } else {
        return true;
    }
};

export {
    help,
    version,
    input,
    output,
}