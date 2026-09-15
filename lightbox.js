(() => {
  const dialog = document.querySelector('.lightbox');
  const image = dialog.querySelector('.lightbox-image');
  const close = dialog.querySelector('.lightbox-close');
  const open = figure => {
    const source = figure.querySelector('img');
    image.src = source.src;
    image.alt = source.alt;
    dialog.showModal();
    close.focus();
  };
  document.querySelectorAll('.project-shot').forEach(figure => {
    figure.addEventListener('click', () => open(figure));
    figure.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(figure); }
    });
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
})();
