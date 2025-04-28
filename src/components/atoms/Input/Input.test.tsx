
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input";

// Test básico para verificar si el componente se renderiza correctamente
describe("Input component", () => {
  
  it("renders a text input with label", () => {
    render(
      <Input
        type="text"
        label="Username"
        name="username"
        onChange={() => {}}
      />
    );

    const label = screen.getByText("Username");
    const input = screen.getByLabelText("Username");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  // Test para el tipo de input 'textarea'
  it("renders a textarea input", () => {
    render(
      <Input
        type="textarea"
        label="Description"
        name="description"
        value=""
        onChange={() => {}}
        rows={4}
      />
    );

    const textarea = screen.getByLabelText("Description");

    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute("rows", "4");
  });

  // Test para el tipo de input 'select'
  it("renders a select input with options", () => {
    render(
      <Input
        type="select"
        label="Country"
        name="country"
        value=""
        onChange={() => {}}
        options={[
          { value: "us", label: "United States" },
          { value: "ca", label: "Canada" }
        ]}
      />
    );

    const select = screen.getByLabelText("Country");
    expect(select).toBeInTheDocument();
    
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3); // 2 options + 1 disabled "Selecciona" option
  });

  // Test para el tipo de input 'checkbox'
  it("renders a checkbox input and handles change", () => {
    const handleChange = jest.fn();
    render(
      <Input
        type="checkbox"
        label="Accept Terms"
        name="acceptTerms"
        checked={false}
        onChange={handleChange}
      />
    );

    const checkbox = screen.getByLabelText("Accept Terms");

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    // Simular un click en el checkbox
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  // Test para el placeholder
  it("renders the input with a placeholder", () => {
    render(
      <Input
        type="text"
        label="Email"
        name="email"
        onChange={() => {}}
        placeholder="Enter your email"
      />
    );

    const input = screen.getByPlaceholderText("Enter your email");

    expect(input).toBeInTheDocument();
  });

  // Test para verificar el required attribute
  it("renders the input with required attribute", () => {
    render(
      <Input
        type="text"
        label="Username"
        name="username"
        required={true}
        onChange={() => {}}
      />
    );

    const input = screen.getByLabelText("Username");

    expect(input).toHaveAttribute("required");
  });
});

