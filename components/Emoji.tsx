export default function Emoji({ children }): JSX.Element {
  const scaleFactor = 1.3;
  const style = {
    display: 'inline-block',
    fontSize: `${scaleFactor}em`,
    lineHeight: `calc(1/${scaleFactor})`,
    transform: 'translateY(3px)',
  };

  return <span style={style}>{children}</span>;
}
