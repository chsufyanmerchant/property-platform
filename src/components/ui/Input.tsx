import { forwardRef, type InputHTMLAttributes } from "react";
import Icon, { type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  icon?: IconName;
  error?: string;
  wrapperClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, error, className, wrapperClassName, id, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className={cn("w-full", wrapperClassName)}>
        {label && (
          <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-ink-soft">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <Icon
              name={icon}
              className="pointer-events-none absolute left-3.5 top-1/2 h-[1.125rem] w-[1.125rem] -translate-y-1/2 text-ink-muted"
            />
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "h-11 w-full rounded-xl border border-line bg-surface text-sm text-ink placeholder:text-ink-muted",
              "transition-colors duration-150 focus-visible:border-teal",
              icon ? "pl-10 pr-3.5" : "px-3.5",
              error && "border-red-400 focus-visible:outline-red-400",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
