# md-forge

**md-forge** is a lightweight and simple Markdown to HTML converter, designed specifically for use by the `kBxAc` team.

## Features

- Converts **Markdown** headings (`#`, `##`, etc.) to HTML headings.
- Supports **bold**, *italic*, and ~~strikethrough~~ text.
- Parses **code blocks** and preserves their language for syntax highlighting.
- Handles basic **text links** and **image-based links**.
- Comes with a **command-line interface (CLI)** for seamless usage.

## Unimplemented Features

- Lists and Grids
- Tables
- Inline Code

## Installation

To install md-forge, clone the repository and install it globally:

```sh
git clone https://github.com/kBxAc/md-forge
cd md-forge
npm install -g
```

## Usage

You can use md-forge from the command line:

```sh
md-forge --input <input-file> --output <output-file>
```

## Options

- `--help` or `-h`: Display help information
- `--version` or `-v`: Display version information
- `--input <input-file>` or `-i <input-file>`: Specify the input markdown file
- `--output <output-file>` or `-o <output-file>`: Specify the output HTML file

## Examples

### CLI Usage
```sh
md-forge --input test/test.md --output test/test.html
```

### Code Usgae
```javascript
import { parseMarkdown } from "md-forge";
import fs from "fs";

// Read the md file
md = fs.readFileSync("test/test.md", "utf-8");

// Convert md to html
html = parseMarkdown(md);

// Save the html
fs.writeFileSync("test/test.html", html);

```