(function () {
  var combos = [
    { number: 147, colors: ['#f27291', '#82241f', '#b5decc'] },
    { number: 135, colors: ['#f5ecc2', '#437742', '#97acc8'] },
    { number: 142, colors: ['#a94151', '#c19f2c', '#97acc8'] },
    { number: 150, colors: ['#fdd4bd', '#b2b73e', '#b4cdc2'] },
    { number: 214, colors: ['#ebd3a2', '#a36752', '#4f4086'] }
  ];

  var key = 'sanzoWadaComboIndex';
  var stored = parseInt(localStorage.getItem(key), 10);
  var index = isNaN(stored) ? 0 : stored % combos.length;
  var combo = combos[index];

  document.documentElement.style.setProperty('--palette-1', combo.colors[0]);
  document.documentElement.style.setProperty('--palette-2', combo.colors[1]);
  document.documentElement.style.setProperty('--palette-3', combo.colors[2]);

  localStorage.setItem(key, (index + 1) % combos.length);

  document.addEventListener('DOMContentLoaded', function () {
    var caption = document.getElementById('palette-caption');
    if (caption) {
      caption.innerHTML = "Colors taken from Sanzo Wada's <em>Dictionary of Color Combinations</em>, combination " + combo.number + ". Refresh to see some different combinations!";
    }
  });
})();
