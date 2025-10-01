"use client";

import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import React, {
	type CSSProperties,
	createContext,
	type ReactNode,
	useCallback,
	useEffect,
	useState,
} from "react";
import { cn } from "@/shared/lib/utils/cn";

interface ICarouselContext<T> {
	scrollNext: () => void;
	scrollPrev: () => void;
	onItemClick: (index: number) => void;
	emblaRef: ReturnType<typeof useEmblaCarousel>[0];
	emblaApi: ReturnType<typeof useEmblaCarousel>[1];
	items: T[];
	gap: number;
	countOnScreen?: Partial<Record<TScreenSize, number>>;
	itemPercentOnScreen?: Partial<Record<TScreenSize, number>>;
	selectedIndex: number;
	canScrollNext: boolean;
	canScrollPrev: boolean;
	emblaOptions?: Parameters<typeof useEmblaCarousel>[0];
}

const CarouselContext = createContext<ICarouselContext<unknown> | null>(null);

export const useCarouselContext = <T,>() => {
	const context = React.useContext(
		CarouselContext,
	) as ICarouselContext<T> | null;

	if (!context) {
		throw new Error("useCarouselContext must be used within a Carousel");
	}

	return context;
};

const SCREEN_SIZES = ["mobile", "md", "lg", "xl"] as const;

type TScreenSize = (typeof SCREEN_SIZES)[number];

interface CarouselProps<T> {
	children: ReactNode;
	countOnScreen?: Partial<Record<TScreenSize, number>>;
	itemPercentOnScreen?: Partial<Record<TScreenSize, number>>;
	items: T[];
	gap?: number;
	emblaOptions?: Parameters<typeof useEmblaCarousel>[0];
}

const Carousel = <T,>(props: CarouselProps<T>) => {
	const {
		children,
		countOnScreen,
		emblaOptions,
		itemPercentOnScreen,
		gap = 20,
	} = props;
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [canScrollNext, setCanScrollNext] = useState<boolean>(true);
	const [canScrollPrev, setCanScrollPrev] = useState<boolean>(true);

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			align: "center",
			containScroll: "keepSnaps",
			...emblaOptions,
		},
		[WheelGesturesPlugin()],
	);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
		setCanScrollPrev(emblaApi.canScrollPrev());
		setCanScrollNext(emblaApi.canScrollNext());
	}, [emblaApi, setSelectedIndex]);

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	const onItemClick = useCallback(
		(index: number) => {
			if (emblaApi) emblaApi.scrollTo(index);
		},
		[emblaApi],
	);

	useEffect(() => {
		if (!emblaApi) return;
		onSelect();

		emblaApi.on("select", onSelect).on("reInit", onSelect);
	}, [emblaApi, onSelect]);

	const contextValue: ICarouselContext<T> = {
		itemPercentOnScreen: itemPercentOnScreen,
		countOnScreen: countOnScreen,
		scrollNext,
		scrollPrev,
		onItemClick,
		emblaRef,
		emblaApi,
		items: props.items,
		selectedIndex,
		canScrollNext,
		canScrollPrev,
		gap,
		emblaOptions,
	};

	return (
		<CarouselContext.Provider value={contextValue}>
			{children}
		</CarouselContext.Provider>
	);
};

interface ItemsProps<T> {
	children: (context: ICarouselContext<T>) => React.ReactNode;
}

const Items = <T,>(props: ItemsProps<T>) => {
	const { children } = props;
	const context = useCarouselContext<T>();
	const { countOnScreen, emblaRef, itemPercentOnScreen, gap, emblaOptions } =
		context;
	const gapRem = gap / 16 + "rem";
	const mobileCountOnScreen = countOnScreen?.mobile ?? 1;
	const mdCountOnScreen = countOnScreen?.md ?? 2;
	const lgCountOnScreen = countOnScreen?.lg ?? 2;
	const xlCountOnScreen = countOnScreen?.lg ?? 2;
	const mobilePercent = `${itemPercentOnScreen?.mobile ?? 93}%`;
	const mdPercent = `${itemPercentOnScreen?.md ?? 110}%`;
	const lgPercent = `${itemPercentOnScreen?.lg ?? 95}%`;
	const xlPercent = `${itemPercentOnScreen?.xl ?? 95}%`;
	return (
		<div
			style={
				{
					"--mobile-count": mobileCountOnScreen,
					"--md-count": mdCountOnScreen,
					"--lg-count": lgCountOnScreen,
					"--xl-count": xlCountOnScreen,
					"--mobile-percent": mobilePercent,
					"--md-percent": mdPercent,
					"--lg-percent": lgPercent,
					"--xl-percent": xlPercent,
					"--carousel-gap": gapRem,
					"--mobile-gap":
						mobileCountOnScreen === 1 && mobilePercent === "100%"
							? "0rem"
							: gapRem,
					"--md-gap":
						mdCountOnScreen === 1 && mdPercent === "100%" ? "0rem" : gapRem,
					"--lg-gap":
						lgCountOnScreen === 1 && lgPercent === "100%" ? "0rem" : gapRem,
					"--xl-gap":
						xlCountOnScreen === 1 && xlPercent === "100%" ? "0rem" : gapRem,
				} as CSSProperties
			}
			ref={emblaRef}
			className="overflow-hidden flex-1 flex flex-col"
		>
			<div
				className={cn(
					"grid flex-1 gap-[var(--carousel-gap)] grid-flow-col \
    auto-cols-[calc((var(--mobile-percent)-var(--mobile-gap))/var(--mobile-count))] \
    md:auto-cols-[calc((var(--md-percent)-var(--md-gap))/var(--md-count))] \
    lg:auto-cols-[calc((var(--lg-percent)-var(--lg-gap))/var(--lg-count))] \
    xl:auto-cols-[calc((var(--xl-percent)-var(--xl-gap))/var(--xl-count))]",
					emblaOptions?.loop
						? "last:[&>*]:mr-[var(--mobile-gap)] \
    md:last:[&>*]:mr-[var(--md-gap)] \
    lg:last:[&>*]:mr-[var(--lg-gap)] \
    xl:last:[&>*]:mr-[var(--xl-gap)]"
						: "",
				)}
			>
				{children({ ...context })}
			</div>
		</div>
	);
};

Carousel.Items = Items;

export default Carousel;
