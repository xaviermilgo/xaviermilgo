(() => {
  const frames = [...document.querySelectorAll('.demo-frame')];
  const origins = new Map(frames.map(frame => [frame, new URL(frame.src).origin]));
  const initialise = frame => frame.contentWindow?.postMessage({type:'portfolio-demo:init'}, origins.get(frame));
  frames.forEach(frame => frame.addEventListener('load', () => initialise(frame)));
  window.addEventListener('message', event => {
    const frame = frames.find(item => item.contentWindow === event.source);
    if (!frame || event.origin !== origins.get(frame)) return;
    if (event.data?.type === 'portfolio-demo:ready') { initialise(frame); return; }
    if (event.data?.type !== 'portfolio-demo:size' || !Number.isFinite(event.data.height) || event.data.height < 1) return;
    frame.style.height = Math.min(1800, Math.max(360, Math.ceil(event.data.height))) + 'px';
    frame.closest('.embedded-demo').querySelector('.demo-load-status').hidden = true;
  });
})();
