import { VERSION } from "../index.js";
import fs from 'fs';

const help = (exitCode = 0) => {
    console.log("Usage: md-forge [--help|--version|--input <input file>|--output <output file>]");
    console.log("Options:");
    console.log("  --help, -h       Show help");
    console.log("  --version, -v    Show version number");
    console.log("  --input, -i      Input file path");
    console.log("  --output, -o     Output file path");
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
        console.error("File does not exist", filePath);
        help(1);
    } else {
        return true;
    }
};

const output = (filePath) => {
    return true;
};

export {
    help,
    version,
    input,
    output,
}