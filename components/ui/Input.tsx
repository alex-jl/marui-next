import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  icon?: React.ReactNode;
}

const baseClasses =
  "w-full bg-card border border-steel-light rounded px-3 py-2 text-sm text-ink placeholder:text-steel-dark outline-none transition-colors focus:border-granite focus:ring-2 focus:ring-granite/20 disabled:opacity-50";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, icon, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-dark">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={`${baseClasses} ${icon ? "pl-9" : ""} ${error ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""} ${className}`}
            {...props}
          />
        </div>
        {hint && !error && <p className="text-xs text-steel">{hint}</p>}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={3}
          className={`${baseClasses} resize-none ${error ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""} ${className}`}
          {...props}
        />
        {hint && !error && <p className="text-xs text-steel">{hint}</p>}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
