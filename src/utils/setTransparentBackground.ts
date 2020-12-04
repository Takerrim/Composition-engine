export default function setTransparentBackground(
  ctx: CanvasRenderingContext2D,
  bgColorArr: string[]
) {
  const image = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
  const data = image.data

  const bgColorSum = +bgColorArr[0] + +bgColorArr[1] + +bgColorArr[2]

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i]
    let g = data[i + 1]
    let b = data[i + 2]
    // let a = data[i + 3]
    if (r + g + b === bgColorSum) {
      data[i + 3] = 0
    }
  }
  console.log(image)
  ctx.putImageData(image, 0, 0)
}
