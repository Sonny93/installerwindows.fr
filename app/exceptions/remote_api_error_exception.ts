import { Exception } from '@adonisjs/core/exceptions';

export default class RemoteApiErrorException extends Exception {
	static status = 500;
	static code = 'REMOTE_API_ERROR';
	static message =
		"Une erreur est survenue lors de la récupération des données de l'API";
	static services = ['youtube', 'github'] as const;
	link?: string;
	service?: string;

	constructor(
		api: (typeof RemoteApiErrorException.services)[number],
		link?: string
	) {
		super(`${RemoteApiErrorException.message} "${api}"`);
		this.link = link;
		this.service = api;
	}
}
