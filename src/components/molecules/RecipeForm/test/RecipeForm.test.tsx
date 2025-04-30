
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { RecipeForm } from "../RecipeForm";

// Mock the axios module
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("RecipeForm Component", () => {
  it("renders the form fields correctly", () => {
    render(<RecipeForm />);

    // Check for the form title
    expect(screen.getByText("Registrar receta")).toBeInTheDocument();

    // Check for the input fields
    expect(screen.getByLabelText("🥘 Nombre de la receta")).toBeInTheDocument();
    expect(screen.getByLabelText("🍽️ Porciones:")).toBeInTheDocument();
    expect(screen.getByLabelText("🛒 Ingredientes:")).toBeInTheDocument();
    expect(screen.getByLabelText("🍴 Preparación:")).toBeInTheDocument();

    // Check for the submit button
    expect(screen.getByRole("button", { name: /registrar producto/i })).toBeInTheDocument();
  });

  it("updates form fields on user input", () => {
    render(<RecipeForm />);

    // Simulate user input for the name field
    const nameInput = screen.getByLabelText("🥘 Nombre de la receta") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "Torta de chocolate" } });
    expect(nameInput.value).toBe("Torta de chocolate");

    // Simulate user input for the portions field
    const portionsInput = screen.getByLabelText("🍽️ Porciones:") as HTMLInputElement;
    fireEvent.change(portionsInput, { target: { value: "4 porciones" } });
    expect(portionsInput.value).toBe("4 porciones");

    // Simulate user input for the ingredients field
    const ingredientsTextarea = screen.getByLabelText("🛒 Ingredientes:") as HTMLTextAreaElement;
    fireEvent.change(ingredientsTextarea, { target: { value: "200g de harina" } });
    expect(ingredientsTextarea.value).toBe("200g de harina");

    // Simulate user input for the preparation field
    const preparationTextarea = screen.getByLabelText("🍴 Preparación:") as HTMLTextAreaElement;
    fireEvent.change(preparationTextarea, { target: { value: "1. Mezclar los ingredientes" } });
    expect(preparationTextarea.value).toBe("1. Mezclar los ingredientes");
  });

  it("submits the form and shows success message", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { message: "Receta registrada con éxito" } });

    render(<RecipeForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText("🥘 Nombre de la receta"), { target: { value: "Torta de chocolate" } });
    fireEvent.change(screen.getByLabelText("🍽️ Porciones:"), { target: { value: "4 porciones" } });
    fireEvent.change(screen.getByLabelText("🛒 Ingredientes:"), { target: { value: "200g de harina" } });
    fireEvent.change(screen.getByLabelText("🍴 Preparación:"), { target: { value: "1. Mezclar los ingredientes" } });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /registrar producto/i }));

    // Wait for the success message to appear
    await waitFor(() => {
      expect(screen.getByText("✅ Receta guardada correctamente")).toBeInTheDocument();
    });

    // Ensure the form fields are reset
    expect(screen.getByLabelText("🥘 Nombre de la receta")).toHaveValue("");
    expect(screen.getByLabelText("🍽️ Porciones:")).toHaveValue("");
    expect(screen.getByLabelText("🛒 Ingredientes:")).toHaveValue("");
    expect(screen.getByLabelText("🍴 Preparación:")).toHaveValue("");
  });

  it("handles API errors gracefully", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Error al registrar la receta"));

    render(<RecipeForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText("🥘 Nombre de la receta"), { target: { value: "Torta de chocolate" } });
    fireEvent.change(screen.getByLabelText("🍽️ Porciones:"), { target: { value: "4 porciones" } });
    fireEvent.change(screen.getByLabelText("🛒 Ingredientes:"), { target: { value: "200g de harina" } });
    fireEvent.change(screen.getByLabelText("🍴 Preparación:"), { target: { value: "1. Mezclar los ingredientes" } });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /registrar producto/i }));

    // Wait for the error to be logged
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining("Error al registrar la receta"));
    });
  });
});