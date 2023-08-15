import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch }) => {
	// TODO: 이거 처음부터 POST 할게 아니라 저장할때 POST하는게 낫겠음
	// if (body.ok)
	throw redirect(307, '/new')
	// else return { status: 500 }
}
