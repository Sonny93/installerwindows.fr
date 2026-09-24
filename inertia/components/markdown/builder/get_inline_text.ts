export function getInlineText(element: HTMLElement): string {
	return (element.textContent ?? '').trim();
}
