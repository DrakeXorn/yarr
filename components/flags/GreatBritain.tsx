import Svg, { ClipPath, Defs, Ellipse, G, Mask, Path } from "react-native-svg";

export default function GreatBritain() {
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
					<Ellipse cx={28.902} cy={25} fill="#D9D9D9" rx={28.045} ry={25} />
				</Mask>
				<G mask="url(#b)">
					<Path fill="#012169" d="M.857 0h56.09v50H.857V0Z" />
					<Path
						fill="#fff"
						d="m7.43 0 21.385 18.854L50.11 0h6.836v6.458L35.913 25.104l21.034 18.542V50h-7.011L28.902 31.354 7.956 50H.857v-6.25l20.946-18.542L.857 6.667V0H7.43Z"
					/>
					<Path
						fill="#C8102E"
						d="m38.017 29.27 18.93 16.563V50l-23.75-20.73h4.82ZM21.89 31.355 22.417 35 5.59 50H.857l21.034-18.646ZM56.947 0v.313L35.125 19.895l.175-4.584L52.565 0h4.382ZM.857 0l20.946 18.333h-5.258L.857 4.375V0Z"
					/>
					<Path
						fill="#fff"
						d="M21.979 0v50H36V0H21.979ZM.857 16.667v16.666h56.09V16.667H.857Z"
					/>
					<Path
						fill="#C8102E"
						d="M.857 20.104v10h56.09v-10H.857ZM24.783 0v50h8.413V0h-8.413Z"
					/>
				</G>
			</G>
			<Defs>
				<ClipPath id="a">
					<Path fill="#fff" d="M.857 0h56.09v50H.856z" />
				</ClipPath>
			</Defs>
		</Svg>
	);
}
