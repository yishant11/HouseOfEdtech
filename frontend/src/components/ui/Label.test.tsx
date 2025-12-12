import { render, screen } from "@testing-library/react";
import { Label } from "./Label";

describe("Label", () => {
  it("renders correctly", () => {
    render(<Label htmlFor="test">Test Label</Label>);

    const label = screen.getByText("Test Label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("for", "test");
  });

  it("applies custom className correctly", () => {
    render(<Label className="custom-class">Test Label</Label>);

    const label = screen.getByText("Test Label");
    expect(label).toHaveClass("custom-class");
  });
});
