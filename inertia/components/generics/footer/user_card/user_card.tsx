import type { Data } from '@generated/data';
import { Link } from '@adonisjs/inertia/react';

import { urlFor } from '~/lib/url_for';
import { useAuth } from '~/hooks/use_auth';
import { TextIcon } from '~/components/generics/footer/text_icon';

export function UserCard() {
	const auth = useAuth();

	if (auth.isAuthenticated && auth.user) {
		return <Authenticated user={auth.user} />;
	}

	return <NotAuthenticated />;
}

const NotAuthenticated = () => (
	<TextIcon icon="i-tabler-login" href={urlFor('auth.login')} external>
		Connexion
	</TextIcon>
);

interface AuthenticatedProps {
	user: Data.User;
}

function Authenticated({ user }: Readonly<AuthenticatedProps>) {
	return (
		<div className="flex items-center gap-2">
			<img
				src={user.avatarUrl}
				alt=""
				className="h-8 w-8 shrink-0 rounded-full object-cover"
			/>
			<span className="font-normal text-gray-800 dark:text-white">
				{user.fullname}
			</span>
			<Link
				route="auth.logout"
				method="post"
				as="button"
				className="inline-flex shrink-0 items-center justify-center rounded text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
				aria-label="Déconnexion"
			>
				<span className="i-tabler-logout h-4 w-4 shrink-0" aria-hidden />
			</Link>
		</div>
	);
}
