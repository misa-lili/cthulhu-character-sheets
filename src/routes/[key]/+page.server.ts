import type { PageServerLoad } from './$types'
import { decompress } from '$lib/utils/LZString'
import { initialData } from '$lib/models/data'

export const load: PageServerLoad = async ({ fetch, url }) => {
	try {
		if (url.pathname.slice(1) === 'new') return { ok: true, status: 200, message: initialData }
		const response = await fetch(`/api/v1/sheets?key=${url.pathname.slice(1)}`)
		const body = await response.json()
		const message = decompress(body.message)
		return { ok: true, status: 200, message }
	} catch (error) {
		console.error(error)
	}
}
