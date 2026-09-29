import { useState } from 'react';

const empty = { name: '', email: '', message: '', website: '' };

export default function Contact({ profile }) {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed
  const [failMsg, setFailMsg] = useState('');

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrors({});
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus('sent');
        setForm(empty);
      } else if (body.errors) {
        setErrors(body.errors);
        setStatus('idle');
      } else {
        setFailMsg(body.error || 'Could not send your message.');
        setStatus('failed');
      }
    } catch {
      setFailMsg('Could not reach the server. Email me directly instead.');
      setStatus('failed');
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container split">
        <div>
          <h2 className="section-title">Contact</h2>
          <ul className="contact-list">
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
            </li>
            <li>{profile.address}</li>
          </ul>
        </div>

        <form className="form" onSubmit={submit} noValidate>
          <label>
            Name
            <input value={form.name} onChange={set('name')} autoComplete="name" required />
            {errors.name && <span className="err">{errors.name}</span>}
          </label>
          <label>
            Email
            <input type="email" value={form.email} onChange={set('email')} autoComplete="email" required />
            {errors.email && <span className="err">{errors.email}</span>}
          </label>
          <label>
            Message
            <textarea rows="5" value={form.message} onChange={set('message')} required />
            {errors.message && <span className="err">{errors.message}</span>}
          </label>
          {/* Honeypot: hidden from people, bots fill it in */}
          <input
            className="hp"
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
            value={form.website}
            onChange={set('website')}
          />
          <button className="btn btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          <p className="form-status" role="status">
            {status === 'sent' && 'Message sent. I will reply by email.'}
            {status === 'failed' && failMsg}
          </p>
        </form>
      </div>
    </section>
  );
}
