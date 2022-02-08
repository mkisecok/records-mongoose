## Aufgabe 02 - Middleware und CORS

Middleware-Funktionen, sind Funktionen die Zugriff auf das Anfrageobjekt (request, kurz `req`), das Antwortobjekt (response, kurz `res`) und die folgende Middleware-Funktion (`next`) im Anfrage/Antwort-Zyklus erhalten. Dadurch können sie z.B. die ankommende Anfrage verarbeiten oder verändern, oder die erstellte Antwort (etwa deren Header) verändern.

Middleware-Funktionen, werden in der Reihenfolge abgearbeitet, in der sie mit app.use() hinzugefügt werden. Standard-Middlewares für Express sind z.B.
* Die Protokoll-Middleware [morgan](http://expressjs.com/en/resources/middleware/morgan.html)
* Der Request-Parser für JSON (`express.json()`)

Das sog. Cross-Origin Resource Sharing (CORS) (de: teilen von Ressourcen von verschiedenen Quellen/Herkunft) ist ein Mechanismus, der zusätzliche Angaben im HTTP header benutzt. Diese teilen dem Browser mit, dass er einer Anwendung, mit einer bestimmten Herkunft, den Zugriff auf Ressourcen einer anderen Herkunft zu verbieten.

Von einer `cross-origin` Anfrage wird gesprochen, wenn eine HTTP-Anfrage auf ein anderes Ziel schaut. (z.B. überall wo Ressourcen von anderen Seiten eingebunden werden, wie Social Plugins, Twitter-Beiträge, Facebook-Likes oder dergleichen). Also immer dann, wenn Domain (meineseite.de), Protokoll (http/https), oder Port (3000, 8080, ...) nicht identisch sind, mit der Seite die Anfrage startet.

**Übung**:
1. Erstell deine eigene Sicherheits-Middleware-Funktion. Die sich darum kümmert über HTTP-Header für die Response-Objekte, dem Browser zu sagen, dass du Cross-Origin Resource Sharing (CORS) erlaubst.
    * Erstelle dafür ein `/middleware/` Verzeichnis. 
    * Erzeuge darin eine Datei für deine Middleware.
    * Schreib eine Middleware-Funktion, der folgenden Form :
    ```javascript
    const meineMiddleware = (request, response, next) => {
        /* ... Response-Header für CORS-Aktivierung bauen*/ 
        next();
    }
    ```
    * Importiere deine Middleware-Funktion in deiner App
    * Sag deiner Express-App, dass sie die Middleware verwenden soll. (`app.use( ... )`)