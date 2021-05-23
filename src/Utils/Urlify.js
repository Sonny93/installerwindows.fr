export default function urlify(text) {
    return text.replace(/(https?:\/\/[^\s]+)/g, (url) => `<a href="${url}" class="link-anim" target="_blank">${url}</a>`);
}