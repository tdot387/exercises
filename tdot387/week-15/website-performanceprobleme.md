## Setup
Ich habe zwei Varianten der Website erstellt, eine schnelle (15-04-website-performanceprobleme-fast) und eine langsame (15-04-website-performanceprobleme-slow)

## Absichtlich eingeführte Probleme (slow)
- Kein Defer im JS (lädt lange, weil Zeile für Zeile intrepretiert wird: Timeout zu Beginn dauert bereits vier Sekunden)
- Das Gif ist etwa 3mb groß und hat weder eine feste Höhe noch Breite und kein lazy-loading-Attribut

## Lighthouse Findings
- Reduce JavaScript execution time / Minimize main-thread work
- Eliminate render-blocking resources
- Image elements do not have explicit width and height
- Serve images in next-gen formats / Properly size images

## Fixes
- 'defer' für Scripte
- Timeout entfernen
- Bild: Höhe/Breite, loading="lazy"