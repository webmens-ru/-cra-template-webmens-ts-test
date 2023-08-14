export function createRootEl(containerId: string): HTMLElement {
  const rootEl = document.createElement("div")
  const offsetHeight = document.documentElement.offsetHeight

  rootEl.id = containerId
  rootEl.style.zIndex = "1250"
  rootEl.style.left = "0"
  rootEl.style.top = "0"
  rootEl.style.right = "0"
  rootEl.style.height = offsetHeight.toString()

  return rootEl
}

export function getRootEl(containerId: string): HTMLElement {
  const el = document.getElementById(containerId)

  return el || createRootEl(containerId)
}

export function procentWidthToPx(width: string): string {
  if (!width.includes("%")) return width

  const procent = parseInt(width)
  return `${window.innerWidth / 100 * procent}px`
}
