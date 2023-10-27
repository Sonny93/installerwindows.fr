export function urlify(text) {
  return text.replace(
    /(https?:\/\/[^\s]+)/g,
    (url) =>
      `<a href="${url}" class="link-anim" rel="noreferrer" target="_blank">${url}</a>`,
  );
}

export function isStringEmpty(str: string = "") {
  return !str || str === "";
}

export function trimify(str: string = "") {
  return str.trim();
}

export function slugify(str: string = "") {
  return str
    .normalize("NFD")
    .replaceAll(" ", "-")
    .replaceAll(/[\u0300-\u036f'"=\(\)&_]/g, "")
    .replace(/^-+|-+(?=-|$)/g, "")
    .toLowerCase();
}

export function pluralize (word: string, quantity: number) {
	if (quantity === 0) return ''
	return `${quantity} ${word}${quantity > 1 ? 's' : ''}`
}

export function isUrl(str: string = "") {
  return str.match(
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
  );
}

export function isGithubUrl(str: string = "") {
  return str.match(/(http(s)?):\/\/github\.com\/\w+\/(.+|)(?:\.git)?/)
    ? true
    : false;
}

export function isGithubUserContentUrl(str: string = "") {
  return str.match(
    /(http(s)?):\/\/raw\.githubusercontent\.com\/\w+\/(.+|)(?:\.git)?/,
  )
    ? true
    : false;
}

export function isImgurUrl(str: string = "") {
  return str.match(/(http(s)?):\/\/(i\.)?imgur\.com\/\w+(\.\w+)?/)
    ? true
    : false;
}
