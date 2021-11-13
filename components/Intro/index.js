const externalLink = {
  target: '_blank',
  rel: 'noopener noreferrer',
};

export default function Intro() {
  const nhsDigital = (
    <a href="https://digital.nhs.uk" {...externalLink}>
      NHS Digital
    </a>
  );

  const komodo = (
    <a href="https://komododigital.co.uk" {...externalLink}>
      Komodo Digital
    </a>
  );

  const creator = (
    <a href="https://wearecreator.uk" {...externalLink}>
      Creator
    </a>
  );

  const Go = (
    <a href="https://github.com/charlesharries/feeler" {...externalLink}>
      Go
    </a>
  );

  const movies = (
    <a href="https://letterboxd.com/charlesharries/" {...externalLink}>
      movies
    </a>
  );

  const read = (
    <a href="https://beta.readng.co/user/charlesharries" {...externalLink}>
      read
    </a>
  );

  return (
    <>
      <p className="t-large">I'm a developer working on the web in the North East of England.</p>

      <p className="t-large">
        I write software at {nhsDigital}. Previously I worked at {komodo} in Newcastle and {creator}{' '}
        in Castle Eden. After hours I write a bit of {Go}, watch more {movies} than I ought to, and{' '}
        {read} less than I should.
      </p>
    </>
  );
}
