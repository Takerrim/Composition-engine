import { upperToDashed } from '@/utils'
import AbstractLayer from './AbstractLayer'
import { INodeProps, AnyLayerType } from './interfaces'

enum NeededStyles {
  fontSize = 'fontSize',
  fontFamily = 'fontFamily',
  fontWeight = 'fontWeight',
}

class TextLayer extends AbstractLayer {
  public svgEl: SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

  private textarea: HTMLDivElement = document.createElement('div')

  private text: string = ''

  private foreignObjectEl: SVGForeignObjectElement = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')

  constructor(nodeProps: INodeProps, parentLayer: AnyLayerType) {
    super(nodeProps, parentLayer)

    this.text = nodeProps.characters as string

    this.mount()
  }

  private onInput() {
    this.text = this.foreignObjectEl.children[0].textContent as string

    setTimeout(() => {
      const { scrollHeight } = this.textarea
      this.resize(scrollHeight)
    }, 0)
  }

  private resize(height: number) {
      const { width } = this.nodeProps.absoluteBoundingBox!

      this.svgEl.setAttribute('width',  width.toString())
      this.svgEl.setAttribute('height',  height.toString())
      this.svgEl.setAttribute('viewBox', `0 0 ${width} ${height}`)

      this.foreignObjectEl.setAttribute('width',  width.toString())
      this.foreignObjectEl.setAttribute('height', height.toString())
      this.foreignObjectEl.setAttribute('x', '0')
      this.foreignObjectEl.setAttribute('y', '0')
  }

  private setStyles() {
    const { r, g, b, a } = this.nodeProps.fills[0].color
    this.foreignObjectEl.setAttribute('color', `rgba(${r}, ${g}, ${b}, ${a})`)
    if (this.nodeProps.style) {
      Object.entries(this.nodeProps.style).forEach(([key, value]) => {
        if ([
          NeededStyles.fontFamily,
          NeededStyles.fontSize,
          NeededStyles.fontWeight
        ].includes(key as NeededStyles)) {
          this.foreignObjectEl.setAttribute(`${upperToDashed(key)}`, value)
        }
      })
    }
  }

  protected mount() {
    super.mount()
  
    this.svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

    this.foreignObjectEl.append(this.textarea)

    this.svgEl.append(this.foreignObjectEl)

    if (this.nodeProps.absoluteBoundingBox) {
      const { height } = this.nodeProps.absoluteBoundingBox
      this.textarea.style.height = `${height}px`
      this.resize(height)
    }

    this.textarea.setAttribute('contenteditable', 'true')
    this.textarea.classList.add('textarea')
    this.textarea.textContent = this.text
    this.textarea.addEventListener('input', this.onInput.bind(this))

    this.setStyles()

    this.wrapper.append(this.svgEl)
  }

  toImage(): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const svgURL = new XMLSerializer().serializeToString(this.svgEl)

      const image = new Image()
      image.onload = () => {
        resolve(image)
      }

      image.onerror = reject
      image.src = `data:image/svg+xml; charset=utf8, ${encodeURIComponent(svgURL)}`
    })
  }
}

export default TextLayer
