/**
 * Clipboard Utilities for WeChat Rich Text Writing
 */

export async function copyWechatHtml(htmlContent) {
  if (!htmlContent) return false;

  const blobHtml = new Blob([htmlContent], { type: 'text/html' });
  const blobText = new Blob([htmlContent.replace(/<[^>]+>/g, '')], { type: 'text/plain' });

  if (navigator.clipboard && window.ClipboardItem) {
    try {
      const item = new ClipboardItem({
        'text/html': blobHtml,
        'text/plain': blobText
      });
      await navigator.clipboard.write([item]);
      return true;
    } catch (err) {
      console.warn('ClipboardItem write failed, fallback to execCommand', err);
    }
  }

  // Fallback for older browsers
  const container = document.createElement('div');
  container.innerHTML = htmlContent;
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  document.body.appendChild(container);

  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(container);
  selection.removeAllRanges();
  selection.addRange(range);

  try {
    const successful = document.execCommand('copy');
    selection.removeAllRanges();
    document.body.removeChild(container);
    return successful;
  } catch (err) {
    selection.removeAllRanges();
    document.body.removeChild(container);
    throw err;
  }
}
