import LZString from 'lz-string'

export function compress(obj: Sheet) {
	return LZString.compressToEncodedURIComponent(JSON.stringify(obj))
}

export function decompress(text: string): Sheet {
	return JSON.parse(LZString.decompressFromEncodedURIComponent(text))
}
