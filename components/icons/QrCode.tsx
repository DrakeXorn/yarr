import { Colors } from "@/constants";
import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

export default function QrCode(props: SvgProps) {
	return (
		<Svg width={30} height={24} fill="none" {...props}>
			<Path
				fill={Colors.special.foreground}
				d="M2.5 7.583V2.167h6.25v2.166H5v3.25H2.5Zm0 16.25v-5.416H5v3.25h3.75v2.166H2.5Zm18.75 0v-2.166H25v-3.25h2.5v5.416h-6.25ZM25 7.583v-3.25h-3.75V2.167h6.25v5.416H25Zm-3.125 11.375h1.875v1.625h-1.875v-1.625Zm0-3.25h1.875v1.625h-1.875v-1.625ZM20 17.333h1.875v1.625H20v-1.625Zm-1.875 1.625H20v1.625h-1.875v-1.625Zm-1.875-1.625h1.875v1.625H16.25v-1.625Zm3.75-3.25h1.875v1.625H20v-1.625Zm-1.875 1.625H20v1.625h-1.875v-1.625Zm-1.875-1.625h1.875v1.625H16.25v-1.625Zm7.5-8.666v6.5h-7.5v-6.5h7.5Zm-10 8.666v6.5h-7.5v-6.5h7.5Zm0-8.666v6.5h-7.5v-6.5h7.5Zm-1.875 13.541v-3.25h-3.75v3.25h3.75Zm0-8.666v-3.25h-3.75v3.25h3.75Zm10 0v-3.25h-3.75v3.25h3.75Z"
			/>
		</Svg>
	);
}
