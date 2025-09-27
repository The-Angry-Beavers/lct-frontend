import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils/cn";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const PageContainer = (props: Props) => {
	const { children } = props;
	return (
		<div
			{...props}
			className={cn(
				`w-full flex relative flex-col min-h-full overflow-clip`,
				props.className,
			)}
		>
			{children}
		</div>
	);
};

export default PageContainer;
