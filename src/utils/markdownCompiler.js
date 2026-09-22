import { Marked } from 'marked';

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function compileMarkdown(markdownText, theme, options = {}) {
  const { convertLinksToFootnotes = true } = options;
  const footnotes = [];

  const renderer = {
    heading(arg1, arg2) {
      // Support both marked v15 object { text, depth } and legacy (text, level)
      const text = typeof arg1 === 'object' ? arg1.text : arg1;
      const level = typeof arg1 === 'object' ? arg1.depth : arg2;
      const style = theme[`h${level}`] || theme.h3;
      return `<h${level} style="${style}">${text}</h${level}>`;
    },

    paragraph(arg1) {
      const text = typeof arg1 === 'object' ? arg1.text : arg1;
      return `<p style="${theme.p}">${text}</p>`;
    },

    blockquote(arg1) {
      const text = typeof arg1 === 'object' ? arg1.text : arg1;
      return `<blockquote style="${theme.blockquote}">${text}</blockquote>`;
    },

    strong(arg1) {
      const text = typeof arg1 === 'object' ? arg1.text : arg1;
      return `<strong style="${theme.strong}">${text}</strong>`;
    },

    em(arg1) {
      const text = typeof arg1 === 'object' ? arg1.text : arg1;
      return `<em style="${theme.em}">${text}</em>`;
    },

    codespan(arg1) {
      const text = typeof arg1 === 'object' ? arg1.text : arg1;
      return `<code style="${theme.code_inline}">${text}</code>`;
    },

    code(arg1, arg2) {
      const codeText = typeof arg1 === 'object' ? arg1.text : arg1;
      const lang = typeof arg1 === 'object' ? arg1.lang : arg2;
      const escaped = escapeHtml(codeText);

      return `
        <section style="${theme.pre_wrapper}">
          <div style="${theme.mac_dots}">
            <span style="width:10px;height:10px;border-radius:50%;background:#ff5f56;display:inline-block;"></span>
            <span style="width:10px;height:10px;border-radius:50%;background:#ffbd2e;display:inline-block;"></span>
            <span style="width:10px;height:10px;border-radius:50%;background:#27c93f;display:inline-block;"></span>
            ${lang ? `<span style="margin-left:auto;font-size:11px;color:#94a3b8;font-family:sans-serif;">${lang}</span>` : ''}
          </div>
          <pre style="${theme.pre}"><code style="${theme.code}">${escaped}</code></pre>
        </section>
      `;
    },

    link(arg1, arg2, arg3) {
      const href = typeof arg1 === 'object' ? arg1.href : arg1;
      const text = typeof arg1 === 'object' ? arg1.text : arg3;

      if (convertLinksToFootnotes && href && !href.startsWith('#')) {
        footnotes.push({ text: text || href, href });
        const idx = footnotes.length;
        return `<span>${text}</span><sup style="${theme.footnote_sup}">[${idx}]</sup>`;
      }
      return `<a href="${href}" style="color:${theme.primaryColor};text-decoration:none;">${text}</a>`;
    },

    list(arg1, arg2) {
      const body = typeof arg1 === 'object' ? arg1.body : arg1;
      const ordered = typeof arg1 === 'object' ? arg1.ordered : arg2;
      const tag = ordered ? 'ol' : 'ul';
      const style = ordered ? theme.ol : theme.ul;
      return `<${tag} style="${style}">${body}</${tag}>`;
    },

    listitem(arg1) {
      const text = typeof arg1 === 'object' ? arg1.text : arg1;
      return `<li style="${theme.li}">${text}</li>`;
    },

    table(arg1, arg2) {
      let header = '';
      let body = '';
      if (typeof arg1 === 'object') {
        header = arg1.header;
        body = arg1.body;
      } else {
        header = arg1;
        body = arg2;
      }
      return `
        <table style="${theme.table}">
          <thead>${header}</thead>
          <tbody>${body}</tbody>
        </table>
      `;
    },

    tablerow(arg1) {
      const content = typeof arg1 === 'object' ? arg1.text : arg1;
      return `<tr>${content}</tr>`;
    },

    tablecell(arg1, arg2) {
      const content = typeof arg1 === 'object' ? arg1.text : arg1;
      const flags = typeof arg1 === 'object' ? arg1.header : (arg2 ? arg2.header : false);
      const tag = flags ? 'th' : 'td';
      const style = flags ? theme.th : theme.td;
      return `<${tag} style="${style}">${content}</${tag}>`;
    },

    hr() {
      return `<hr style="${theme.hr}" />`;
    }
  };

  const markedInstance = new Marked({
    renderer,
    gfm: true,
    breaks: true
  });

  let html = markedInstance.parse(markdownText || '');

  // Append footnotes section if any
  if (footnotes.length > 0) {
    let fnHtml = `
      <section style="${theme.footnote_section}">
        <div style="font-weight:600;margin-bottom:8px;font-size:13px;color:${theme.primaryColor};">引用与参考链接：</div>
    `;
    footnotes.forEach((fn, idx) => {
      fnHtml += `
        <div style="margin:4px 0;line-height:1.6;">
          <span style="font-weight:bold;color:${theme.primaryColor};">[${idx + 1}]</span>
          <span> ${fn.text}: </span>
          <span style="word-break:break-all;color:#64748b;">${fn.href}</span>
        </div>
      `;
    });
    fnHtml += '</section>';
    html += fnHtml;
  }

  // Wrap in root container with inline style
  return `<section style="${theme.container}">${html}</section>`;
}
