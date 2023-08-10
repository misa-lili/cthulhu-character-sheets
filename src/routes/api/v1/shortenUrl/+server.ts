import { json } from '@sveltejs/kit'
import { getFromUrls, putToUrls } from '$lib/aws/orm'
import { base60Encode } from '$lib/utils/base60'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ url }) => {
	try {
		const key = url.searchParams.get('key') || ''
		const response = await getFromUrls(key)
		const value = response.Item?.value.S
		if (!value) throw new Error('Not found')
		return json({ ok: true, status: 200, message: value })
	} catch (error) {
		return json({ ok: false, status: 500, message: error instanceof Error ? error.message : error })
	}
}

export const POST: RequestHandler = async ({ url }) => {
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
		return json({ ok: false, status: 500, message: error instanceof Error ? error.message : error })
	}
}
