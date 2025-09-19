import classNames from "classnames";
import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  loading?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, loading, ...props }, ref) => {
    return (
      <div className={classNames("flex flex-col mb-4", className)}>
        {label && (
          <label className="mb-1 font-medium text-gray-700">{label}</label>
        )}
        <select
          ref={ref}
          className={classNames(
            "border rounded-md px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white",
            error ? "border-red-500" : "border-gray-300"
          )}
          {...props}
        >
          {loading ? (
            <option>Загрузка...</option>
          ) : (
            options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))
          )}
        </select>
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
