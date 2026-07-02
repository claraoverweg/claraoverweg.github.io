(function () {
  var combos = [
    { colors: ['#bb7125', '#ebd3a2', '#6b7140', '#34454c'] },
    { colors: ['#f8b6ba', '#a84222', '#f5ecc2', '#fdc57e'] },
    { colors: ['#f37f94', '#bc892b', '#b5b1d8', '#704357'] },
    { colors: ['#cab356', '#f15a30', '#00b49b', '#bce4e5'] },
    { colors: ['#6d4145', '#ffefae', '#555832', '#96d1aa'] }
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
    root.setProperty('--palette-4', combo.colors[3]);
  }

  function setPreviewColors(index) {
    var combo = combos[index];
    var root = document.documentElement.style;
    root.setProperty('--preview-1', combo.colors[0]);
    root.setProperty('--preview-2', combo.colors[1]);
    root.setProperty('--preview-3', combo.colors[2]);
    root.setProperty('--preview-4', combo.colors[3]);
  }

  function setCaption() {
    var caption = document.getElementById('palette-caption');
    if (caption) {
      caption.innerHTML = "Colors taken from Sanzo Wada's <em>Dictionary of Color Combinations</em>.";
    }
  }

  var stored = sessionStorage.getItem(currentKey);
  var currentIndex = stored === null ? randomIndex(-1) : parseInt(stored, 10);
  sessionStorage.setItem(currentKey, currentIndex);
  setColors(currentIndex);

  var storedNext = sessionStorage.getItem(nextKey);
  var nextIndex = storedNext === null ? randomIndex(currentIndex) : parseInt(storedNext, 10);
  sessionStorage.setItem(nextKey, nextIndex);
  setPreviewColors(nextIndex);

  document.addEventListener('DOMContentLoaded', function () {
    setCaption();

    var btn = document.getElementById('switch-color-btn');
    if (btn) {
      btn.addEventListener('click', function () {
        currentIndex = nextIndex;
        sessionStorage.setItem(currentKey, currentIndex);
        setColors(currentIndex);
        setCaption();

        nextIndex = randomIndex(currentIndex);
        sessionStorage.setItem(nextKey, nextIndex);
        setPreviewColors(nextIndex);
      });
    }
  });
})();
