#!/usr/bin/env node
import { parseMarkdown } from '../src/parser.js';
import { parseCliOptions } from './cliOptions.js';
import fs from 'fs';

try {
    const { INPUT_FILE_PATH, OUTPUT_FILE_PATH } = parseCliOptions(process.argv);
    const md = fs.readFileSync(INPUT_FILE_PATH, 'utf8');
    const parsedMd = parseMarkdown(md);
    fs.writeFileSync(OUTPUT_FILE_PATH, parsedMd);
} catch (error) {
    console.error("An error occurred while parsing the markdown file");
    console.error(error);
    process.exit(1);
}