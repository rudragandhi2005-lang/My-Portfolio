import { ArrowDown, ArrowUpRight } from './Icons.jsx';

export default function Hero({ profile }) {
  return (
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-badge" aria-hidden="true">
        <span className="ring ring-1" />
        <span className="ring ring-2" />
        <span className="badge">{profile.initials}</span>
      </div>

      <div className="container hero-inner">
        <p className="status">
          <span className="status-dot" />
          {profile.status} · {profile.location}
        </p>

        <h1 className="hero-title">
          <span>{profile.firstName}</span> <span className="outline">{profile.middleName}</span>
          <br />
          <span>{profile.lastName}</span>
          <span className="period" aria-hidden="true" />
        </h1>

        <div className="hero-bottom">
          <p className="hero-tagline">{profile.tagline}</p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#projects">
              <span>View projects</span>
              <ArrowDown className="ico ico-down" />
            </a>
            <a className="btn btn-ghost" href="#contact">
              <span>Let’s talk</span>
              <ArrowUpRight className="ico ico-out" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
