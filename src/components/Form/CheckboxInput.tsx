export default function CheckboxInput({
  name,
  checked,
  onChange,
  readOnly = false,
  disabled = false,
}: {
  name: string;
  checked?: boolean;
  onChange?: (target: EventTarget & HTMLInputElement) => void;
  readOnly?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="switch">
      <label htmlFor={name}>
        <input
          type="checkbox"
          name={name}
          id={name}
          style={{ width: "fit-content" }}
          onChange={(event) => onChange && onChange(event.target)}
          checked={checked}
          readOnly={readOnly || !onChange}
          disabled={disabled}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
}
