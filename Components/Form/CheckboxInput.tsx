export default function CheckboxInput({
    name,
    checked,
    onChange,
}: {
    name: string;
    checked?: boolean;
    onChange?: (target: EventTarget & HTMLInputElement) => void;
}) {
    return (
        <div className="switch">
            <label htmlFor={name}>
                <input
                    type="checkbox"
                    name={name}
                    id={name}
                    style={{ width: 'fit-content' }}
                    onChange={(event) => onChange && onChange(event.target)}
                    checked={checked}
                />
                <span className="slider"></span>
            </label>
        </div>
    );
}
