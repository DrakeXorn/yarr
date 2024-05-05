import { atob } from "react-native-quick-base64";
import { z } from "zod";

const gamesToSlugs = {
	BourbonIsland: "bourbon-island",
};

export function verifyQrCode(
	code: string,
): { path: string; quest: number } | null {
	let qrData;
	try {
		const value = atob(code);
		qrData = z
			.object({
				game: z.string().min(1),
				quest: z.number().min(1).max(3),
				path: z
					.string()
					.min(1)
					.regex(/\/quests\/\d/),
			})
			.parse(JSON.parse(value));
	} catch (error) {
		return null;
	}

	const { game, quest, path } = qrData;

	const slug = gamesToSlugs[game as keyof typeof gamesToSlugs];

	if (!slug) {
		return null;
	}

	const checkPath = `${slug}/quests/${quest}`;

	if (path !== checkPath) {
		return null;
	}

	return { path: path.slice(slug.length), quest };
}
