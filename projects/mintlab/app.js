const input = document.querySelector('#term');
const results = document.querySelector('#results');
const search = () => {
  const term = (input.value.trim() || 'cat').replace(/[^a-z0-9]/gi, '').slice(0, 7);
  const samples = ['cyae4aMHGV4BB2p2EUaXZaudWUjEhdgeWCNcTXfT', '65ojWeLoxiGxneZZdaUB9fqwNNYsYDjcFwy1yiHkD', '31GifSKpHwEjw24UKk2d8zo1Rv3jjoNfEGyt96fvH'];
  results.innerHTML = samples.map((address, index) => `<li><span>${address.replace(new RegExp(term, 'i'), match => `<b class="available">${match}</b>`)}</span><span class="available">available · ${(0.075 + index * .015).toFixed(4)} SOL</span></li>`).join('');
};
document.querySelector('#search').addEventListener('click', search); input.addEventListener('keydown', event => { if (event.key === 'Enter') search(); }); search();
