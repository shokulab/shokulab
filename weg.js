/* shokulab — Unser Weg: progress rail + stage accordion */
(function () {
  var P = window.SHOKULAB_PROGRESS || { stage: 1, within: 0 };
  var stage = Math.min(4, Math.max(1, +P.stage || 1));
  var within = Math.min(1, Math.max(0, +P.within || 0));
  var pct = ((stage - 1) + within) / 4 * 100;
  var NAMES = ['Markt', 'Backstube', 'Teilen', 'Zuhause'];

  document.querySelectorAll('.track-wrap').forEach(function (w) {
    w.style.setProperty('--progress', '0%');
    // let the browser paint the empty rail first, then fill it
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      w.style.setProperty('--progress', pct.toFixed(2) + '%');
      w.classList.add('ready');
    }); });
    // mark stages already passed and the current one
    w.querySelectorAll('.track li').forEach(function (li, i) {
      if (i + 1 < stage) li.classList.add('done');
      if (i + 1 === stage) li.classList.add('now');
    });
    var note = w.querySelector('.track-note');
    if (note) {
      var where = within < 0.2 ? 'am Anfang von' : within > 0.8 ? 'kurz vor dem Ende von' : 'mitten in';
      note.textContent = 'Wir stehen ' + where + ' Etappe 0' + stage + ' · ' + NAMES[stage - 1] + '.';
    }
  });

  // overview: stages open and close on click/tap
  document.querySelectorAll('.stages.acc .stage').forEach(function (li) {
    var btn = li.querySelector('.stage-head'), body = li.querySelector('.stage-body');
    if (!btn || !body) return;
    li.classList.add('js');
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      li.classList.toggle('open', !open);
    });
  });
})();
