(() => {
  const thread = document.getElementById('commentbox');
  const status = document.getElementById('comments-status');
  const retry = document.getElementById('comments-retry');
  if (!thread?.dataset.projectId || !status || !retry) return;

  let timeout;
  let loader;
  let cleanup;
  let attempt = 0;

  function fail(current) {
    if (current !== attempt) return;
    clearTimeout(timeout);
    thread.hidden = true;
    status.parentElement.hidden = false;
    status.textContent = 'Comments are currently unavailable.';
    retry.hidden = false;
  }

  function mount(current) {
    if (current !== attempt) return;
    const colors = getComputedStyle(document.documentElement);
    try {
      cleanup = window.commentBox(thread.dataset.projectId, {
        backgroundColor: 'transparent',
        textColor: colors.getPropertyValue('--text-primary').trim(),
        subtextColor: colors.getPropertyValue('--text-secondary').trim(),
        onCommentCount() {
          if (current !== attempt) return;
          clearTimeout(timeout);
          thread.hidden = false;
          status.parentElement.hidden = true;
        },
      });
      const frame = thread.querySelector('iframe');
      if (frame) frame.title = 'Comments';
    } catch {
      fail(current);
    }
  }

  function load() {
    const current = ++attempt;
    clearTimeout(timeout);
    cleanup?.();
    thread.replaceChildren();
    thread.removeAttribute('data-loaded');
    thread.hidden = true;
    status.parentElement.hidden = false;
    status.textContent = 'Loading comments…';
    retry.hidden = true;
    timeout = setTimeout(() => fail(current), 20000);

    if (typeof window.commentBox === 'function') {
      mount(current);
    } else {
      loader?.remove();
      loader = document.createElement('script');
      loader.src = 'https://unpkg.com/commentbox.io@2.1.0/dist/commentBox.min.js';
      loader.async = true;
      loader.addEventListener('load', () => mount(current));
      loader.addEventListener('error', () => fail(current));
      document.body.appendChild(loader);
    }
  }

  retry.addEventListener('click', load);
  load();
})();
