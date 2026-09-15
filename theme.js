(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) document.body.dataset.theme = savedTheme;

  const toggle = document.querySelector('.theme-toggle');
  const darkPreferred = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = () => document.body.dataset.theme || (darkPreferred() ? 'dark' : 'light');
  const setLabel = () => toggle.setAttribute('aria-label', `Switch to ${currentTheme() === 'dark' ? 'light' : 'dark'} theme`);

  setLabel();
  toggle.addEventListener('click', () => {
    const nextTheme = currentTheme() === 'dark' ? 'light' : 'dark';
    document.body.dataset.theme = nextTheme;
    localStorage.setItem('theme', nextTheme);
    setLabel();
  });
})();
