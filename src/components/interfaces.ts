import BackgroundLayerComponent from "./BackgroundLayerComponent"

export interface IProps {
  name: string
  type: string
  image_url: string | null
  background: string | null
  width: number
  height: number
  position: IPosition
  children?: IProps[]
}

export interface IPosition {
  x: number
  y: number
}

export type AnyComponentType = BackgroundLayerComponent
