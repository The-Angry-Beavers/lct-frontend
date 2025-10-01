import type { SVGProps } from "react";

const STAR_VARIANTS = {
	purple: {
		fill: "#DD40DB",
		stroke: "#8A2B88",
	},
	blue: {
		fill: "#6188E4",
		stroke: "#6561e4",
	},
} as const;

const Star = (
	props: SVGProps<SVGSVGElement> & {
		variant?: "purple" | "blue";
	},
) => {
	const { variant = "purple", ...rest } = props;
	const colorVariant = STAR_VARIANTS[variant];
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 18 17"
			fill="none"
			{...rest}
		>
			<g filter="url(#a)">
				<path
					fill={colorVariant.fill}
					d="M9.163 1.037a.354.354 0 0 1 .674 0l1.492 4.592a.354.354 0 0 0 .337.244h4.828c.343 0 .486.44.208.641l-3.906 2.838a.354.354 0 0 0-.128.396l1.492 4.592a.354.354 0 0 1-.546.396l-3.906-2.838a.354.354 0 0 0-.416 0l-3.906 2.838a.354.354 0 0 1-.545-.396l1.492-4.592a.354.354 0 0 0-.129-.396L2.298 6.514a.354.354 0 0 1 .208-.64h4.828c.154 0 .29-.1.337-.245l1.492-4.592Z"
				/>
				<path
					stroke={colorVariant.stroke}
					strokeWidth={0.708}
					d="M8.826.927c.212-.652 1.136-.652 1.348 0l1.492 4.593h4.828c.686 0 .971.877.416 1.28L13.004 9.64l1.492 4.591c.212.653-.535 1.196-1.09.793L9.5 12.184l-3.906 2.838c-.555.403-1.302-.14-1.09-.793L5.996 9.64 2.09 6.8c-.555-.404-.27-1.281.416-1.281h4.828L8.826.927Z"
				/>
			</g>
			<defs>
				<filter
					id="a"
					width={17.534}
					height={16.142}
					x={0.025}
					y={0.083}
					colorInterpolationFilters="sRGB"
					filterUnits="userSpaceOnUse"
				>
					<feFlood floodOpacity={0} result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						result="hardAlpha"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					/>
					<feOffset dx={-1.417} dy={0.708} />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
					<feBlend
						in2="BackgroundImageFix"
						result="effect1_dropShadow_244_2418"
					/>
					<feBlend
						in="SourceGraphic"
						in2="effect1_dropShadow_244_2418"
						result="shape"
					/>
				</filter>
			</defs>
		</svg>
	);
};
export default Star;
