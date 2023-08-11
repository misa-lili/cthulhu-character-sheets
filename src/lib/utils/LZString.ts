import LZString from 'lz-string'

export function compress(obj: object) {
	return LZString.compressToEncodedURIComponent(JSON.stringify(obj))
}

export function decompress(text: string) {
	return JSON.parse(LZString.decompressFromEncodedURIComponent(text))
}
