export function tabEnter(node: HTMLElement): { destroy: () => void } {
	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.keyCode === 13) {
			let inputs = Array.from(
				document.querySelectorAll(
					'input:not([tabindex="-1"]), [contentEditable="true"]:not([tabindex="-1"])',
				),
			)
			let currentIndex = inputs.indexOf(event.target as HTMLElement)
			let nextIndex = (currentIndex + 1) % inputs.length

			if (inputs[nextIndex]) {
				;(inputs[nextIndex] as HTMLInputElement).focus()
				event.preventDefault() // prevent the default action, such as submitting a form
			}
		}
	}

	// Attach the event listener to the node
	node.addEventListener('keydown', handleKeyPress)

	// Cleanup function
	return {
		destroy() {
			node.removeEventListener('keydown', handleKeyPress)
		},
	}
}
