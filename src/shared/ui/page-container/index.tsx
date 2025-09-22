import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils/cn";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const PageContainer = (props: Props) => {
	const { children } = props;
	return (
		<div
			{...props}
			className={cn(
				"w-full min-h-full py-[2.5rem] px-4 md:px-[2rem] overflow-clip",
				props.className,
			)}
		>
			{children}
		</div>
	);
};

export default PageContainer;
