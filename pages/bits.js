const bits = [
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
    link: 'https://regret.charlesharri.es',
    date: "Jan '20",
    title: 'i regret nothing',
    description:
      'Part nostalgia, part trying to figure out the simplest thing I could make with three.js',
  },
];

function Bits() {
  return (
    <div className="Bits">
      <h1 className="Bits__title">various bits</h1>
      <ul>
        {bits.map(bit => (
          <a key={bit.title} href={bit.link}>
            <p className="Bit__title">
              <strong>{bit.title}</strong>
              <span className="Bit__date">{bit.date}</span>
            </p>
            <p className="Bit_description">{bit.description}</p>
          </a>
        ))}
      </ul>
    </div>
  );
}

export default Bits;
