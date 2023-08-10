export function base60Encode(input: string): string {
	const base60Chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
	const bytes = Buffer.from(input, 'utf8')
	let value = BigInt(`0x${bytes.toString('hex')}`)
	const base = BigInt(60)
	let encoded = ''
	while (value > 0) {
		const remainder = Number(value % base)
		encoded = base60Chars[remainder] + encoded
		value /= base
	}
	return encoded
}
