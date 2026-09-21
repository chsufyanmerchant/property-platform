import { forwardRef, type SelectHTMLAttributes } from "react";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export interface SelectFieldOption {
  value: string;
  label: string;
}

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectFieldOption[];
  label?: string;
}

/**
 * A styled native `<select>` with a label and chevron icon, matching
 * Input's visual language. Shared by SearchBar, PropertySearchControls and
 * FilterPanel so the "dropdown" look only lives in one place.
 */
const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ options, label, className, id, name, ...props }, ref) => {
    const selectId = id ?? name;

    return (
      <div className={cn("relative w-full", className)}>
        {label && (
          <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-ink-soft">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          name={name}
          className="h-11 w-full appearance-none rounded-xl border border-line bg-surface px-3.5 pr-9 text-sm text-ink transition-colors focus-visible:border-teal"
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon
          name="chevronDown"
          className="pointer-events-none absolute right-3 bottom-3 h-4 w-4 text-ink-muted"
        />
      </div>
    );
  }
);

SelectField.displayName = "SelectField";

export default SelectField;