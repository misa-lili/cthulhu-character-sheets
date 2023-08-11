import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params, fetch }) => {
	const { key } = params
	const response = await fetch(`/api/v1/shortenUrl?key=${key}`)
	const body = await response.json()
	if (body.ok) throw redirect(307, '/?data=' + body.message)
	else throw redirect(307, '/')
}
