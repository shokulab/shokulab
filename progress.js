/*
 * shokulab — Wo wir auf «Unser Weg» stehen (eine einzige Quelle)
 *
 * stage:  aktuelle Etappe (1 Markt, 2 Backstube, 3 Teilen, 4 Zuhause)
 * within: wie weit innerhalb dieser Etappe, von 0 (gerade begonnen) bis 1 (fast fertig)
 *
 * Von Hand anpassen, wenn ein echter Meilenstein erreicht ist.
 * Der Balken auf /weg füllt sich dann bis dorthin, der Punkt wandert mit.
 */
window.SHOKULAB_PROGRESS = {
  stage: 1,
  within: 0.04,
  since: '2026-10-15'   // zuletzt angepasst
};
