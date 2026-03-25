import { TextIcon } from '~/components/generics/footer/text_icon';
import { useAuth } from '~/hooks/use_auth';

export function UserCard() {
	const auth = useAuth();

	if (auth.isAuthenticated) {
		return <Authenticated />;
	}

	return <NotAuthenticated />;
}

const NotAuthenticated = () => (
	<TextIcon icon="i-tabler-login" href="/auth/login" external>
		Connexion
	</TextIcon>
);

function Authenticated() {
	const { user } = useAuth();
	return (
		<div className="flex items-center gap-2">
			<img
				src={user!.avatarUrl}
				alt=""
				className="h-8 w-8 shrink-0 rounded-full object-cover"
			/>
			<span className="font-normal text-gray-800 dark:text-white">
				{user!.fullname}
			</span>
			<a
				href="/auth/logout"
				className="inline-flex shrink-0 items-center justify-center rounded text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
				aria-label="Déconnexion"
			>
				<span className="i-tabler-logout h-4 w-4 shrink-0" aria-hidden />
			</a>
		</div>
	);
}
