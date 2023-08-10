import { BITLY_ACCESS_TOKEN, BITLY_GUID } from '$env/static/private'
import { json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export async function POST({ url, fetch }) {
	const data = url.searchParams.get('data')
	const long_url = `https://ccs.misalili.com/?data=${data}`

	const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${BITLY_ACCESS_TOKEN}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			long_url,
			domain: 'bit.ly',
			group_guid: BITLY_GUID,
		}),
	})

	const body = await response.json()

	return json({ ok: response.ok, status: response.status, message: body })
}
