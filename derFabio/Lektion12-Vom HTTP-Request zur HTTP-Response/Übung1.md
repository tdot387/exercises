Bei GET werden mir in einem Table der Inhalt des Ordners angezeigt, in meinem Fall die Unterordner meines "Projects" Ordners. Die Table Rows sind die Unterordner.
POST, PUT, PATCH, DELETE, OPTIONS resultieren in einem 404 not found error.
HEAD zeigt die Metadaten an.

Welche HTTP-Methode wäre in welchem Anwendungsfall sinnvoll?
GET: um eine Ressource abzurufen
POST: um Daten an den Server zu senden, um eine neue Ressource zu erstellen
PUT: um eine Ressource zu erstellen oder zu aktualisieren
PATCH: um eine Ressource partiell zu aktualisieren
DELETE: um eine Ressource zu löschen
HEAD: um Metadaten über eine Ressource abzurufen, ohne den tatsächlichen Inhalt der Ressource zu übertragen
