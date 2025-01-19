export function createRootEl(containerId: string): HTMLElement {
  const rootEl = document.createElement("div")
  rootEl.id = containerId
  rootEl.style.position = "fixed"
  rootEl.style.top = "25px"
  rootEl.style.right = "25px"
  rootEl.style.zIndex = "1000"

  return rootEl
}

export function getRootEl(containerId: string): HTMLElement {
  const el = document.getElementById(containerId)

  return el || createRootEl(containerId)
}
