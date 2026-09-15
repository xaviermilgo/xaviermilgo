(() => {
  const nav = document.querySelector('.work-nav');
  const tabs = [...nav.querySelectorAll('[data-ecosystem]')];
  const groups = [...document.querySelectorAll('.work-group')];
  nav.setAttribute('role', 'tablist');
  const selectedFromURL = () => {
    const url = new URL(window.location.href);
    const ecosystem = url.searchParams.get('ecosystem');
    if (ecosystem === 'solana' || ecosystem === 'evm') return ecosystem;
    return url.hash === '#solana-work' ? 'solana' : 'evm';
  };

  function render() {
    const selected = selectedFromURL();
    tabs.forEach(tab => {
      const ecosystem = tab.dataset.ecosystem;
      const active = ecosystem === selected;
      const url = new URL(window.location.href);
      url.searchParams.set('ecosystem', ecosystem);
      url.hash = 'work';
      tab.href = url.href;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', ecosystem + '-work');
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    groups.forEach(group => {
      const ecosystem = group.id.replace('-work', '');
      group.hidden = ecosystem !== selected;
      group.setAttribute('role', 'tabpanel');
      group.setAttribute('aria-labelledby', ecosystem + '-tab');
      group.tabIndex = 0;
    });
    nav.closest('.gallery').classList.add('has-tabs');
  }

  function select(tab) {
    if (tab.getAttribute('aria-selected') !== 'true') {
      const url = new URL(window.location.href);
      url.searchParams.set('ecosystem', tab.dataset.ecosystem);
      // Change the selection without jumping away from the reader's position.
      history.pushState(null, '', url);
      render();
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      select(tab);
    });
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (event.key === ' ') next = index;
      if (next === undefined) return;
      event.preventDefault();
      tabs[next].focus();
      select(tabs[next]);
    });
  });
  window.addEventListener('popstate', render);
  window.addEventListener('hashchange', render);
  render();
})();
