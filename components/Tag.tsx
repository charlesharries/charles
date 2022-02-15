import { Tag } from "lib/types";

interface Props {
  name: string;
  label: string
  onChange: (name: string) => void;
  isActive: boolean;
}

export default function TagFilter({ name, label, onChange, isActive }: Props) {
  return (
    <div>
      <input hidden type="checkbox" onChange={() => onChange(name)} name={name} id={name} checked={isActive} />

      <label htmlFor={name} className="tag t-xs">{label}</label>
    </div>
  )
}