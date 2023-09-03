import { json } from '@sveltejs/kit'
import { get, put } from '$lib/server/aws/orm'
import { base60Encode } from '$lib/utils/base60'
import type { RequestHandler } from './$types'
import { compress } from '$lib/utils/LZString'
import { initialData } from '$lib/models/data'

export const GET: RequestHandler = async ({ url }) => {
	try {
		const key = url.searchParams.get('key') || ''
		const response = await get('sheets', key)
		const value = response.Item?.value.S
		if (!value) throw new Error('Not found')
		return json({ ok: true, status: 200, message: value })
	} catch (error) {
		return json({ ok: false, status: 500, message: error instanceof Error ? error.message : error })
	}
}

export const POST: RequestHandler = async ({ fetch, request }) => {
	try {
		const body = await request.json()
		const value = body.value || ''
		const password = body.pw || ''
		const uuid = crypto.randomUUID()
		const encoded = base60Encode(uuid)

		let length: number = 3
		while (true) {
			const key = encoded.slice(0, length)
			const response = await get('sheets', key)
			if (!response.Item) {
				await put('sheets', key, value)
				await fetch(`/api/v1/passwords?key=${key}&value=${password}`, { method: 'PUT' })
				return json({ ok: true, status: 200, message: key })
			}
			length += 1
		}
	} catch (error) {
		return json({ ok: false, status: 500, message: error instanceof Error ? error.message : error })
	}
}

export const PUT: RequestHandler = async ({ url, request }) => {
	try {
		const body = await request.json()
		const key = body.key || ''
		const value = body.value || ''
		await put('sheets', key, value)
		return json({ ok: true, status: 200 })
	} catch (error) {
		return json({ ok: false, status: 500, message: error instanceof Error ? error.message : error })
	}
}
