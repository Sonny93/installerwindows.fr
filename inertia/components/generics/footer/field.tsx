import { Group, Stack, Text } from '@mantine/core';
import classes from './footer.module.css';

export const Field = ({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) => (
	<Stack gap="xs">
		<Text className={classes.footer__field_label}>{label}</Text>
		<Group className={classes.footer__field_content}>{children}</Group>
	</Stack>
);
