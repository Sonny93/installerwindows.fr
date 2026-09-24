export function isValidHttpUrl(urlParam: string) {
	const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}(:\d+)?(\/.*)?(\?.*)?(#[^#]*)?$/;
	const domainRegex =
		/^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?(\?.*)?(#[^#]*)?$/;
	const simpleDomainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]$/;

	let urlToTest = urlParam.trim();

	if (urlToTest.startsWith('http://') || urlToTest.startsWith('https://')) {
		try {
			const url = new URL(urlToTest);
			return url.protocol === 'http:' || url.protocol === 'https:';
		} catch {
			return false;
		}
	}

	if (ipv4Regex.test(urlToTest)) {
		try {
			new URL(`http://${urlToTest}`);
			return true;
		} catch {
			return false;
		}
	}

	if (domainRegex.test(urlToTest)) {
		try {
			new URL(`http://${urlToTest}`);
			return true;
		} catch {
			return false;
		}
	}

	if (simpleDomainRegex.test(urlToTest)) {
		try {
			new URL(`http://${urlToTest}`);
			return true;
		} catch {
			return false;
		}
	}

	return false;
}
