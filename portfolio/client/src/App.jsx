import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Education from './components/Education.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const load = () => {
    setError(false);
    fetch('/api/portfolio')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setData)
      .catch(() => setError(true));
  };

  useEffect(load, []);

  if (error) {
    return (
      <main className="state">
        <p>The portfolio could not load. Check that the server is running, then try again.</p>
        <button className="btn btn-primary" onClick={load}>
          Try again
        </button>
      </main>
    );
  }
  if (!data) return <main className="state" aria-busy="true" />;

  const { profile, skills, projects, education } = data;
  return (
    <>
      <Header profile={profile} />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Education education={education} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
