interface StatusPageProps {
	services: { name: string; status: string; message: string }[];
	status: boolean;
}

const badgeStyles: Record<string, string> = {
	ok: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
	warning:
		'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
	error: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
	unknown: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
};

const StatusPage = ({ services, status }: StatusPageProps) => (
	<>
		<h2 className="mb-4 text-xl font-medium text-gray-900 dark:text-gray-100">
			Statut des services
		</h2>
		<div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
			<table className="w-full border-collapse text-left text-sm text-gray-800 dark:text-gray-200">
				<caption className="border-b border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300">
					{status
						? 'Tous les services sont en ligne'
						: 'Un ou plusieurs services sont en panne'}
				</caption>
				<thead>
					<tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/30">
						<th className="px-4 py-3 font-medium">Service</th>
						<th className="px-4 py-3 font-medium">Status</th>
						<th className="px-4 py-3 font-medium">Message</th>
					</tr>
				</thead>
				<tbody>
					{services.map((service) => (
						<tr
							key={service.name}
							className="border-b border-gray-100 dark:border-gray-800"
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
