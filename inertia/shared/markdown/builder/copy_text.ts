export async function copyText(text: string): Promise<void> {
	if (!globalThis.navigator.clipboard?.writeText)
		throw new Error('clipboard_unavailable');
	await globalThis.navigator.clipboard.writeText(text);
}
