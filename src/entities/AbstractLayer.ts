import { IPosition, AnyLayerType, INodeProps } from './interfaces'
import { dragging, setStyles } from '@/utils'
import { NodeTypes } from './enums'

abstract class AbstractLayer {
  public wrapper: HTMLDivElement = document.createElement('div')

  public nodeProps: INodeProps = {} as INodeProps

  private titleLayerElement: HTMLDivElement = document.createElement('div')

  public parentLayer: AnyLayerType | null = null

  public children: AnyLayerType[] = []

  constructor(nodeProps: INodeProps, parentLayer: AnyLayerType | null = null) {
    if (!nodeProps) {
      throw new Error('node is undefined')
    }
    this.nodeProps = nodeProps

    this.parentLayer = parentLayer

    this.wrapper.addEventListener('mouseenter', this.onMouseEnter.bind(this))
    this.wrapper.addEventListener('mouseleave', this.onMouseLeave.bind(this))
    this.titleLayerElement.textContent = this.nodeProps.name
    this.titleLayerElement.classList.add('title-layer')
    this.wrapper.appendChild(this.titleLayerElement)
  }

  protected mount(): void {

    if (this.nodeProps.absoluteBoundingBox) {
      const { x, y } = this.nodeProps.absoluteBoundingBox

      if (this.nodeProps.type !== NodeTypes.RootFrame) {
        this.setPosition({ x, y })
      }
    }

    if (this.parentLayer) {
      this.wrapper.classList.add('layer-wrapper')
      this.wrapper.addEventListener('mousedown', this.onMouseDown.bind(this))
      this.parentLayer.wrapper.appendChild(this.wrapper)
    } else {
      document.querySelector('.project-container')!.appendChild(this.wrapper)
    }
  }

  public destroy(): void {
    this.wrapper.removeEventListener('mousedown', this.onMouseDown.bind(this))
  }

  private onMouseEnter(e: MouseEvent): void {
    e.stopPropagation()
    setStyles({ border: '1px solid #5263d0' }, this.wrapper)
    setStyles({ opacity: 1 }, this.titleLayerElement)
  }

  private onMouseLeave(): void {
    setStyles({ border: '1px solid transparent' }, this.wrapper)
    setStyles({ opacity: 0 }, this.titleLayerElement)
  }

  private setPosition(position: IPosition): void {
    this.wrapper.style.left = `${position.x}px`
    this.wrapper.style.top = `${position.y}px`
  }

  private onMouseDown(event: MouseEvent): void {
    dragging.dragStart(event, this.wrapper)
  }

  public get position() {
    return {
      x: Number(this.wrapper.style.left.slice(0, this.wrapper.style.left.length - 2)),
      y: Number(this.wrapper.style.top.slice(0, this.wrapper.style.top.length - 2)),
    }
  }
}

export default AbstractLayer
