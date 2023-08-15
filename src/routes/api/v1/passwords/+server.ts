import { json } from '@sveltejs/kit'
import { get, put } from '$lib/server/aws/orm'
import type { RequestHandler } from './$types'
import bcrypt from 'bcrypt'

/**
 * match password
 * @param param0
 * @returns
 */
export const GET: RequestHandler = async ({ url }) => {
	try {
		const id = url.searchParams.get('key') || ''
		const rawPassword = url.searchParams.get('value') || ''

		if (!id || !rawPassword) return json({ ok: false, status: 400, message: 'Bad Request' })

		const response = await get('passwords', id)
		const encodedPasswordFromDB = response.Item?.value.S

		if (!encodedPasswordFromDB) return json({ ok: false, status: 404, message: 'Not Found' })

		const isSame = await bcrypt.compare(rawPassword, encodedPasswordFromDB)
		if (!isSame) return json({ ok: false, status: 401, message: 'Unauthorized' })

		return json({ ok: true, status: 200, message: rawPassword })
	} catch (error) {
		return json({ ok: false, status: 500, message: error instanceof Error ? error.message : error })
	}
}

/**
 * put password
 * @param param0
 * @returns
 */
export const PUT: RequestHandler = async ({ url }) => {
	try {
		const key = url.searchParams.get('key') || ''
		const inputPW = url.searchParams.get('value') || ''
		const currentPW = url.searchParams.get('current') || ''
		if (!key || !inputPW) return json({ ok: false, status: 400, message: 'Bad Request' })

		const response = await get('passwords', key)
		if (response.Item) {
			// UPDATE
			if (!currentPW) return json({ ok: false, status: 400, message: 'Bad Request' })

			const isSame = await bcrypt.compare(currentPW, response.Item?.value.S ?? '')

			if (!isSame) return json({ ok: false, status: 401, message: 'Unauthorized' })

			const hashedInputPw = await bcrypt.hash(inputPW, await bcrypt.genSalt(10))
			await put('passwords', key, hashedInputPw)
			return json({ ok: true, status: 200, message: inputPW })
		} else {
			// CREATE
			const hashedInputPw = await bcrypt.hash(inputPW, await bcrypt.genSalt(10))
			await put('passwords', key, hashedInputPw)
			return json({ ok: true, status: 200 })
		}
	} catch (error) {
		return json({ ok: false, status: 500, message: error instanceof Error ? error.message : error })
	}
}
