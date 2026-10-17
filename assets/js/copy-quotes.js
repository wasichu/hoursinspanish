document.querySelectorAll('.post-content-main .footnotes blockquote').forEach((quote) => {
  if (!navigator.clipboard?.writeText) return;
  const text = quote.innerText.trim();
  const clipboardIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="3" width="8" height="4" rx="1.5"/><path d="M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/></svg>';
  const checkIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>';

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'quote-copy-button';
  button.innerHTML = clipboardIcon;
  button.setAttribute('aria-label', 'Copy quoted text');
  button.title = 'Copy quoted text';

  const status = document.createElement('span');
  status.className = 'quote-copy-status';
  status.setAttribute('role', 'status');

  const toolbar = document.createElement('div');
  toolbar.className = 'quote-copy-toolbar';
  toolbar.append(status, button);
  quote.prepend(toolbar);

  let reset;
  button.addEventListener('click', async () => {
    clearTimeout(reset);
    button.classList.remove('is-copied');
    button.innerHTML = clipboardIcon;
    status.classList.remove('is-error');
    try {
      await navigator.clipboard.writeText(text);
      button.innerHTML = checkIcon;
      button.classList.add('is-copied');
      button.setAttribute('aria-label', 'Copied');
      button.title = 'Copied';
      status.textContent = 'Copied';
    } catch {
      status.classList.add('is-error');
      status.textContent = 'Could not copy. Select the text to copy it.';
    }
    reset = setTimeout(() => {
      status.textContent = '';
      status.classList.remove('is-error');
      button.innerHTML = clipboardIcon;
      button.classList.remove('is-copied');
      button.setAttribute('aria-label', 'Copy quoted text');
      button.title = 'Copy quoted text';
    }, 4000);
  });
});
