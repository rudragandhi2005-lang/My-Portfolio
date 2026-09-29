# Rudra Nimish Gandhi: Portfolio

React (Vite) frontend + Node/Express backend.

## Run it locally
```bash
npm run install:all      # installs root, client and server dependencies
cp server/.env.example server/.env
npm run dev              # client on :5173, server on :5000
```
Open http://localhost:5173

## Edit your content
All text (about, skills, projects, education) is in `server/data.js`.
Add project links there, e.g. `links: [{ label: 'Live site', url: 'https://...' }]`.
Replace the CV by overwriting `client/public/Rudra_Nimish_Gandhi_CV.pdf`.

## Contact form
Messages are saved to `server/messages.json`. To also get them by email,
fill in the SMTP values in `server/.env` (Gmail needs an App Password).

## Deploy (one service)
```bash
npm run build            # builds client/dist
npm start                # Express serves the API and the built site
```
Works on Render, Railway, or any Node host. Set the same variables from `.env`.
