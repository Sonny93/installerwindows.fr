interface StatusPageProps {
	services: { name: string; status: string; message: string }[];
	status: boolean;
}

const badgeStyles: Record<string, string> = {
	ok: 'bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-400',
	warning: 'bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400',
	error: 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-400',
	unknown: 'bg-gray-100 text-gray-800 dark:bg-white/5 dark:text-slate-400',
};

const StatusPage = ({ services, status }: StatusPageProps) => (
	<>
		<h2 className="mb-4 text-xl text-gray-900 dark:text-slate-100">
			Statut des services
		</h2>
		<div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-white/5">
			<table className="w-full border-collapse text-left text-sm text-gray-800 dark:text-slate-300">
				<caption className="border-b border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/2 px-4 py-3 text-gray-600 dark:text-slate-400">
					{status
						? 'Tous les services sont en ligne'
						: 'Un ou plusieurs services sont en panne'}
				</caption>
				<thead>
					<tr className="border-b border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/2">
						<th className="px-4 py-3 font-medium text-gray-700 dark:text-slate-300">Service</th>
						<th className="px-4 py-3 font-medium text-gray-700 dark:text-slate-300">Status</th>
						<th className="px-4 py-3 font-medium text-gray-700 dark:text-slate-300">Message</th>
					</tr>
				</thead>
				<tbody>
					{services.map((service) => (
						<tr
							key={service.name}
							className="border-b border-gray-100 dark:border-white/4 last:border-0"
						>
							<td className="px-4 py-3">{service.name}</td>
							<td className="px-4 py-3">
								<span
									className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-normal ${getBadgeClass(service.status)}`}
								>
									{service.status}
								</span>
							</td>
							<td className="px-4 py-3">{service.message}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	</>
);

const getBadgeClass = (status: string) => {
	const key = status.toLowerCase() as keyof typeof badgeStyles;
	return badgeStyles[key] ?? badgeStyles.unknown;
};

export default StatusPage;
