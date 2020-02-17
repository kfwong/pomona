// tslint:disable-next-line: interface-name
interface Number {
	pad(length: number): string
}

Number.prototype.pad = function(size: number) {
	let s = String(this)
	while (s.length < (size || 2)) {
		s = "0" + s
	}
	return s
}
