const marked = require("marked");

function parseMarkdown(markdown) {
    return marked(markdown)
}

export default function customMarkdownParser(plainText) {

    let html = parseMarkdown(plainText);
    // Apply CSS classes or inline styles to different elements
  
    // Headers: <h1>Header 1</h1> => <h1 class="header">Header 1</h1>
    html = html.replace(/<h(\d)>(.+)<\/h\1>/g, '<h$1 class="header">$2</h$1>');
  
    // Unordered Lists: <ul><li>List item</li></ul> => <ul class="unordered-list"><li>List item</li></ul>
    html = html.replace(/<ul>(.+?)<\/ul>/g, '<ul class="unordered-list">$1</ul>');
  
    // Ordered Lists: <ol><li>List item</li></ol> => <ol class="ordered-list"><li>List item</li></ol>
    html = html.replace(/<ol>(.+?)<\/ol>/g, '<ol class="ordered-list">$1</ol>');
  
    return html;
}