% FutureMessage Datenbank

# Anwendung

Alle Nachrichten anzeigen:

```
$ curl http://localhost:7071/nachrichten
[{
  "id": 1,
  "empfaenger": "+4179xxxxxxxx",
  "text": "Frohes neues Jahr!",
  "zeitpunkt": "2026-01-01T00:00"
}]
```

Pendente Nachrichten anzeigen:

```
$ curl http://localhost:7071/nachrichten
[{
  "id": 1,
  "empfaenger": "+4179xxxxxxxx",
  "text": "Frohes neues Jahr!",
  "zeitpunkt": "2026-01-01T00:00"
}]
```

Eine Nachricht erstellen:

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

Eine Nachricht löschen:

```
$ curl -X POST http://localhost:7071/nachrichten/1
{"status":"OK"}
```

# Entwicklung

App installieren:

```
$ cd src
$ npm install
```

App starten:

```
$ cd src
$ npm run dev
```

# Live-Betrieb

Pakete installieren:

```
# curl -fsSL https://deb.nodesource.com/setup_25.x | bash -
# apt-get install -y caddy docker.io npm
```

App installieren:

```
# cd
# git clone git@github.com:vinverardi/fm-database.git
# cd fm-database/src
# npm i
```

App als Hintergrunddienst hinzufügen:

```
# cat > /etc/systemd/system/fm-database.service
[Install]
WantedBy=multi-user.target

[Service]
Environment=NODE_ENV=production
ExecStart=/usr/bin/node app.js
Restart=on-failure
RestartSec=5
Type=simple
User=root
WorkingDirectory=/root/fm-database/src

[Unit]
After=network.target
Description=FutureMessage Datenbank
^D

# systemctl daemon-reload
# systemctl enable fm-database
```

App als Hintergrunddienst starten:

```
# systemctl start fm-database
```
