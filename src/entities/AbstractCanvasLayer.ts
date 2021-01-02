import { AnyLayerType, INodeProps } from './interfaces'
import AbstractLayer from './AbstractLayer'

abstract class AbstractCanvasLayer extends AbstractLayer {
  protected canvas: HTMLCanvasElement = document.createElement('canvas')

  protected ctx: CanvasRenderingContext2D

  constructor(nodeProps: INodeProps, parentLayer: AnyLayerType | null = null) {
    super(nodeProps, parentLayer)

    if (!nodeProps) {
      throw new Error('node is undefined')
    }


    this.ctx = this.canvas.getContext('2d')!

    this.mount()
  }

  protected mount(): void {
    this.wrapper.appendChild(this.canvas)

    if (this.nodeProps.absoluteBoundingBox) {
      const { width, height } = this.nodeProps.absoluteBoundingBox
      this.canvas.width = width
      this.canvas.height = height
    }

    super.mount()
  }


  public get getImageData(): ImageData {
    return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
  }
}

export default AbstractCanvasLayer
