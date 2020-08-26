import { BackgroundLayer, TextLayer } from "./index"

export interface IProps {
  name: string
  type: string
  image_url: string | null
  background: string | null
  width: number
  height: number
  position: IPosition
  children?: IProps[]
  text?: string
}

export interface IPosition {
  x: number
  y: number
}

export type AnyLayerType = BackgroundLayer | TextLayer
