import { putToImages } from '$lib/aws/orm'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.formData()
		const file = formData.get('image') as File
		const ext = file.type.split('/')[1]
		const key = crypto.randomUUID()

		await putToImages(key, file)

		const url = `https://misalili-images.s3.ap-northeast-2.amazonaws.com/${key}.${ext}`

		return json({ ok: true, status: 200, message: url })
	} catch (error) {
		return json({ ok: false, status: 500, message: error instanceof Error ? error.message : error })
	}
}
