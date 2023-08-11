import { ReactNode } from "react";

export default function FormField({
  label,
  name,
  children,
  inline = false,
  reverse = false,
  rule,
}: {
  label?: string;
  name: string;
  children: ReactNode;
  inline?: boolean;
  reverse?: boolean;
  rule?: {
    validation: boolean;
    error: string;
  };
}) {
  const className = `form-field${inline ? " field-inline" : ""}${
    reverse ? " field-reverse" : ""
  }`;
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} style={reverse ? { width: "fit-content" } : {}}>
          {label}
        </label>
      )}
      {children}
      {rule && !rule.validation && <p className="field-error">{rule.error}</p>}
    </div>
  );
}
