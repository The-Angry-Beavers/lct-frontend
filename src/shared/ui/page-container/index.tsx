import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils/cn";
import Background from "@shared/assets/bg.png"

interface Props extends HTMLAttributes<HTMLDivElement> {}

const PageContainer = (props: Props) => {
	const { children } = props;
	return (
		<div
			{...props}
			className={cn(
				`w-full min-h-full overflow-clip bg-no-repeat`,
				props.className,
			)}
			style={{backgroundImage: `url(${Background})`, backgroundPosition: "10% 0", backgroundSize: "140%" }}
		>
			{children}
		</div>
	);
};

export default PageContainer;
