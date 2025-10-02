"use client";

import React, { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router";

declare global {
	interface Window {
		_tmr?: any[];
	}
}

const MetrikaInit = () => {
	const location = useLocation();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (typeof window !== "undefined") {
			// eslint-disable-next-line
			// @ts-expect-error: ym is not defined
			ym(98702201, "hit", window.location.href);
		}
	}, [location.pathname, searchParams.toString()]);
	return <></>;
};

export default MetrikaInit;
