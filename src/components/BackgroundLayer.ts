import imageUrl from './image.jpg'
import AbstractLayer from './AbstractLayer'
import { loadImage } from '../utils'
import { IProps, AnyLayerType } from './interfaces'

export default class BackgroundLayer extends AbstractLayer {
  constructor(props: IProps, parentLayer: AnyLayerType|null) {
    super(props, parentLayer)
    if (this.props.image_url) {
      loadImage(this.ctx, imageUrl)
    } else if (this.props.background) {
      this.ctx.fillStyle = this.props.background
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    } else {
      throw new Error('Neither background and image_url exists')
    }
  }
}
