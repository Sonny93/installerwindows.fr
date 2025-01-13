import { Badge, Table, Title } from '@mantine/core';

interface StatusPageProps {
	services: { name: string; status: string; message: string }[];
	status: boolean;
}

const StatusPage = ({ services, status }: StatusPageProps) => (
	<>
		<Title mb="md" order={2}>
			Statut des services
		</Title>
		<Table>
			<Table.Caption>
				{status
					? 'Toutes les services sont en ligne'
					: 'Un ou plusieurs services sont en panne'}
			</Table.Caption>
			<Table.Thead>
				<Table.Tr>
					<Table.Th>Service</Table.Th>
					<Table.Th>Status</Table.Th>
					<Table.Th>Message</Table.Th>
				</Table.Tr>
			</Table.Thead>
			<Table.Tbody>
				{services.map((service) => (
					<Table.Tr key={service.name}>
						<Table.Td>{service.name}</Table.Td>
						<Table.Td>
							<Badge color={service.status === 'ok' ? 'green' : 'red'}>
								{service.status}
							</Badge>
						</Table.Td>
						<Table.Td>{service.message}</Table.Td>
					</Table.Tr>
				))}
			</Table.Tbody>
		</Table>
	</>
);

export default StatusPage;
