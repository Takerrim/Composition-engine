import AbstractCanvasLayer from './AbstractCanvasLayer'
// import { loadImage } from '@/utils'
import { INodeProps, AnyLayerType } from './interfaces'

export default class BackgroundLayer extends AbstractCanvasLayer {
  constructor(nodeProps: INodeProps, parentLayer: AnyLayerType | null) {
    super(nodeProps, parentLayer)
    // if (this.node.image_url) {
    //   loadImage(this.ctx, require('./image.jpg'))
    // } 
    if (this.nodeProps.backgroundColor) {
      const { r, g, b, a } = this.nodeProps.backgroundColor
      this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    } else {
      throw new Error('Neither background and image_url exists')
    }
  }
}
