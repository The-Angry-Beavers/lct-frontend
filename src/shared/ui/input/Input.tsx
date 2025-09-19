import classNames from "classnames";
import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    const inputId = props.id || props.name;
    return (
      <div className={classNames("flex flex-col mb-4", className)}>
        {label && (
          <label className="mb-1 font-medium text-gray-700" htmlFor={inputId}>
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={classNames(
            "border rounded-md py-2 px-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
            "hover:shadow-md hover:border-blue-400",
            error ? "border-red-500" : "border-gray-300"
          )}
          {...props}
        />
        <span
          className={classNames(
            "text-red-500 text-sm mt-1 transition-all duration-300 transform h-5 block",
            error ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          )}
        >
          {error || "\u00A0"}
        </span>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
