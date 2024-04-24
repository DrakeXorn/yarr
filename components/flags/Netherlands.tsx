import * as React from "react";
import Svg, { ClipPath, Defs, Ellipse, G, Mask, Path } from "react-native-svg";

export default function Netherlands() {
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
					<Ellipse cx={28.108} cy={25} fill="#D9D9D9" rx={27.392} ry={25} />
				</Mask>
				<G mask="url(#b)">
					<Path fill="#21468B" d="M.715 0H55.5v50H.715V0Z" />
					<Path fill="#fff" d="M.715 0H55.5v33.333H.715V0Z" />
					<Path fill="#AE1C28" d="M.715 0H55.5v16.667H.715V0Z" />
				</G>
			</G>
			<Defs>
				<ClipPath id="a">
					<Path fill="#fff" d="M.715 0H55.5v50H.715z" />
				</ClipPath>
			</Defs>
		</Svg>
	);
}
