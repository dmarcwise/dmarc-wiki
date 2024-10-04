const logos = import.meta.glob('$lib/logos/*.{png,jpg}', {
	eager: true,
	query: {
		enhanced: true
	}
});

export function getLogo(fileName: string) {
	return logos[`/src/lib/logos/${fileName}`].default;
}
