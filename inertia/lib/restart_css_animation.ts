/**
 * Restarts a CSS animation by toggling its class off, forcing a layout
 * reflow (reading `offsetWidth`), then toggling it back on — reapplying the
 * same class without the reflow would not restart an already-running
 * animation.
 * @param element Element carrying the animation class.
 * @param className Animation class to restart.
 */
export function restartCssAnimation(
	element: HTMLElement,
	className: string
): void {
	element.classList.remove(className);
	void element.offsetWidth;
	element.classList.add(className);
}
