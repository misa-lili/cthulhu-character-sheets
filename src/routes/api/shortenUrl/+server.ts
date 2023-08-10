import { json } from '@sveltejs/kit'
import { getFromUrls, putToUrls } from '$lib/database/orm.js'
import { base60Encode } from '$lib/utils/base60'

/** @type {import('./$types').RequestHandler} */
export async function POST({ url }) {
	try {
		const value = url.searchParams.get('data') || ''
		const encoded = base60Encode(value)

		let length: number = 3
		while (true) {
			const key = encoded.slice(0, length)
			const response = await getFromUrls(key)
			if (!response.Item || response.Item.value.S === value) {
				await putToUrls(key, value)
				return json({ ok: true, status: 200, message: key })
			}
			length += 1
		}
	} catch (error) {
		return json({ ok: false, status: 500, message: error })
	}
}
