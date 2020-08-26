import { BackgroundLayer, TextLayer } from '../components'
import { IProps, AnyLayerType } from '../components/interfaces'
import { LayerTypes } from '../components/enums'

export default function initProject(
  node: IProps,
  parentLayer: AnyLayerType|null = null,
) {
  let component: AnyLayerType|null = null

  if (
    node.type === LayerTypes.MainBackground ||
    node.type === LayerTypes.LayerBackground
  ) {
    component = new BackgroundLayer(node, parentLayer)
  } else if  (node.type === LayerTypes.Text) {
    component = new TextLayer(node, parentLayer)
  }

  if (component) {
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
