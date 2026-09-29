export default function About({ profile }) {
  return (
    <section className="section" id="about">
      <div className="container split">
        <h2 className="section-title">About</h2>
        <div className="prose">
          {profile.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="meta">Languages: {profile.languages.join(', ')}</p>
        </div>
      </div>
    </section>
  );
}
