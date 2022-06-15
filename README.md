# Sprent System

Hur man startar upp dev:

```
nvm use
npm install
kör med yarn
npm install i functionsmappen
firebase serve &
npm run start

```

Om du inte har firebase installerat:

```
nvm use
npm install -g firebase-tools
firebase login
```

## Lägga till användare till "appen"

Logga in på Firebase console: https://console.firebase.google.com/
Välj projekt (Sprent)
Klicka på "Authentication" i menyn

## Deploy frontend

```
npm run build-prod && firebase deploy --only hosting

```

## Deploy functions

```
firebase deploy --only functions

```

## Enabling CORS on Google Firebase storage

Create a file and call it cors.json:

```
[
  {
    "origin": ["*"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]
```

Use gsutil to update the cors settings:

```
gsutil cors set cors.json gs://sprent-7438c.appspot.com
```

tip: Use https://shell.cloud.google.com
