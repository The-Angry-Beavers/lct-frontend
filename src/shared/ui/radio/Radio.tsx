import classNames from "classnames";
import type React from "react";
import { forwardRef } from "react";

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
        <div className="flex flex-col gap-2">
          {options.map((opt) => (
            <div className="bg-white/20 rounded-2xl p-4 flex pointer items-center justify-between">
              <div className="flex flex-col">
                <label htmlFor={opt.label + "label"}>{opt.label}</label>
                <a href={opt.value} className=" ">
                  {opt.value}
                </a>
              </div>
              <input
                ref={ref}
				id={opt.label + "label"}
                type="radio"
                name={name}
                value={opt.value}
                className={classNames(
                  "form-radio text-blue-500 focus:ring-2 focus:ring-blue-500 w-4 h-4",
                  error ? "border-red-500" : ""
                )}
                {...props}
              />
            </div>
          ))}
        </div>
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;
