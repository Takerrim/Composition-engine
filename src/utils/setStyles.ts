export default function setStyles(
  stylesObj: Record<string, any>,
  target: HTMLElement
) {
  Object.entries(stylesObj).forEach(([rule, value]) => {
    target.style.setProperty(rule, value)
  })
}
