let wrapper: HTMLElement

function dragOver(event: MouseEvent, shiftX: number, shiftY: number) {
  requestAnimationFrame(() => {
    if (event.pageX - shiftX < 0) {
      wrapper.style.left = `${0}px`
    } else if (
      event.pageX - shiftX >=
      wrapper.parentElement!.clientWidth - wrapper.clientWidth
    ) {
      wrapper.style.left = `${
        wrapper.parentElement!.clientWidth - wrapper.clientWidth
      }px`
    } else {
      wrapper.style.left = `${event.pageX - shiftX}px`
    }

    if (event.pageY - shiftY < 0) {
      wrapper.style.top = `${0}px`
    } else if (
      event.pageY - shiftY >=
      wrapper.parentElement!.clientHeight - wrapper.clientHeight
    ) {
      wrapper.style.top = `${
        wrapper.parentElement!.clientHeight - wrapper.clientHeight
      }px`
    } else {
      wrapper.style.top = `${event.pageY - shiftY}px`
    }
  })
}

function dragStart(event: MouseEvent, target: HTMLElement) {
  event.stopPropagation()

  wrapper = target
  const rect = wrapper.getBoundingClientRect()
  const parentRect = wrapper.parentElement!.getBoundingClientRect()
  const initialPosition = {
    x: rect.x - parentRect.x + window.scrollX,
    y: rect.y - parentRect.y + window.scrollY,
  }
  const shiftX = event.pageX - initialPosition.x
  const shiftY = event.pageY - initialPosition.y

  const mouseMoveWrapper = (e: MouseEvent) => {
    dragOver(e, shiftX, shiftY)
  }

  const mouseUpWrapper = () => {
    dragEnd(mouseMoveWrapper, mouseUpWrapper)
  }

  document.ondragstart = () => false
  window.addEventListener('mousemove', mouseMoveWrapper)
  window.addEventListener('mouseup', mouseUpWrapper)
}

function dragEnd(...cb: ((event: MouseEvent) => void)[]) {
  window.removeEventListener('mousemove', cb[0])
  window.removeEventListener('mouseup', cb[1])
}

export default {
  dragOver,
  dragStart,
  dragEnd,
}