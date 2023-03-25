export function postRequest(url: string, body: any) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(extractData);
}

export function putRequest(url: string, body: any) {
    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(extractData);
}

export function deleteRequest(url: string) {
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(extractData);
}

async function extractData(res) {
    const data = await res.json();
    if (res.ok) {
        return data;
    } else {
        throw new Error(data);
    }
}
