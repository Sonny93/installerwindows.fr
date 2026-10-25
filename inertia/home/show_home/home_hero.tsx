import { HeroImagePanel } from '~/home/show_home/hero_image_panel';

export const HomeHero = () => (
	<div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
		<div className="flex flex-col gap-5">
			<h1 className="text-4xl leading-tight font-medium tracking-tight text-balance text-gray-900 md:text-5xl dark:text-gray-100">
				Installer Windows&nbsp;11 proprement
			</h1>
			<p className="max-w-[60ch] text-lg text-pretty text-gray-600 md:text-xl dark:text-gray-400">
				Des guides complets pour (ré)installer Windows&nbsp;11 et appliquer des
				optimisations saines à votre machine, quel que soit votre niveau en
				informatique.
			</p>
		</div>
		<div className="order-first mx-auto w-full max-w-xs md:order-none md:max-w-none">
			<HeroImagePanel />
		</div>
	</div>
);
