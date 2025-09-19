import { forwardRef } from "react";
import classNames from "classnames";

interface RangeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: number;
  error?: string;
  suffix?: string;
  prefix?: string;
}

export const RangeInput = forwardRef<HTMLInputElement, RangeInputProps>(
  ({ label, value, error, suffix, prefix, className, ...props }, ref) => {
    return (
      <div className={classNames("flex flex-col mb-4", className)}>
        {label && (
          <label className="mb-2 font-medium text-gray-700">
            {label}: {prefix} {value} {suffix}
          </label>
        )}
        <input
          type="range"
          ref={ref}
          value={value}
          {...props}
          className={classNames(
            "w-full h-2 bg-gray-200 rounded-full accent-blue-500 appearance-none cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
            "hover:bg-gray-300",
          )}
        />
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    );
  }
);

RangeInput.displayName = "RangeInput";
