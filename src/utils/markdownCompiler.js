import { Marked } from 'marked';

export function compileMarkdown(markdownText, theme, options = {}) {
  const { convertLinksToFootnotes = true } = options;

  if (!markdownText) return '';

  const markedInstance = new Marked({
    gfm: true,
    breaks: true
  });

  // 1. Standard full-featured markdown to HTML
  const rawHtml = markedInstance.parse(markdownText);

  // 2. Parse into DOM tree for flawless inline CSS injection & transforms
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div id="md-root">${rawHtml}</div>`, 'text/html');
  const root = doc.getElementById('md-root');

  if (!root) return '';

  // 3. Process Links -> Footnotes (WeChat does not allow external links)
  const footnotes = [];
  if (convertLinksToFootnotes) {
    const links = root.querySelectorAll('a');
    links.forEach(a => {
      const href = a.getAttribute('href') || '';
      const text = a.textContent.trim() || href;

      if (href && !href.startsWith('#')) {
        footnotes.push({ text, href });
        const sup = doc.createElement('sup');
        sup.setAttribute('style', theme.footnote_sup || 'font-size: 12px; font-weight: bold;');
        sup.textContent = `[${footnotes.length}]`;

        const span = doc.createElement('span');
        span.textContent = text;

        const container = doc.createElement('span');
        container.appendChild(span);
        container.appendChild(sup);

        a.replaceWith(container);
      } else {
        a.setAttribute('style', `color: ${theme.primaryColor}; text-decoration: none; font-weight: 500;`);
      }
    });
  }

  // 4. Transform Code Blocks (<pre><code>) into Mac-style card
  const preElements = root.querySelectorAll('pre');
  preElements.forEach(pre => {
    const code = pre.querySelector('code');
    const codeClass = code ? code.className : '';
    const langMatch = codeClass.match(/language-([a-zA-Z0-9_-]+)/);
    const lang = langMatch ? langMatch[1] : '';

    const section = doc.createElement('section');
    section.setAttribute('style', theme.pre_wrapper);

    const macDots = doc.createElement('div');
    macDots.setAttribute('style', theme.mac_dots);
    macDots.innerHTML = `
      <span style="width:10px;height:10px;border-radius:50%;background:#ff5f56;display:inline-block;margin-right:6px;"></span>
      <span style="width:10px;height:10px;border-radius:50%;background:#ffbd2e;display:inline-block;margin-right:6px;"></span>
      <span style="width:10px;height:10px;border-radius:50%;background:#27c93f;display:inline-block;margin-right:6px;"></span>
      ${lang ? `<span style="margin-left:auto;font-size:11px;color:#94a3b8;font-family:sans-serif;font-weight:600;">${lang}</span>` : ''}
    `;

    pre.setAttribute('style', theme.pre);
    if (code) {
      code.setAttribute('style', theme.code);
    }

    section.appendChild(macDots);
    section.appendChild(pre.cloneNode(true));
    pre.replaceWith(section);
  });

  // 5. Transform inline code (<code> outside of <pre>)
  root.querySelectorAll('code').forEach(c => {
    if (!c.closest('pre')) {
      c.setAttribute('style', theme.code_inline);
    }
  });

  // 6. Apply Tag Inline Styles
  const tagStyles = {
    h1: theme.h1,
    h2: theme.h2,
    h3: theme.h3,
    h4: theme.h3,
    h5: theme.h3,
    h6: theme.h3,
    p: theme.p,
    blockquote: theme.blockquote,
    strong: theme.strong,
    em: theme.em,
    ul: theme.ul,
    ol: theme.ol,
    li: theme.li,
    table: theme.table,
    th: theme.th,
    td: theme.td,
    hr: theme.hr
  };

  for (const [tag, style] of Object.entries(tagStyles)) {
    if (!style) continue;
    root.querySelectorAll(tag).forEach(el => {
      // If element already has style attribute, merge or override
      const existing = el.getAttribute('style');
      el.setAttribute('style', existing ? `${style} ${existing}` : style);
    });
  }

  // 7. Append Footnotes Section if any
  if (footnotes.length > 0) {
    const fnSection = doc.createElement('section');
    fnSection.setAttribute('style', theme.footnote_section);
    let fnHtml = `<div style="font-weight:700;margin-bottom:10px;font-size:13px;color:${theme.primaryColor};">引用与参考链接：</div>`;
    footnotes.forEach((fn, idx) => {
      fnHtml += `
        <div style="margin:4px 0;line-height:1.6;font-size:12px;">
          <span style="font-weight:bold;color:${theme.primaryColor};">[${idx + 1}]</span>
          <span style="color:#334155;font-weight:500;"> ${fn.text}: </span>
          <span style="word-break:break-all;color:#64748b;">${fn.href}</span>
        </div>
      `;
    });
    fnSection.innerHTML = fnHtml;
    root.appendChild(fnSection);
  }

  return `<section style="${theme.container}">${root.innerHTML}</section>`;
}
