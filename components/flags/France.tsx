import * as React from "react";
import Svg, { ClipPath, Defs, Ellipse, G, Mask, Path } from "react-native-svg";

export default function France() {
	return (
		<Svg width={57} height={50} fill="none">
			<G clipPath="url(#a)">
				<Mask
					id="b"
					width={57}
					height={50}
					x={0}
					y={0}
					maskUnits="userSpaceOnUse"
				>
					<Ellipse cx={28.045} cy={25} fill="#D9D9D9" rx={28.045} ry={25} />
				</Mask>
				<G mask="url(#b)">
					<Path fill="#fff" d="M0 0h56.09v50H0V0Z" />
					<Path fill="#002654" d="M0 0h18.694v50H0V0Z" />
					<Path fill="#CE1126" d="M37.396 0h18.693v50H37.396V0Z" />
				</G>
			</G>
			<Defs>
				<ClipPath id="a">
					<Path fill="#fff" d="M0 0h56.089v50H0z" />
				</ClipPath>
			</Defs>
		</Svg>
	);
}
