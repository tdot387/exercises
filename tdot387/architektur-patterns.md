# MVC-Konzept für eine Blog-Plattform

## Ziel
User können Artikel lesen, schreiben und kommentieren. Klare Trennung durch MVC für Wartbarkeit und Erweiterbarkeit.

---

## Model

**User**
- id, username, email, passwordHash, role, createdAt
Durch id können einem User zweifelsfrei Artikel und Kommentare zugeordnet werden. 

**Article**
- id, title, content, authorId, status, createdAt, updatedAt

**Comment**
- id, articleId, userId, content, createdAt

---

## View

### Artikel anzeigen
- Titel, Autor, Datum, Inhalt
- Kommentare

### Artikelliste
- Titel + Vorschau
- Suche / Filter / Pagination

### Artikel erstellen/bearbeiten
- Formular (Titel, Inhalt)
- Buttons: Speichern, Veröffentlichen

### Kommentare
- Liste unter Artikel
- Formular für neue Kommentare

---

## Controller

### Article
- anzeigen (Liste + Detail)
- erstellen, bearbeiten, löschen
- Validierung + Speicherung

### Comment
- Kommentar erstellen
- bearbeiten/löschen

