import { Exception } from '@adonisjs/core/exceptions';

export default class EmptyPlaylistException extends Exception {
	static status = 404;
	static code = 'E_EMPTY_PLAYLIST';
	static message = 'Aucune vidéo disponible pour le moment';

	constructor() {
		super(EmptyPlaylistException.message);
	}
}
