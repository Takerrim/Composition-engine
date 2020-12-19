import { NodeTypes } from './enums'
import { BackgroundLayer, TextLayer } from './index'

export interface INodeProps {
  id: string
  name: string
  type: NodeTypes
  children?: INodeProps[]
  backgroundColor?: IRGBColor
  absoluteBoundingBox?: IAbsoluteBoundingBox
  characters?: string
  style?: ITextStyles
}

export interface IPosition {
  x: number
  y: number
}

export interface IRGBColor {
  r: number
  g: number
  b: number
  a: number
}

export interface IAbsoluteBoundingBox {
  width: number
  height: number
  x: number
  y: number
}

export interface ITextStyles {
  fontFamily: string
  fontSize: number
  fontWeight: number
  letterSpacing: number
  lineHeightPercent: number
  lineHeightPx: number
  textAlignHorizontal: string
  textAlignVertical: string
}

export type AnyLayerType = BackgroundLayer | TextLayer
