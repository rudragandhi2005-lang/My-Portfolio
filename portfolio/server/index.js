import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { profile, skills, projects, education } from './data.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5000;
const MESSAGES_FILE = path.join(__dirname, 'messages.json');
const CLIENT_DIST = path.join(__dirname, '..', 'client', 'dist');

const app = express();
app.use(express.json({ limit: '10kb' }));
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));

// ---------- Content ----------
app.get('/api/portfolio', (_req, res) => {
  res.json({ profile, skills, projects, education });
});

// ---------- Contact form ----------
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages. Please try again in a few minutes.' },
});

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function validate({ name, email, message, website }) {
  if (website) return 'spam'; // honeypot field: real people leave it empty
  const errors = {};
  if (!name || name.trim().length < 2) errors.name = 'Enter your name.';
  if (!email || !isEmail(email.trim())) errors.email = 'Enter a valid email address.';
  if (!message || message.trim().length < 10) errors.message = 'Write at least 10 characters.';
  if (message && message.length > 2000) errors.message = 'Keep it under 2000 characters.';
  return Object.keys(errors).length ? errors : null;
}

async function saveMessage(entry) {
  let list = [];
  try {
    list = JSON.parse(await fs.readFile(MESSAGES_FILE, 'utf8'));
  } catch {
    /* first message */
  }
  list.push(entry);
  await fs.writeFile(MESSAGES_FILE, JSON.stringify(list, null, 2));
}

async function sendMail({ name, email, message }) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return; // email is optional
  const port = Number(SMTP_PORT) || 465;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  await transporter.sendMail({
    from: `"Portfolio" <${SMTP_USER}>`,
    to: MAIL_TO || SMTP_USER,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: `${message}\n\n— ${name} <${email}>`,
  });
}

app.post('/api/contact', contactLimiter, async (req, res) => {
  const problems = validate(req.body || {});
  if (problems === 'spam') return res.json({ ok: true }); // pretend success to bots
  if (problems) return res.status(400).json({ errors: problems });

  const entry = {
    name: req.body.name.trim(),
    email: req.body.email.trim(),
    message: req.body.message.trim(),
    receivedAt: new Date().toISOString(),
  };

  try {
    await saveMessage(entry);
    sendMail(entry).catch((err) => console.error('Email failed:', err.message));
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not send your message. Please email me directly.' });
  }
});

// ---------- Serve the built React app in production ----------
app.use(express.static(CLIENT_DIST));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(CLIENT_DIST, 'index.html'), (err) => err && next());
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
