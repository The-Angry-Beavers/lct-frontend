import classNames from "classnames";
import type React from "react";
import { forwardRef } from "react";

interface CheckboxOption {
	value: string;
	link: string;
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

const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
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
					{options.map((opt) => {
						const checked = values.includes(opt.value);

						return (
							<div
								key={opt.value}
								onClick={(e) => {
									e.stopPropagation();
									handleChange(opt.value);
								}}
								className="bg-white/20 rounded-2xl p-4 flex pointer items-center justify-between cursor-pointer"
							>
								<div className="flex flex-col">
									<label htmlFor={`${name}-${opt.value}`}>{opt.label}</label>
									<a
										href={opt.link}
										target="_blank"
										className="underline text-xs flex items-center gap-1 mt-2 w-fit"
									>
										<svg
											width="12"
											height="13"
											viewBox="0 0 12 13"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<rect
												x="0.428571"
												y="0.928571"
												width="11.1429"
												height="11.1429"
												rx="5.57143"
												stroke="white"
												strokeWidth="0.857143"
											/>
											<circle cx="6" cy="3.875" r="0.75" fill="white" />
											<rect
												x="5.25"
												y="5.375"
												width="1.5"
												height="4.5"
												rx="0.75"
												fill="white"
											/>
										</svg>
										Подробнее о продукте
									</a>
								</div>

								{/* кастомный чекбокс */}
								<div
									className={classNames(
										"w-5 h-5 rounded border flex items-center justify-center transition-colors",
										checked ? "bg-white border-white" : "border-white/50",
										error ? "border-red-500" : "",
									)}
								>
									{checked && (
										<svg
											className="w-4 h-4 text-black"
											fill="none"
											stroke="black"
											strokeWidth="2"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M5 13l4 4L19 7"
											/>
										</svg>
									)}
								</div>
							</div>
						);
					})}
				</div>
				{error && <span className="text-red-500 text-sm mt-1">{error}</span>}
			</div>
		);
	},
);

CheckboxGroup.displayName = "CheckboxGroup";

export default CheckboxGroup;
