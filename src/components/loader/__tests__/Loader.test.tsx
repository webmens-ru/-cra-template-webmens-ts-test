import React from "react";
import { render, screen } from "@testing-library/react";
import { Loader } from "../Loader";

describe("Loader", () => {
  test("render img", () => {
    render(<Loader />);
    const logo = screen.getByRole("img");
    expect(logo).toHaveAttribute("src", "webmens_200_200.png");
    expect(logo).toHaveAttribute("alt", "Logo");
  });
  test("render ring", () => {
    render(<Loader/>)
    const ring = screen.getByTestId('loader-ring')
    expect(ring).toBeInTheDocument()
  })
});
