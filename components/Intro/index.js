const externalLink = {
  target: '_blank',
  rel: 'noopener noreferrer',
};

export default function Intro() {
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

  return (
    <>
      <p className="t-large">
        I'm a developer working on the web in the North East of England.
      </p>

      <p className="t-large">
        I write software with PHP and JavaScript for {komodo}. Previously I
        worked at {creator} in Castle Eden. After hours I write a bit of Go,
        watch more movies than I ought to, and read less than I should.
      </p>
    </>
  );
}
