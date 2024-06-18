# Übung

In dieser Übung hast du die Möglichkeit, das Erstellen und Planen von Cron-Jobs für verschiedene
gängige Anwendungsfälle zu üben. Bitte folge den Anweisungen und vervollständige jede Aufgabe mit
den entsprechenden Cron-Expressions und Befehlen.

## Tägliches Datenbackup:

Aufgabe: **Plane ein tägliches Backup eines Verzeichnisses namens /important-data in ein
Backup-Verzeichnis /backup-folder um 3 Uhr morgens.**

- Cron-Expression: `0 3 * * *`

- Befehl: usr/bin/rsync -av /important-data /backup-folder

## Log-Rotation:

Aufgabe: **Rotiere Log-Dateien jeden Sonntag um Mitternacht, um zu verhindern, dass sie zu groß
werden. Deine Logs befinden sich in /var/log/myapp/.**

- Cron-Expression: `0 0 * * 7`

- Befehl: /usr/sbin/logrotate /etc/logrotate.d/myapp

## Geplante Benachrichtigungen:

Aufgabe: Sende täglich um 9 Uhr morgens E-Mails mit Systemstatusberichten.

- Cron-Expression: `0 9 * * *`

- Befehl: /usr/bin/mail -s "System Status Report" stefan@domain.de < /path/to/status_report.txt

## Regelmäßige Bereinigung:

Aufgabe: Plane ein Bereinigungsskript, das jeden Samstag um 14 Uhr läuft, um temporäre Dateien aus
dem Verzeichnis /tmp zu entfernen.

Cron-Expression: `0 14 * * 6`

Befehl: /bin/find /tmp -type f -atime +7 -exec rm {} \\;

## Individuelle Aufgabe:

Aufgabe: Erstelle einen individuellen Cron-Job für eine Aufgabe deiner Wahl. Definiere den Zeitplan
und den auszuführenden Befehl. Sei kreativ!

Cron-Expression: `0 0 1 Dec *`

Befehl: /usr/bin/python3 /scriptfolder/my-script.py
