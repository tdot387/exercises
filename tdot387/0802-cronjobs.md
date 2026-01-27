Tägliches Datenbackup:
0 3 * * *
/usr/bin/rsync -av /important-data/ /backup-Folder/

Log-Rotation:
0 0 * * 0
/usr/sbin/logrotate /etc/logrotate.d/myapp

Geplante Benachrichtigungen:
0 9 * * *
/usr/bin/mail -s "System Status Report" user@example.com < /path/to/status_report.txt

Regelmäßige Bereinigung:
0 14 * * 6
/bin/find /tmp -type f -atime +7 -exec rm {} \\;

Individuelle Aufgabe:
0 18 * * 5
/usr/bin/mail -s "Freitagabend Neuigkeiten" sagich@euch.net < /path/to/weekly-digest.txt

 
