import { AnyLayerType } from '@/entities/interfaces'
import { TextLayer } from '@/entities'
import { NodeTypes } from '@/entities/enums'

let output = document.createElement('canvas').getContext('2d') as CanvasRenderingContext2D

export default async function makeImage(layer: AnyLayerType) {
  if (layer.nodeProps.type === NodeTypes.RootFrame && layer.nodeProps.absoluteBoundingBox) {
    output.canvas.width = layer.nodeProps.absoluteBoundingBox.width
    output.canvas.height = layer.nodeProps.absoluteBoundingBox.height
  }

  const position = {
    x: layer.position.x + (layer.parentLayer?.position.x || 0),
    y: layer.position.y + (layer.parentLayer?.position.y || 0),
  }

  try {    
    if (layer instanceof TextLayer) {
      const image = await layer.toImage()
      output.drawImage(
        image,
        position.x,
        position.y,
      )
    } else {
      output.putImageData(
        layer.getImageData,
        position.x,
        position.y,
      )
    }
  
  
    if (layer.children.length > 0) {
      layer.children.forEach((child) => {
        makeImage(child)
      })
    } else {
      const image = new Image()
      image.onload = () => {
        document.body.appendChild(image)
      }
      image.src = output.canvas.toDataURL('image/png')
    }
  } catch (error) {
    console.log(error) 
  }
}
