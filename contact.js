(() => {
  const button = document.querySelector('.copy-email');
  const status = document.querySelector('.copy-status');
  let reset;

  function fallbackCopy(text) {
    const field = document.createElement('textarea');
    field.value = text;
    field.readOnly = true;
    field.style.cssText = 'position:fixed;top:0;left:-9999px;';
    document.body.appendChild(field);
    field.select();
    field.setSelectionRange(0, text.length);
    try {
      return document.execCommand('copy');
    } finally {
      field.remove();
      button.focus({preventScroll: true});
    }
  }

  button.addEventListener('click', async () => {
    clearTimeout(reset);
    const email = button.dataset.email;
    let copied = false;
    try {
      await navigator.clipboard.writeText(email);
      copied = true;
    } catch {
      try { copied = fallbackCopy(email); } catch { /* Show manual instructions below. */ }
    }
    button.textContent = copied ? 'Copied!' : 'Copy email';
    status.textContent = copied ? 'Email copied to clipboard.' : 'Select and copy: ' + email;
    reset = setTimeout(() => {
      button.textContent = 'Copy email';
      status.textContent = '';
    }, copied ? 3000 : 12000);
  });
})();
