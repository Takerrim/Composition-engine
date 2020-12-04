import AbstractLayer from './AbstractLayer'
import { IProps, AnyLayerType } from './interfaces'
import setTransparentBackground from '../utils/setTransparentBackground'

class TextLayer extends AbstractLayer {
  public text: string = ''

  constructor(props: IProps, parentLayer: AnyLayerType) {
    super(props, parentLayer)

    this.text = props.text

    this.fillText()
  }

  private get measureData() {
    this.ctx.font
    return this.ctx.measureText(this.text)
  }

  private fillText() {
    this.ctx.font = `${this.props.font_size}px sans-serif`
    this.ctx.fillText(this.text, 0, this.props.font_size)
  }

  private strokeText() {
    this.ctx.strokeText(this.text, 0, 0)
  }

  public changeText(text: string) {
    this.text = text
    this.fillText()
  }

  public render() {
    const bg = this.props.background
      ? this.props.background.split(',')
      : ['255', '255', '255', '255']
    setTransparentBackground(this.ctx, bg)
  }
}

export default TextLayer
