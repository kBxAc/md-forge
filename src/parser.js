// Priority of elements in md-forge markdown while parsing:
// 
// 0A. ```Code blocks```
// 0AB. `Inline Code` // todo
// 0B. Image Link blocks // syntax [![Alt Text](image.png)](https://example.com)
// 0C. Basic Link blocks // syntax [Link Text](https://example.com "Example Tooltip")
//
// 1. # h1
// 2. ## h2
// 3. ### h3
// 4. #### h4
// 5. ##### h5
// 6. ###### h6
// 
// 7. ***bold italic text***
// 8. **bold text**
// 9. *italic text*
// 
// 10. ___bold italic text___
// 11. __bold text__
// 12. _italic text_
//
// 13. ~~strikethrough text~~
// 
// 14. <sub>subscript text</sub> no need to parse
// 15. <sup>superscript text</sup> no need to parse
// 16. <ins>underline text</ins> no need to parse


// Placeholders
const CODE_PLACEHOLDER = "%%CODEBLOCK%%";
const BASICLINK_PLACEHOLDER = "%%BASICLINKBLOCK%%";
const IMAGELINK_PLACEHOLDER = "%%IMAGELINKBLOCK%%";

// Placeholder data
let codeBlocks = [];
let basicLinkBlocks = [];
let imageLinkBlocks = [];

export function parseMarkdown(md) {
    // parse code blocks and store them safely
    md = parseCodeBlocks(md);

    // parse basic link and image link blocks and store them safely
    md = parseImageLinkBlocks(md);
    md = parseBasicLinkBlocks(md);

    // parse headings
    md = parseHeadings(md);

    // parse styled text
    md = parseStyledText(md);

    // restore blocks
    md = restoreBasicLinkBlocks(md);
    md = restoreImageLinkBlocks(md);

    md = restoreCodeBlocks(md);

    return md;
}


function parseHeadings(md) {
    return md
        .replace(/^# (.*$)/gm, "<h1>$1</h1>") // h1
        .replace(/^## (.*$)/gm, "<h2>$1</h2>") // h2
        .replace(/^### (.*$)/gm, "<h3>$1</h3>") // h3
        .replace(/^#### (.*$)/gm, "<h4>$1</h4>") // h4
        .replace(/^##### (.*$)/gm, "<h5>$1</h5>") // h5
        .replace(/^###### (.*$)/gm, "<h6>$1</h6>"); // h6
}

function parseStyledText(md) {
    return md
        .replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>") // bold italic
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // bold
        .replace(/\*(.*?)\*/g, "<em>$1</em>") // italic
        .replace(/___(.*?)___/g, "<strong><em>$1</em></strong>") // bold italic
        .replace(/__(.*?)__/g, "<strong>$1</strong>") // bold
        .replace(/_(.*?)_/g, "<em>$1</em>") // italic
        .replace(/~~(.*?)~~/g, "<del>$1</del>"); // strikethrough
}

function parseCodeBlocks(md) {
    return md.replace(/```(\w*)\n([\s\S]+?)\n```/g, (match, lang, code) => {
        // store the code block and replace it with a placeholder
        codeBlocks.push({ lang, code });
        return CODE_PLACEHOLDER;
    });
}

function restoreCodeBlocks(md) {
    let index = 0;
    return md.replace(new RegExp(CODE_PLACEHOLDER, "g"), () => {
        let { lang, code } = codeBlocks[index++];
        return `<pre><code class="${lang}" lang="${lang}">${code}</code></pre>`;
    });
}

function parseBasicLinkBlocks(md) {
    return md.replace(/\[(.*?)\]\((\S+)(?:\s+"(.*?)")?\s?\)/g, (match, text, url, tooltip = "") => {
        basicLinkBlocks.push({ text, url, tooltip });
        return BASICLINK_PLACEHOLDER;
    })
}

function restoreBasicLinkBlocks(md) {
    let index = 0;
    return md.replace(new RegExp(BASICLINK_PLACEHOLDER, "g"), () => {
        let { text, url, tooltip } = basicLinkBlocks[index++];
        return `<a href="${url}" title="${tooltip}">${text}</a>`;
    });
}

function parseImageLinkBlocks(md) {
    return md.replace(/\[!\[(.*?)\]\((.*?)\)\s*?\]\((.*?)\)/gm, (match, alt, src, href) => {
        if (!href) href = "#";
        imageLinkBlocks.push({ alt, src, href });
        return IMAGELINK_PLACEHOLDER;
    })
}

function restoreImageLinkBlocks(md) {
    let index = 0;
    return md.replace(new RegExp(IMAGELINK_PLACEHOLDER, "g"), () => {
        let { alt, src, href } = imageLinkBlocks[index++];
        return `<a href="${href}"><img alt="${alt}" src="${src}"></a>`;
    });
}