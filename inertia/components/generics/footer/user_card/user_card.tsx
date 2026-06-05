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
				className="h-7 w-7 shrink-0 rounded-full object-cover ring-1 ring-white/10"
			/>
			<span className="text-sm font-normal text-gray-700 dark:text-slate-300">
				{user!.fullname}
			</span>
			<a
				href="/auth/logout"
				className="inline-flex shrink-0 items-center justify-center rounded-lg p-1 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
				aria-label="Déconnexion"
			>
				<span className="i-tabler-logout h-4 w-4 shrink-0" aria-hidden />
			</a>
		</div>
	);
}
