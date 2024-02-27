export const createIframeFields = (name: string, value: string | number | Object | null, root: HTMLFormElement | null, parentName?: string) => {
  if (!root || !value) return

  const newName = parentName ? `${parentName}[${name}]` : name

  if (typeof value !== "string" && typeof value !== "number") {
    const entries = Object.entries(value)

    for (let [childName, childValue] of entries) {
      createIframeFields(childName, childValue, root, newName)
    }

    return
  }

  const input = document.createElement("input")
  input.name = newName
  input.value = value.toString()
  input.type = "hidden"

  root.append(input)
}

export function procentWidthToPx(width: string, offset: number = 0): string {
  if (!width.includes("%")) return width

  const procent = parseInt(width)
  return `${(window.innerWidth / 100 * procent) + offset}px`
}
