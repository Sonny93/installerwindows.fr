export default function TextInput({
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    readOnly = false,
    disabled = false,
}: {
    name: string;
    placeholder?: string;
    value?: string;
    onChange?: (target: EventTarget & HTMLInputElement) => void;
    onBlur?: (target: EventTarget & HTMLInputElement) => void;
    readOnly?: boolean;
    disabled?: boolean;
}) {
    return (
        <input
            type="text"
            placeholder={placeholder || name}
            name={name}
            id={name}
            onChange={(event) => onChange && onChange(event.target)}
            onBlur={(event) => onBlur && onBlur(event.target)}
            value={value}
            readOnly={readOnly || !onChange}
            disabled={disabled}
        />
    );
}
