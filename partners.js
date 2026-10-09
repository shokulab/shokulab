/*
 * shokulab — Partner (Cafés und Läden, die unsere Sando verkaufen)
 *
 * Neuer Partner: einen Eintrag ergänzen. Die Seite /partner sortiert nach Ort.
 *   name     Name des Cafés / Ladens
 *   type     'Café' oder 'Laden'
 *   street   Strasse und Nummer
 *   town     PLZ und Ort, z. B. '5000 Aarau'
 *   days     wann es Sando gibt, z. B. 'Mo–Mi, solange Vorrat'
 *   sorts    welche Sorten, z. B. ['Ichigo', 'Tamago']
 *   url      Website oder Instagram (optional)
 *   since    seit wann Partner, z. B. '2026-11-02' (optional)
 *   lat/lng  Koordinaten für die Karte (Claude ergänzt sie aus der Adresse)
 *   no       Partner-Nummer (1, 2, 3 … in der Reihenfolge, in der sie dazukommen)
 *   featured true = «Ausgewählt»-Markierung (sparsam verwenden)
 *
 * Beispiel (auskommentiert):
 * {
 *   name: 'Café Beispiel', type: 'Café',
 *   street: 'Bahnhofstrasse 1', town: '5000 Aarau',
 *   days: 'Mo–Mi, solange Vorrat', sorts: ['Ichigo', 'Kiwi', 'Tamago'],
 *   url: 'https://instagram.com/cafebeispiel', since: '2026-11-02',
 *   lat: 47.3925, lng: 8.0442, no: 1, featured: false
 * },
 */
window.SHOKULAB_PARTNERS = [
];
