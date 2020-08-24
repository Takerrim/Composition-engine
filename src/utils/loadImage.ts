export default function loadImage(
  ctx: CanvasRenderingContext2D,
  imageUrl: string
) {
  const image = new Image()
  image.addEventListener('load', () => {
    ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height)
  })
  image.src = imageUrl
}
