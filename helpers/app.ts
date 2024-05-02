import { atob } from "react-native-quick-base64";
import { z } from "zod";

const gamesToSlugs = {
	BourbonIsland: "bourbon-island",
};

export function verifyQrCode(code: string): string | null {
	const value = atob(code);

	try {
		const { game, quest, path } = z
			.object({
				game: z.string().min(1),
				quest: z.number().min(1).max(3),
				path: z.string().min(1).includes("/").includes("quests"),
			})
			.parse(JSON.parse(value));

		const slug = gamesToSlugs[game as keyof typeof gamesToSlugs];

		if (!slug) {
			throw new Error("Invalid game");
		}

		if (!path.includes(slug) || !path.includes(`${quest}`)) {
			throw new Error("Invalid path");
		}

		return path.slice(slug.length);
	} catch (error) {
		console.error("Invalid QR code", error);
		return null;
	}
}
