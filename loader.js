/*
 * shokulab — Loader
 * Erster Besuch (alle 7 Tage einmal): langer Loader — eine Herzschlag-Linie,
 * deren Ausschläge unsere Sando-Dreiecke, eine Erdbeere und ein Ei sind.
 * Danach, beim Klicken durch die Seite: kurzer Loader oben am Rand.
 * Wer «Bewegung reduzieren» eingestellt hat, sieht keinen Loader.
 */
(function () {
  var html = document.documentElement;
  var KEY = 'shokulab-intro', WEEK = 7 * 864e5;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var seen = 0;
  try { seen = +localStorage.getItem(KEY) || 0; } catch (e) { seen = Date.now(); }
  var mode = reduce ? 'none' : (Date.now() - seen > WEEK ? 'intro' : 'quick');
  if (mode === 'none') return;

  var css = '' +
    'html.ld-intro{overflow:hidden}' +
    'html.ld-intro::before{content:"";position:fixed;inset:0;background:#F2DDDB;z-index:9998}' +
    '.ld{position:fixed;inset:0;z-index:9999;background:#F2DDDB;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;transition:opacity .55s ease,visibility 0s .55s}' +
    '.ld.out{opacity:0;visibility:hidden}' +
    '.ld svg{width:min(86vw,640px);height:auto;overflow:visible}' +
    '.ld .beat{fill:none;stroke:#3D2F27;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:var(--len);stroke-dashoffset:var(--len);animation:ld-draw 1.9s cubic-bezier(.45,.05,.35,1) .15s forwards}' +
    '.ld .acc{fill:none;stroke:#8B4A3C;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;opacity:0;animation:ld-in .35s ease forwards}' +
    '.ld .seed{fill:#8B4A3C;opacity:0;animation:ld-in .3s ease forwards}' +
    '.ld .yolk{fill:#E7B98A;opacity:0;animation:ld-in .4s ease forwards}' +
    '.ld .pulse{fill:#8B4A3C;opacity:0;animation:ld-in .2s ease 2s forwards,ld-glow 1.2s ease-in-out 2.1s infinite}' +
    '.ld .word{font:600 clamp(34px,7vw,52px)/1 "Space Grotesk",system-ui,sans-serif;letter-spacing:-.02em;color:#3D2F27;opacity:0;transform:translateY(8px);animation:ld-up .6s cubic-bezier(.16,1,.3,1) 1.75s forwards}' +
    '.ld .tag{font:400 12px/1 "IBM Plex Mono",ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#8B4A3C;opacity:0;animation:ld-in .5s ease 2.05s forwards}' +
    '.ld-q{position:fixed;left:0;right:0;top:0;height:26px;z-index:9999;pointer-events:none;transition:opacity .25s ease}' +
    '.ld-q.out{opacity:0}' +
    '.ld-q svg{display:block;width:100%;height:26px}' +
    '.ld-q path{fill:none;stroke:#8B4A3C;stroke-width:1.6;stroke-linejoin:round;stroke-linecap:round;stroke-dasharray:var(--len);stroke-dashoffset:var(--len);animation:ld-draw .55s cubic-bezier(.45,.05,.35,1) forwards}' +
    '@keyframes ld-draw{to{stroke-dashoffset:0}}' +
    '@keyframes ld-in{to{opacity:1}}' +
    '@keyframes ld-up{to{opacity:1;transform:none}}' +
    '@keyframes ld-glow{0%,100%{opacity:1}50%{opacity:.35}}';
  var st = document.createElement('style'); st.textContent = css;
  (document.head || html).appendChild(st);

  // heartbeat: flat, blip, SANDO triangle, blip, STRAWBERRY, blip, EGG, blip, SANDO triangle, flat
  var BEAT = 'M0 80 H70 L78 72 L86 88 L94 80 H120 L120 26 L176 80 H214 L222 72 L230 88 L238 80 H262 ' +
             'L283 80 C262 62 256 44 264 34 C272 24 280 26 283 32 C286 26 294 24 302 34 C310 44 304 62 283 80 ' +
             'H330 L338 72 L346 88 L354 80 H382 C382 50 389 28 400 28 C411 28 418 50 418 80 ' +
             'H446 L454 72 L462 88 L470 80 H500 L500 34 L548 80 H640';
  var ICONS = '' +
    // sando filling lines (cut face), strawberry leaves + seeds, egg yolk
    '<path class="acc" style="animation-delay:.55s" d="M126 50 L150 74"/>' +
    '<path class="acc" style="animation-delay:.6s" d="M126 62 L138 74"/>' +
    '<path class="acc" style="animation-delay:1.05s" d="M273 31 Q283 23 293 31 M283 27 L283 18"/>' +
    '<circle class="seed" style="animation-delay:1.1s" cx="276" cy="44" r="1.5"/>' +
    '<circle class="seed" style="animation-delay:1.13s" cx="290" cy="44" r="1.5"/>' +
    '<circle class="seed" style="animation-delay:1.16s" cx="283" cy="54" r="1.5"/>' +
    '<circle class="seed" style="animation-delay:1.19s" cx="274" cy="58" r="1.5"/>' +
    '<circle class="seed" style="animation-delay:1.22s" cx="292" cy="58" r="1.5"/>' +
    '<circle class="yolk" style="animation-delay:1.5s" cx="400" cy="58" r="8.5"/>' +
    '<path class="acc" style="animation-delay:1.9s" d="M506 52 L526 72 M506 64 L514 72"/>' +
    '<circle class="pulse" cx="640" cy="80" r="4"/>';

  function setLen(path) {
    try { path.style.setProperty('--len', Math.ceil(path.getTotalLength()) + 1); } catch (e) { path.style.setProperty('--len', 2000); }
  }

  function intro() {
    html.classList.add('ld-intro');
    function mount() {
      var el = document.createElement('div');
      el.className = 'ld'; el.setAttribute('aria-hidden', 'true');
      el.innerHTML = '<svg viewBox="0 0 640 110" role="presentation"><path class="beat" d="' + BEAT + '"/>' + ICONS + '</svg>' +
        '<div class="word">shokulab</div><div class="tag">Scientifically good.</div>';
      document.body.appendChild(el);
      setLen(el.querySelector('.beat'));
      html.classList.remove('ld-intro'); html.classList.add('ld-lock');
      var done = false;
      function finish() {
        if (done) return; done = true;
        try { localStorage.setItem(KEY, String(Date.now())); } catch (e) {}
        el.classList.add('out');
        document.documentElement.style.overflow = '';
        setTimeout(function () { el.remove(); }, 700);
      }
      document.documentElement.style.overflow = 'hidden';
      setTimeout(finish, 2900);
      // anyone in a hurry can skip
      el.addEventListener('click', finish);
      window.addEventListener('keydown', finish, { once: true });
    }
    if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
  }

  function quickBar() {
    var w = Math.max(320, window.innerWidth), mid = w * 0.5;
    var d = 'M0 18 H' + (mid - 40) + ' L' + (mid - 34) + ' 13 L' + (mid - 28) + ' 22 L' + (mid - 22) + ' 18 H' + (mid - 8) +
            ' L' + (mid - 8) + ' 3 L' + (mid + 10) + ' 18 H' + w;
    var el = document.createElement('div');
    el.className = 'ld-q'; el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<svg viewBox="0 0 ' + w + ' 26" preserveAspectRatio="none"><path d="' + d + '"/></svg>';
    document.body.appendChild(el);
    setLen(el.querySelector('path'));
    return el;
  }

  function quick() {
    function run() {
      var el = quickBar();
      setTimeout(function () { el.classList.add('out'); setTimeout(function () { el.remove(); }, 300); }, 650);
    }
    if (document.body) run(); else document.addEventListener('DOMContentLoaded', run);
  }

  if (mode === 'intro') intro(); else quick();

  // clicking an internal link: start the quick line right away
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target && a.target !== '_self') return;
    var url; try { url = new URL(a.href, location.href); } catch (err) { return; }
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.hash) return;
    if (/\.(jpe?g|png|pdf|webp)$/i.test(url.pathname)) return;
    quickBar();
  });
  // back/forward cache: remove a leftover line
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) document.querySelectorAll('.ld-q').forEach(function (n) { n.remove(); });
  });
})();
