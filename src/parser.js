// Priority of elements in md-forge markdown while parsing:
// 0. Code blocks
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

const CODE_PLACEHOLDER = "%%CODE_BLOCK%%";
let codeBlocks = [];

export function parseMarkdown(md) {
    // parse code blocks and store them safely
    md = parseCodeBlocks(md);

    // parse headings
    md = parseHeadings(md);

    // parse styled text
    md = parseStyledText(md);

    // restore code blocks
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