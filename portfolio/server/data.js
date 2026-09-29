// Everything shown on the portfolio lives here. Edit this file to update the site.

export const profile = {
  name: 'Rudra Nimish Gandhi',
  firstName: 'Rudra',
  middleName: 'Nimish',
  lastName: 'Gandhi',
  initials: 'RG',
  location: 'Surat, India',
  status: 'Available for opportunities',
  tagline:
    'Full-stack web developer creating purposeful, responsive digital experiences—from polished interfaces to reliable backend systems.',
  about: [
    'I recently completed my Bachelor of Computer Technology (Web Development) and I build websites and web apps from the interface down to the server.',
    'My projects so far include a travel website and a cleaning-services website with a companion Android app. I am looking for my first role where I can contribute, keep learning, and take on bigger problems.',
  ],
  email: 'gandhirudra219@gmail.com',
  phone: '+91 7859915441',
  address: 'Adajan, Surat, Gujarat, India',
  languages: ['English', 'Hindi', 'Gujarati'],
  cv: '/Rudra_Nimish_Gandhi_CV.pdf',
};

export const skills = [
  {
    group: 'Web development',
    items: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'Laravel', 'PHP'],
  },
  { group: 'Data and mobile', items: ['MongoDB', 'Android'] },
  {
    group: 'Everyday strengths',
    items: ['Web design', 'Documentation', 'Data entry', 'Flexibility'],
  },
];

export const projects = [
  {
    id: 'tours-travel',
    title: 'Tours and Travel Website',
    summary:
      'A responsive travel website where customers browse trips and travel agents manage their offerings.',
    users: 'Travel agents and customers',
    stack: ['HTML', 'CSS', 'Laravel', 'PHP'],
    highlights: ['Responsive on phone and desktop', 'Simple to use for agents and customers'],
    links: [], // e.g. [{ label: 'Live site', url: 'https://…' }, { label: 'Code', url: 'https://github.com/…' }]
  },
  {
    id: 'qudioo',
    title: 'Qudioo Cleaning Service',
    summary:
      'A cleaning-services website with a companion Android app, built for office and home customers.',
    users: 'Office and home customers',
    stack: ['Laravel', 'PHP', 'MongoDB', 'Android'],
    highlights: ['Web and mobile in one product', 'Simple to use for office and home bookings'],
    links: [],
  },
];

export const education = [
  {
    title: 'Bachelor of Computer Technology (Web Development)',
    place: 'UCCC & SPBCBA & SDHG College of BCA & IT, Veer Narmad South Gujarat University',
    year: '2025',
    note: 'CGPA 7.26 / 10',
  },
  { title: 'Higher Secondary (HSC)', place: 'Smt. L.N.B. Daliya High School, Surat', year: '2022' },
  { title: 'Secondary (SSC)', place: 'Presidency School, Surat', year: '2020' },
];
