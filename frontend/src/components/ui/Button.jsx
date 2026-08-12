import { cn } from "../../lib/cn";

const variantClasses = {
  primary: "bg-brand text-brand-fg hover:bg-brand-hover",
  secondary: "bg-muted text-fg hover:bg-border",
  outline: "border border-border text-fg hover:bg-muted",
  ghost: "text-fg hover:bg-muted",
  danger: "bg-danger text-white hover:opacity-90",
};

const sizeClasses = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

/**
 * Базова кнопка проекту. Усі кнопки в застосунку йдуть через неї,
 * тож стилі та поведінка (disabled, focus) — в одному місці.
 *
 * variant: primary | secondary | outline | ghost | danger
 * size: sm | md | lg
 */
export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
