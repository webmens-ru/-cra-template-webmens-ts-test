import React from "react"
import { render, screen } from "@testing-library/react"
import { Button } from "../Button"

test('to be in the document', () => {
  render(<Button>hello</Button>)
  expect(screen.getByText('hello')).toBeInTheDocument()
})