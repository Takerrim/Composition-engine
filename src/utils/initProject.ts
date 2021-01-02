import { BackgroundLayer, TextLayer } from '@/entities'
import { NodeTypes } from '@/entities/enums'
import { AnyLayerType, INodeProps } from '@/entities/interfaces'
import store from '@/store'

export default function initProject(
  nodeProps: INodeProps,
  parentLayer: AnyLayerType|null = null,
) {
  let layer: AnyLayerType|null = null

  if ([NodeTypes.Frame, NodeTypes.RootFrame].includes(nodeProps.type)) {
    layer = new BackgroundLayer(nodeProps, parentLayer)
  } else if  (nodeProps.type === NodeTypes.Text) {
    layer = new TextLayer(nodeProps, parentLayer as AnyLayerType)
  }


  if (layer) {
    if (layer.nodeProps.type !== NodeTypes.RootFrame) {
      layer.parentLayer!.children.push(layer)
    } else {
      store.dispatch('project/setLayers', layer)
    }
  }

  if (nodeProps.children) {
    nodeProps.children.forEach((childNode) => {
      initProject(childNode, layer)
    })
  }
}
