import { AnyLayerType } from "../components/interfaces"

let output = document.createElement('canvas').getContext('2d')

export default function makeImage(layer: AnyLayerType) {
  if (layer.parentLayer === null) {
    output.canvas.width = layer.props.width
    output.canvas.height = layer.props.height
  }

  output.putImageData(
    layer.getImageData,
    layer.position.x + layer.parentLayer?.position.x || 0,
    layer.position.y + layer.parentLayer?.position.y || 0,
  )

  if (layer.childLayers.length > 0) {
    layer.childLayers.forEach(child => {
      makeImage(child)
    })
  } else {
    const image = new Image()
    image.onload = () => {
      document.body.appendChild(image)
    }
    image.src = output.canvas.toDataURL('image/jpg')
  }
}
