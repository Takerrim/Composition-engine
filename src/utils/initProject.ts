import { BackgroundLayerComponent } from '../components'
import { IProps } from '../components/interfaces'
import { LayerTypes } from '../components/enums'

export default function initProject(node: IProps) {
  if (
    node.type === LayerTypes.MainBackground ||
    node.type === LayerTypes.LayerBackground
  ) {
    new BackgroundLayerComponent(node)
  }

  if (node.children) {
    node.children.forEach((childNode) => {
      initProject(childNode)
    })
  }
}
