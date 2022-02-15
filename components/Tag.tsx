import { Tag } from "lib/types";

interface Props {
  tag: Tag;
  onChange: (tag: Tag) => void;
  isActive: boolean;
}

export default function TagFilter({ tag, onChange, isActive }: Props) {
  return (
    <div>
      <input type="checkbox" onChange={() => onChange(tag)} name={tag.slug} id={tag.slug} checked={isActive} />

      <label htmlFor={tag.slug} className="tag t-xs">{tag.title}</label>
    </div>
  )
}