import { urlify } from '../../Utils';

export default function NoMarkdown() {
	return (<>
		<p
			style={{ textAlign: 'center' }}
			dangerouslySetInnerHTML={{
				__html: `Bienvenue sur ${urlify('https://installerwindows.fr/')} !`
			}}
		/>
	</>);
}