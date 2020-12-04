import { BackgroundLayer, TextLayer } from './index'

export interface IProps {
  name: string
  type: string
  image_url: string | null
  // in rgba
  background: string | null
  width: number
  height: number
  position: IPosition
  children?: IProps[]
  text?: string
  // in pixels
  font_size?: number
  text_color?: string
}

export interface IPosition {
  x: number
  y: number
}

export type AnyLayerType = BackgroundLayer | TextLayer
