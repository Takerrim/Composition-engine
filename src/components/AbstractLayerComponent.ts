import { IProps, IPosition } from './interfaces'
import { LayerTypes } from './enums'

abstract class AbstractLayerComponent {
  private wrapper: HTMLDivElement = document.createElement('div')

  protected canvas: HTMLCanvasElement = document.createElement('canvas')

  protected ctx!: CanvasRenderingContext2D

  public props: IProps = {} as IProps

  private titleLayerElement: HTMLDivElement = document.createElement('div')

  constructor(props: IProps) {
    if (!props) {
      throw new Error('props is not defined')
    }
    this.props = props

    this.ctx = this.canvas.getContext('2d')
    this.mount()

    this.wrapper.addEventListener('mouseenter', this.onMouseEnter.bind(this))
    this.wrapper.addEventListener('mouseleave', this.onMouseLeave.bind(this))
    this.titleLayerElement.textContent = this.props.name
    this.titleLayerElement.classList.add('title-layer')
    this.wrapper.appendChild(this.titleLayerElement)
  }

  private mount() {
    this.wrapper.appendChild(this.canvas)
    this.canvas.width = this.props.width
    this.canvas.height = this.props.height

    if (this.props.type === LayerTypes.MainBackground) {
      this.wrapper.classList.add('main-background-wrapper')
    } else {
      this.wrapper.classList.add('layer-wrapper')
      this.wrapper.addEventListener('mousedown', this.onMouseDown.bind(this))
    }

    this.setPosition(this.props.position)
    document.querySelector('.project-wrapper').appendChild(this.wrapper)
  }

  public destroy() {
    this.wrapper.removeEventListener('mousedown', this.onMouseDown.bind(this))
  }

  private onMouseEnter() {}

  private onMouseLeave() {}

  private setPosition(position: IPosition) {
    this.wrapper.style.left = `${position.x}px`
    this.wrapper.style.top = `${position.y}px`
  }

  private onMouseMove(event: MouseEvent, shiftX: number, shiftY: number) {
    requestAnimationFrame(() => {
      const { wrapper } = this
      if (event.pageX - shiftX < 0) {
        wrapper.style.left = `${0}px`
      } else if (
        event.pageX - shiftX >=
        wrapper.parentElement.clientWidth - wrapper.clientWidth
      ) {
        wrapper.style.left = `${
          wrapper.parentElement.clientWidth - wrapper.clientWidth
        }px`
      } else {
        wrapper.style.left = `${event.pageX - shiftX}px`
      }

      if (event.pageY - shiftY < 0) {
        wrapper.style.top = `${0}px`
      } else if (
        event.pageY - shiftY >=
        wrapper.parentElement.clientHeight - wrapper.clientHeight
      ) {
        wrapper.style.top = `${
          wrapper.parentElement.clientHeight - wrapper.clientHeight
        }px`
      } else {
        wrapper.style.top = `${event.pageY - shiftY}px`
      }
    })
  }

  private onMouseUp(...cb: ((event: MouseEvent) => void)[]) {
    window.removeEventListener('mousemove', cb[0])
    window.removeEventListener('mouseup', cb[1])
  }

  private onMouseDown(event: MouseEvent) {
    const rect = this.wrapper.getBoundingClientRect()
    const parentRect = this.wrapper.parentElement.getBoundingClientRect()
    const initialPosition = {
      x: rect.x - parentRect.x + window.scrollX,
      y: rect.y - parentRect.y + window.scrollY,
    }
    const shiftX = event.pageX - initialPosition.x
    const shiftY = event.pageY - initialPosition.y

    const mouseMoveWrapper = (e: MouseEvent) => {
      this.onMouseMove(e, shiftX, shiftY)
    }

    const mouseUpWrapper = () => {
      this.onMouseUp(mouseMoveWrapper, mouseUpWrapper)
    }

    document.ondragstart = () => false
    window.addEventListener('mousemove', mouseMoveWrapper)
    window.addEventListener('mouseup', mouseUpWrapper)
  }
}

export default AbstractLayerComponent
