import { Link } from '@inertiajs/react';
import { Button, Container, Group, Text, Title } from '@mantine/core';
import { Error404 } from '~/components/errors/error_404';
import { HelpButton } from '~/components/generics/help_button';
import classes from '~/css/errors.module.css';

const NotFound = () => (
	<Container className={classes.root}>
		<div className={classes.inner}>
			<Error404 className={classes.image} />
			<div className={classes.content}>
				<Title className={classes.title}>Oups !</Title>
				<Text c="dimmed" size="lg" ta="center" className={classes.description}>
					La page que vous cherchez n'existe pas. Vous avez peut-être tapé
					l'adresse incorrectement, ou la page a été déplacée vers une autre
					URL.
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

export default NotFound;
