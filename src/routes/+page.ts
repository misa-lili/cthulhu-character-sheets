import { initialData } from '$lib/models/data'
import { decompress } from '$lib/utils/LZString'
import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load = (({ url }) => {
	try {
		const data = url.searchParams.get('data')
		if (!data) return initialData
		const decompressed = decompress(data)
		if (!decompressed) return initialData
		return decompressed
	} catch (error) {
		throw redirect(302, '/')
	}
}) satisfies PageLoad
