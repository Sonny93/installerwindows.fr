import { Exception } from '@adonisjs/core/exceptions';

export default class InvalidGithubMarkdownUrlException extends Exception {
	static status = 422;
	static code = 'E_INVALID_GITHUB_MARKDOWN_URL';
}
