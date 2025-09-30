import classNames from "classnames";
import type React from "react";
import { forwardRef } from "react";

interface CheckboxOption {
	value: string;
	label: string;
}

interface CheckboxGroupProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
	label?: string;
	name: string;
	options: CheckboxOption[];
	values: string[];
	onChange: (values: string[]) => void;
	error?: string;
}

const CheckboxGroup = forwardRef<HTMLInputElement, CheckboxGroupProps>(
	(
		{ label, name, options, values, onChange, error, className, ...props },
		_ref,
	) => {
		const handleChange = (val: string) => {
			if (values.includes(val)) {
				onChange(values.filter((v) => v !== val));
			} else {
				onChange([...values, val]);
			}
		};

		return (
			<div className={classNames("flex flex-col mb-4", className)}>
				{label && <span className="mb-2 font-medium">{label}</span>}
				<div className="flex flex-col gap-2">
					{options.map((opt) => (
						<div
							key={opt.value}
							className="bg-white/20 rounded-2xl p-4 flex pointer items-center justify-between"
						>
							<div className="flex flex-col">
								<label htmlFor={`${name}-${opt.value}`}>{opt.label}</label>
								<a href={opt.value}>{opt.value}</a>
							</div>
							<input
								id={`${name}-${opt.value}`}
								type="checkbox"
								name={name}
								value={opt.value}
								checked={values.includes(opt.value)}
								onChange={() => handleChange(opt.value)}
								className={classNames(
									"form-checkbox text-blue-500 focus:ring-2 focus:ring-blue-500 w-4 h-4",
									error ? "border-red-500" : "",
								)}
								{...props}
							/>
						</div>
					))}
				</div>
				{error && <span className="text-red-500 text-sm mt-1">{error}</span>}
			</div>
		);
	},
);

CheckboxGroup.displayName = "CheckboxGroup";

export default CheckboxGroup;
