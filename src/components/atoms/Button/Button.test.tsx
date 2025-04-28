
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "./Button";

describe("Button Component", () => {
  it("renders the button with text", () => {
    render(<Button text="Click Me" />);
    const buttonElement = screen.getByText("Click Me");
    expect(buttonElement).toBeInTheDocument();
   
  });

  it("renders the button with children", () => {
    render(<Button>Child Content</Button>);
    const buttonElement = screen.getByText("Child Content");
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls the onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button text="Click Me" onClick={handleClick} />);
    const buttonElement = screen.getByText("Click Me");
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies the provided className", () => {
    render(<Button text="Styled Button" className="custom-class" />);
    const buttonElement = screen.getByText("Styled Button");
    expect(buttonElement).toHaveClass("custom-class");
  });

  it("sets the correct button type", () => {
    render(<Button text="Submit Button" type="submit" />);
    const buttonElement = screen.getByText("Submit Button");
    expect(buttonElement).toHaveAttribute("type", "submit");
  });
});