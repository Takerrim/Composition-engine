import { IProps, IPosition, AnyLayerType } from './interfaces'
import { LayerTypes } from './enums'
import { dragging, setStyles } from '../utils'

abstract class AbstractLayer {
  private wrapper: HTMLDivElement = document.createElement('div')

  protected canvas: HTMLCanvasElement = document.createElement('canvas')

  protected ctx!: CanvasRenderingContext2D

  public props: IProps = {} as IProps

  private titleLayerElement: HTMLDivElement = document.createElement('div')

  public parentLayer: AnyLayerType | null = null

  public childLayers: AnyLayerType[] = []

  constructor(props: IProps, parentLayer: AnyLayerType | null = null) {
    if (!props) {
      throw new Error('props is not defined')
    }
    this.props = props

    this.parentLayer = parentLayer

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

    if (this.parentLayer) {
      this.parentLayer.wrapper.appendChild(this.wrapper)
    } else {
      document.querySelector('.project-wrapper').appendChild(this.wrapper)
    }
  }

  public destroy() {
    this.wrapper.removeEventListener('mousedown', this.onMouseDown.bind(this))
  }

  private onMouseEnter(e: MouseEvent) {
    e.stopPropagation()
    setStyles({ border: '1px solid #5263d0' }, this.wrapper)
    setStyles({ opacity: 1 }, this.titleLayerElement)
  }

  private onMouseLeave() {
    setStyles({ border: '1px solid transparent' }, this.wrapper)
    setStyles({ opacity: 0 }, this.titleLayerElement)
  }

  private setPosition(position: IPosition) {
    this.wrapper.style.left = `${position.x}px`
    this.wrapper.style.top = `${position.y}px`
  }

  private onMouseDown(event: MouseEvent) {
    dragging.dragStart(event, this.wrapper)
  }

  public get getImageData() {
    return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
  }

  public get position() {
    return {
      x: +this.wrapper.style.left.slice(0, this.wrapper.style.left.length - 2),
      y: +this.wrapper.style.top.slice(0, this.wrapper.style.top.length - 2),
    }
  }
}

export default AbstractLayer
