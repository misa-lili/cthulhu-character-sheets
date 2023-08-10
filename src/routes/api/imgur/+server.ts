import { IMGUR_CLIENT_ID } from '$env/static/private'
import { json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, fetch }) {
	const formData = await request.formData()
	const response = await fetch('https://api.imgur.com/3/image', {
		method: 'POST',
		headers: {
			Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
		},
		body: formData,
		redirect: 'follow',
	})

	const body = await response.json()

	return json({ ok: response.ok, status: response.status, message: body })
}
