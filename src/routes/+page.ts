import { initialData } from '$lib/models/data'
import { decompress } from '$lib/utils/LZString'
import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load = (({ url }) => {
	try {
		const data = url.searchParams.get('data')
		if (!data) return initialData
		return decompress(data)
	} catch (error) {
		throw redirect(302, '/')
	}
}) satisfies PageLoad
