(function () {
  var combos = [
    { number: 147, colors: ['#f27291', '#82241f', '#b5decc'] },
    { number: 135, colors: ['#f5ecc2', '#437742', '#97acc8'] },
    { number: 142, colors: ['#a94151', '#c19f2c', '#97acc8'] },
    { number: 150, colors: ['#fdd4bd', '#b2b73e', '#b4cdc2'] },
    { number: 214, colors: ['#ebd3a2', '#a36752', '#4f4086'] }
  ];

  var currentKey = 'sanzoWadaComboIndex';
  var nextKey = 'sanzoWadaNextComboIndex';

  function randomIndex(excluding) {
    if (combos.length <= 1) return 0;
    var i;
    do {
      i = Math.floor(Math.random() * combos.length);
    } while (i === excluding);
    return i;
  }

  function setColors(index) {
    var combo = combos[index];
    var root = document.documentElement.style;
    root.setProperty('--palette-1', combo.colors[0]);
    root.setProperty('--palette-2', combo.colors[1]);
    root.setProperty('--palette-3', combo.colors[2]);
  }

  function setPreviewColors(index) {
    var combo = combos[index];
    var root = document.documentElement.style;
    root.setProperty('--preview-1', combo.colors[0]);
    root.setProperty('--preview-2', combo.colors[1]);
    root.setProperty('--preview-3', combo.colors[2]);
  }

  function setCaption(index) {
    var caption = document.getElementById('palette-caption');
    if (caption) {
      caption.innerHTML = "Colors taken from Sanzo Wada's <em>Dictionary of Color Combinations</em>, combination " + combos[index].number + ".";
    }
  }

  var storedCurrent = sessionStorage.getItem(currentKey);
  var currentIndex = storedCurrent === null ? randomIndex(-1) : parseInt(storedCurrent, 10);
  sessionStorage.setItem(currentKey, currentIndex);
  setColors(currentIndex);

  var storedNext = sessionStorage.getItem(nextKey);
  var nextIndex = storedNext === null ? randomIndex(currentIndex) : parseInt(storedNext, 10);
  sessionStorage.setItem(nextKey, nextIndex);
  setPreviewColors(nextIndex);

  document.addEventListener('DOMContentLoaded', function () {
    setCaption(currentIndex);

    var btn = document.getElementById('switch-color-btn');
    if (btn) {
      btn.addEventListener('click', function () {
        currentIndex = nextIndex;
        sessionStorage.setItem(currentKey, currentIndex);
        setColors(currentIndex);
        setCaption(currentIndex);

        nextIndex = randomIndex(currentIndex);
        sessionStorage.setItem(nextKey, nextIndex);
        setPreviewColors(nextIndex);
      });
    }
  });
})();
