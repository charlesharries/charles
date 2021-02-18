const projects = [
  {
    link: 'https://edit-gpx.netlify.app',
    date: "Jul '20",
    title: 'Edit GPX',
    description: 'Extremely simple GPX editor.',
  },
  {
    link: 'https://jernl.charlesharri.es',
    date: "Feb '20",
    title: 'Jernl',
    description: 'Daily journaling with a calendar.',
  },
  {
    link: 'https://regret.charlesharri.es',
    date: "Jan '20",
    title: 'i regret nothing',
    description:
      'Part nostalgia, part trying to figure out the simplest thing I could make with three.js',
  },
  {
    link: 'https://squarez.charlesharri.es',
    date: "Jul '19",
    title: 'Squarez',
    description: 'Learn math, angles, and funky CSS together with me.',
  },
  {
    link: 'https://feeling.charlesharri.es',
    date: "Jun '19",
    title: 'Feeling',
    description:
      'A robot on the Internet that can tell exactly how you feel based on what you tell it.',
  },
  {
    link: 'https://hangman-on-sinatra.herokuapp.com/',
    date: "Nov '16",
    title: 'Hangman',
    description: 'Hangman on the internet. Sinatra.',
  },
  {
    link: 'https://charlesharries.wordpress.com/',
    date: "Nov '15 - Aug '16",
    title: 'Hills & Letters',
    description: 'Short stories I picked up, Hokkaido hiking guides, odds & ends.',
  },
  {
    link: 'https://everythingyouhaveheard.blogspot.com/',
    date: "Aug '12 - Aug '14",
    title: 'Everything You Have Heard is True',
    description:
      'Blog covering the first 104 weeks of my life on the JET Programme in Yubetsu, Japan.',
  },
];

// Disable client-side JS.
export const config = {
  unstable_runtimeJS: false,
};

function Projects() {
  return (
    <div className="Projects">
      <h1 className="Projects__title">various bits</h1>
      <ul>
        {projects.map(project => (
          <a className="Project__link" key={project.title} href={project.link}>
            <p className="Project__title">
              <strong>{project.title}</strong>
              <span className="Project__date">{project.date}</span>
            </p>
            <p className="Project_description">{project.description}</p>
          </a>
        ))}
      </ul>
    </div>
  );
}

export default Projects;
