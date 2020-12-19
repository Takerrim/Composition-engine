import { INodeProps } from "@/entities/interfaces"

export interface IRootState {
  project: IProjectState
}

export interface IProjectState {
  config: INodeProps
}
