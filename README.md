# md-forge

md-forge is the simplest markdown to HTML converter that ever existed.

## Features

- Converts markdown headings to HTML headings
- Supports bold, italic, and strikethrough text
- Parses code blocks and preserves their language
- Command-line interface for easy usage

## Installation

To install md-forge, clone the repository and install the dependencies:

```sh
git clone <repository-url>
cd md-forge
npm install -g
```

## Usage

You can use md-forge from the command line:

```sh
md-forge --input <input-file> --output <output-file>
```

## Options

- `--help`: Display help information
- `--version`: Display version information
- `--input <input-file>`: Specify the input markdown file
- `--output <output-file>`: Specify the output HTML file

## Examples

```sh
md-forge --input test/test.md --output test/test.html
```