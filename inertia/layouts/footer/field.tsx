export const Field = ({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) => (
	<div className="flex flex-col gap-1">
		<p className="text-lg font-medium tracking-wide text-gray-800 dark:text-white">
			{label}
		</p>
		<div className="flex flex-row items-center flex-wrap gap-x-8 gap-y-2">
			{children}
		</div>
	</div>
);
