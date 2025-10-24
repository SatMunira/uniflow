import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import cls from "./InputField.module.scss";

type BaseProps = {
  id: string;
  label: string;
  className?: string;
  error?: string;
  textarea?: boolean;
  fieldSize?: "sm" | "md" | "lg";
};

type InputProps = BaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "size"> &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className">;

export function InputField({
  id,
  label,
  className = "",
  error,
  textarea = false,
  fieldSize = "md",
  value,
  ...rest
}: InputProps) {
  const filled =
    value !== undefined && value !== null ? String(value).length > 0 : false;

  const commonProps = {
    id,
    className: cls.input,
    placeholder: " ",
    ...(value !== undefined ? { value } : {}),
    ...rest,
  };

  return (
    <label
      className={[cls.field, cls[`field--${fieldSize}`], filled && cls.filled, className]
        .filter(Boolean)
        .join(" ")}
      htmlFor={id}
    >
      {textarea ? (
        <textarea {...(commonProps as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input {...(commonProps as InputHTMLAttributes<HTMLInputElement>)} />
      )}
      <span className={cls.label}>{label}</span>
      {error && <span className={cls.error}>{error}</span>}
    </label>
  );
}
