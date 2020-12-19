import AbstractLayer from './AbstractLayer'
import { INodeProps, AnyLayerType } from './interfaces'
import setTransparentBackground from '@/utils/setTransparentBackground'

class TextLayer extends AbstractLayer {
  public text: string = ''

  constructor(nodeProps: INodeProps, parentLayer: AnyLayerType) {
    super(nodeProps, parentLayer)

    if (nodeProps.characters) {
      this.text = nodeProps.characters
    }

    this.fillText()
  }

  private get measureData() {
    this.ctx.font
    return this.ctx.measureText(this.text)
  }

  private fillText() {
    if (this.nodeProps.style) {
      this.ctx.font = `${this.nodeProps.style.fontSize}px sans-serif`
      this.ctx.fillText(this.text, 0, this.nodeProps.style.fontSize)
    }
  }

  private strokeText() {
    this.ctx.strokeText(this.text, 0, 0)
  }

  public changeText(text: string) {
    this.text = text
    this.fillText()
  }

  public render() {
    const bg = this.nodeProps.backgroundColor
      ? Object.values(this.nodeProps.backgroundColor)
      : ['255', '255', '255', '1']
    setTransparentBackground(this.ctx, bg)
  }
}

export default TextLayer
