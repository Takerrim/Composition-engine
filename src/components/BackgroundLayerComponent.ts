import imageUrl from './image.jpg'
import AbstractLayerComponent from './AbstractLayerComponent'
import { loadImage } from '../utils'
import { IProps } from './interfaces'

export default class BackgroundLayerComponent extends AbstractLayerComponent {
  constructor(props: IProps) {
    super(props)

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
