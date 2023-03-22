export default function Submit({ label, disabled = false }: { label: string; disabled?: boolean }) {
    return (
        <button type="submit" disabled={disabled}>
            {label}
        </button>
    );
}
