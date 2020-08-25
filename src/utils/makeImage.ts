import { AnyComponentType } from "../components/interfaces"

let output = document.createElement('canvas').getContext('2d')

output.canvas.width = 1200
output.canvas.height = 800

export default function makeImage(layer: AnyComponentType) {
  output.putImageData(
    layer.getImageData,
    layer.props.position.x + layer.parentLayer?.props.position.x || 0,
    layer.props.position.y + layer.parentLayer?.props.position.y || 0,
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
