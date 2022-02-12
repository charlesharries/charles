export default function Tag({ tag, onClick, isActive }) {
  return (
    <button onClick={() => onClick(tag)} className="tag t-xs" aria-selected={isActive}>
      {tag.title}
    </button>
  )
}