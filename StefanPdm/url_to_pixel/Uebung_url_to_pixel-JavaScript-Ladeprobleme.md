<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JS Laden Problem</title>
    <script src="js/script1.js"></script> // script1
    <script>
      console.log("Inline script!") // ?? welchen Sinn soll das haben??
    </script>
</head>
<body>
    <h1>Willkommen beim JS Lade-Probleme Workshop!</h1>
    <button id="loadScript">Lade script3.js</button> // läd script3 nach click event
    <script src="js/script2.js"></script> // script2
</body>
</html>

Script 1:  
console.log("Script 1 ist fertig geladen");  
--

Script 2:  
document.getElementById("loadScript").addEventListener("click", function() {  
let scriptElement = document.createElement("script");  
scriptElement.src = "js/script3.js";  
document.body.appendChild(scriptElement); });

console.log("Script 2 ist fertig geladen");

Script 3:  
console.log("Script 3 ist fertig geladen");

Lösung:

1. <script src="js/script1.js" defer></script> // set defer prop to prevent load blocking effect
