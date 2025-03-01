import { ActionIcon, Avatar, Group, Text } from '@mantine/core';
import { TbLogin, TbLogout } from 'react-icons/tb';
import { TextIcon } from '~/components/generics/footer/text_icon';
import useUser from '~/hooks/use_user';
import classes from './user_card.module.css';

export function UserCard() {
	const auth = useUser();

	if (auth.isAuthenticated) {
		return <Authenticated />;
	}

	return <NotAuthenticated />;
}

const NotAuthenticated = () => (
	<TextIcon icon={TbLogin} href="/auth/login" external>
		Connexion
	</TextIcon>
);

function Authenticated() {
	const { user } = useUser();
	return (
		<Group className={classes.card} gap="xs">
			<Avatar size="sm" src={user!.avatarUrl} radius={30} />
			<Text className={classes.username}>{user!.fullname}</Text>
			<ActionIcon
				component="a"
				href="/auth/logout"
				variant="filled"
				color="red"
			>
				<TbLogout size={18} />
			</ActionIcon>
		</Group>
	);
}
