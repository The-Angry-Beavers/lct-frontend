import classNames from "classnames";
import React, { forwardRef } from "react";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  options: RadioOption[];
  error?: string;
}

const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ label, name, options, error, className, ...props }, ref) => {
    return (
      <div className={classNames("flex flex-col mb-4", className)}>
        {label && <span className="mb-1 font-medium text-gray-700">{label}</span>}
        <div className="flex flex-wrap gap-2">
          {options.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input
                ref={ref}
                type="radio"
                name={name}
                value={opt.value}
                className={classNames(
                  "form-radio text-blue-500 focus:ring-2 focus:ring-blue-500 w-4 h-4",
                  error ? "border-red-500" : ""
                )}
                {...props}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;
