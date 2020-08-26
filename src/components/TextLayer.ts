import AbstractLayer from "./AbstractLayer"
import { IProps, AnyLayerType } from "./interfaces"

class TextLayer extends AbstractLayer {
  public text: string = ''

  constructor(props: IProps, parentLayer: AnyLayerType) {
    super(props, parentLayer)
    this.text = props.text
    this.ctx.font = '48px sans-serif'
    this.canvas.width = this.measureData.width
    this.canvas.height = 50
    this.fillText()
  }

  private get measureData() {
    return this.ctx.measureText(this.text)
  }

  private fillText() {
    this.ctx.fillText(this.text, 0, 0)
  }

  private strokeText() {
    this.ctx.strokeText(this.text, 0, 0)
  }

  public changeText(text: string) {
    this.text = text
    this.fillText()
  }
}

export default TextLayer
