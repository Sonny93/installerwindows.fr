import { Link } from '@inertiajs/react';
import { Button, Container, Group, Text, Title } from '@mantine/core';
import { Error500 } from '~/components/errors/error_500';
import { HelpButton } from '~/components/generics/help_button';
import classes from '~/css/errors.module.css';

const ServerError = () => (
	<Container className={classes.root}>
		<div className={classes.inner}>
			<Error500 className={classes.image} />
			<div className={classes.content}>
				<Title className={classes.title}>Erreur serveur</Title>
				<Text c="dimmed" size="lg" ta="center" className={classes.description}>
					Une erreur côté serveur est survenue. Si le problème persiste,
					veuillez nous contacter.
				</Text>
				<Group justify="center">
					<HelpButton />
					<Button component={Link} href="/" variant="outline">
						Retour à la page d'accueil
					</Button>
				</Group>
			</div>
		</div>
	</Container>
);

export default ServerError;
