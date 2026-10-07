/*
 * shokulab — Markttermine (eine einzige Quelle)
 *
 * Neuer Markt: einfach einen Eintrag ergänzen. Kommende und vergangene
 * Termine sortieren sich automatisch nach Datum und Uhrzeit.
 * Zeiten immer mit +02:00 (Sommerzeit) oder +01:00 (Winterzeit) angeben.
 *
 * note: kurze Notiz fürs Laborbuch (erscheint, sobald der Markt vorbei ist)
 */
window.SHOKULAB_EVENTS = [
  {
    charge: '#001',
    title: 'Wochenmarkt Wohlen',
    place: 'Sternenplatz',
    town: 'Wohlen AG',
    start: '2026-10-10T09:00:00+02:00',
    end:   '2026-10-10T13:00:00+02:00',
    note:  'Erster Marktstand und erster Testlauf.'
  }
];

(function () {
  var DAYS = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  var MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August',
                'September', 'Oktober', 'November', 'Dezember'];

  // Show dates in Swiss time no matter where the visitor's device is.
  function parts(iso) {
    var d = new Date(iso);
    var f = new Intl.DateTimeFormat('de-CH', {
      timeZone: 'Europe/Zurich', year: 'numeric', month: 'numeric', day: 'numeric',
      weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: false
    }).formatToParts(d);
    var o = {};
    f.forEach(function (p) { o[p.type] = p.value; });
    return o;
  }

  function list() {
    return window.SHOKULAB_EVENTS.slice().sort(function (a, b) {
      return new Date(a.start) - new Date(b.start);
    });
  }

  window.shokulabEvents = {
    upcoming: function (now) {
      now = now || new Date();
      return list().filter(function (e) { return new Date(e.end) > now; });
    },
    past: function (now) {
      now = now || new Date();
      return list().filter(function (e) { return new Date(e.end) <= now; }).reverse();
    },
    isLive: function (e, now) {
      now = now || new Date();
      return new Date(e.start) <= now && now < new Date(e.end);
    },
    isToday: function (e, now) {
      var a = parts(e.start), b = parts((now || new Date()).toISOString());
      return a.year === b.year && a.month === b.month && a.day === b.day;
    },
    longDate: function (iso) {
      var p = parts(iso);
      return p.weekday + ', ' + Number(p.day) + '. ' + MONTHS[Number(p.month) - 1];
    },
    shortDate: function (iso) {
      var p = parts(iso);
      return ('0' + p.day).slice(-2) + '.' + ('0' + p.month).slice(-2) + '.' + p.year;
    },
    time: function (iso) {
      var p = parts(iso);
      return p.hour + ':' + p.minute;
    },
    DAYS: DAYS
  };
})();
