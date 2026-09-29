export default function Education({ education }) {
  return (
    <section className="section" id="education">
      <div className="container split">
        <h2 className="section-title">Education</h2>
        <ol className="timeline">
          {education.map((e) => (
            <li key={e.title}>
              <span className="year">{e.year}</span>
              <div>
                <h3>{e.title}</h3>
                <p>{e.place}</p>
                {e.note && <p className="meta">{e.note}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
