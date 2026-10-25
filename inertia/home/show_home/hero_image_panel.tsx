export const HeroImagePanel = () => (
	<div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-900 px-6 py-8 dark:border-gray-700">
		<div
			aria-hidden="true"
			className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.25),transparent_70%)]"
		/>
		<img
			src="/images/windows-11.png"
			width={960}
			height={388}
			alt=""
			decoding="async"
			fetchPriority="high"
			className="relative h-auto w-full"
		/>
	</div>
);
