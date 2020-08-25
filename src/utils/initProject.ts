import { BackgroundLayerComponent } from '../components'
import { IProps, AnyComponentType } from '../components/interfaces'
import { LayerTypes } from '../components/enums'

export default function initProject(
  node: IProps,
  parentLayer: AnyComponentType|null = null,
) {
  let component: AnyComponentType|null = null

  if (
    node.type === LayerTypes.MainBackground ||
    node.type === LayerTypes.LayerBackground
  ) {
    component = new BackgroundLayerComponent(node, parentLayer)

    if (parentLayer) {
      component.parentLayer.childLayers.push(component)
    } else {
      window.layer = component
    }
  }
  console.log(component)
  if (node.children) {
    node.children.forEach((childNode) => {
      initProject(childNode, component)
    })
  }
}
