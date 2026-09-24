import { Exception } from '@adonisjs/core/exceptions';

/**
 * Raised when a heading element reaches the table-of-contents extraction
 * step without a string `id`. rehype-sanitize and rehype-slug both run
 * earlier in the markdown pipeline, so a missing id means the pipeline
 * order was broken upstream rather than a recoverable input error.
 */
export default class MissingHeadingIdException extends Exception {
	static status = 500;
	static code = 'E_MISSING_HEADING_ID';
}
