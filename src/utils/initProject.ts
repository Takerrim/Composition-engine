import { BackgroundLayer, TextLayer } from '@/entities'
import { NodeTypes } from '@/entities/enums'
import { AnyLayerType, INodeProps } from '@/entities/interfaces'

export default function initProject(
  nodeProps: INodeProps,
  parentLayer: AnyLayerType|null = null,
) {
  let component: AnyLayerType|null = null

  if ([NodeTypes.Frame, NodeTypes.RootFrame].includes(nodeProps.type)) {
    component = new BackgroundLayer(nodeProps, parentLayer)
  } else if  (nodeProps.type === NodeTypes.Text) {
    component = new TextLayer(nodeProps, parentLayer as AnyLayerType)
  }

  if (component) {
    if (component.parentLayer) {
      component.parentLayer.childLayers.push(component)
    }
  }

  console.log(component)

  if (nodeProps.children) {
    nodeProps.children.forEach((childNode) => {
      initProject(childNode, component)
    })
  }
}
