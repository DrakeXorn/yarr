import { atob } from "react-native-quick-base64";
import { z } from "zod";

const gamesToSlugs = {
	BourbonIsland: "bourbon-island",
};

export function verifyQrCode(
	code: string,
): { path: string; quest: number } | null {
	const value = atob(code);

	try {
		const { game, quest, path } = z
			.object({
				game: z.string().min(1),
				quest: z.number().min(1).max(3),
				path: z
					.string()
					.min(1)
					.regex(/\/quests\/\d/),
			})
			.parse(JSON.parse(value));

		const slug = gamesToSlugs[game as keyof typeof gamesToSlugs];

		if (!slug) {
			throw new Error("Invalid game");
		}

		const checkPath = `${slug}/quests/${quest}`;

		if (path !== checkPath) {
			throw new Error("Invalid path");
		}

		return { path: path.slice(slug.length), quest };
	} catch (error) {
		console.error("Invalid QR code", error);
		return null;
	}
}
