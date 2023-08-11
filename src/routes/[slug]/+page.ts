import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params, fetch }) => {
	const { slug } = params
	const response = await fetch(`/api/v1/shortenUrl?key=${slug}`)
	const body = await response.json()
	if (body.ok) throw redirect(301, '/?data=' + body.message)
	else throw redirect(301, '/')
}
