% FutureMessage Datenbank

# Dienst aufsetzen

```
$ npm init -y
$ npm install better-sqlite3 express
```

# Dienst starten

```
$ node app.js
```

# Anwendungsbeispiele

## Alle Nachrichten anzeigen.

```
$ curl http://localhost:7071/nachrichten
[{
  "id": 1,
  "empfaenger": "+4179xxxxxxxx",
  "text": "Frohes neues Jahr!",
  "zeitpunkt": "2026-01-01T00:00"
}]
```

## Pendente Nachrichten anzeigen.

```
$ curl http://localhost:7071/nachrichten
[{
  "id": 1,
  "empfaenger": "+4179xxxxxxxx",
  "text": "Frohes neues Jahr!",
  "zeitpunkt": "2026-01-01T00:00"
}]
```

## Eine Nachricht erstellen.

```
$ curl -X POST http://localhost:7071/nachrichten\
  -H "Content-Type: application/json"\
  -d '{
    "empfaenger": "+4179xxxxxxxx",
    "text": "Frohes neues Jahr!",
    "zeitpunkt": "2027-01-01T00:00"
  }'
{"status":"OK"}
```

## Eine Nachricht löschen.

```
$ curl -X POST http://localhost:7071/nachrichten/1
{"status":"OK"}
```
