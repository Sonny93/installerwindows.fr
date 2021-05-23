export default function urlify(text) {
    return text.replace(/(https?:\/\/[^\s]+)/g, (url) => `<a href="${url}" class="link-anim" rel="noreferrer" target="_blank">${url}</a>`);
}