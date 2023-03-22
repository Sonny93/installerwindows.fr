export function postRequest(url: string, body: any) {
    return fetch(url, {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => (res.ok ? res.json() : Promise.reject()));
}
