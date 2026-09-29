export default function Skills({ skills }) {
  return (
    <section className="section" id="skills">
      <div className="container split">
        <h2 className="section-title">Skills</h2>
        <div className="skill-groups">
          {skills.map((g) => (
            <div key={g.group} className="skill-group">
              <h3>{g.group}</h3>
              <ul className="chips">
                {g.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
