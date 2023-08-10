import LZString from 'lz-string'

export function decompress(text: string) {
	try {
		const decompress = LZString.decompressFromEncodedURIComponent(text)
		const obj = JSON.parse(decompress)
		return obj
	} catch (error) {
		throw error
	}
}
