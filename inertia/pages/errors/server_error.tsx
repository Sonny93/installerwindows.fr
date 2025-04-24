import { Button, Container, Group, Text, Title } from '@mantine/core';
import { Error500 } from '~/components/errors/error_500';
import { HelpButton } from '~/components/generics/help_button';
import classes from '~/css/errors.module.css';

const DEFAULT_ERROR_MESSAGE =
	'Une erreur côté serveur est survenue. Si le problème persiste, veuillez nous contacter.';

interface ServerErrorProps {
	message?: string;
	service?: string;
	link?: string;
}

const ServerError = ({
	message = DEFAULT_ERROR_MESSAGE,
	service,
	link,
}: ServerErrorProps) => (
	<Container className={classes.root}>
		<div className={classes.inner}>
			<Error500 className={classes.image} />
			<div className={classes.content}>
				<Title className={classes.title}>Erreur serveur</Title>
				<Text c="dimmed" size="lg" ta="center" className={classes.description}>
					{message} <br />
					{link && (
						<>
							En attendant que le problème soit résolu, vous pouvez consulter le
							lien vers la ressource <br />
							<Button
								component="a"
								href={link}
								variant="gradient"
								mt="md"
								target="_blank"
								rel="noreferrer"
							>
								Lien vers la ressource {service}
							</Button>
						</>
					)}
				</Text>
				<Text c="dimmed" size="lg" ta="center" className={classes.description}>
					Rafraîchir la page pour essayer de résoudre le problème.
				</Text>
				<Group justify="center">
					<HelpButton />
					<Button onClick={() => window.location.reload()} variant="outline">
						Rafraîchir la page
					</Button>
				</Group>
			</div>
		</div>
	</Container>
);

export default ServerError;
