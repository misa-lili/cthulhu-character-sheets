export function autoWidth(
	node: HTMLInputElement,
	isAutoWidth: boolean,
): {
	destroy: () => void
} | void {
	if (isAutoWidth === false) return

	// 너비를 측정하기 위한 가상 DOM 요소 생성
	const virtualDiv = document.createElement('div')
	virtualDiv.style.position = 'absolute'
	virtualDiv.style.opacity = '0'
	virtualDiv.style.font = getComputedStyle(node).font // 폰트 스타일 복사
	virtualDiv.style.margin = getComputedStyle(node).margin // 마진 스타일 복사
	virtualDiv.style.padding = getComputedStyle(node).padding // 패딩 스타일 복사
	virtualDiv.style.paddingRight = '7px'

	document.body.appendChild(virtualDiv)

	function updateWidth(): void {
		console.log('updateWidth')
		virtualDiv.textContent = node.value || node.placeholder
		node.style.width = `${virtualDiv.clientWidth + 2}px` // 잘리는 것을 피하기 위해 +2
	}

	// 초기 너비 업데이트 및 입력 변경시 업데이트
	updateWidth()
	node.addEventListener('input', updateWidth)

	return {
		destroy() {
			// 디렉티브가 파괴될 때 이벤트 리스너 및 가상 DOM 정리
			node.removeEventListener('input', updateWidth)
			document.body.removeChild(virtualDiv)
		},
	}
}
