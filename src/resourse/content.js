export async function getContent(dirid) {
    let url = 'http://164.90.161.80:3000/api/content'
    if (dirid) {
        url = `http://164.90.161.80:3000/api/content?dirId=${dirid}`
    }
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })

    const payload = await res.json()

    if (res.ok) {
        return payload
    } else {
        throw payload
    }
}
