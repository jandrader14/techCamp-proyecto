
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { RecipeForm } from "../RecipeForm";

// Mock de Axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("RecipeForm Component", () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        { _id: "1", name: "Harina" },
        { _id: "2", name: "Azúcar" },
      ],
    });
  });

  it("renders the form fields correctly", async () => {
    render(<RecipeForm />);

    // Esperar a que se carguen los productos
    await waitFor(() => {
      expect(screen.getByText("Harina")).toBeInTheDocument();
      expect(screen.getByText("Azúcar")).toBeInTheDocument();
    });

    // Verificar que los campos del formulario se renderizan
    expect(screen.getByLabelText("🥘 Nombre de la receta")).toBeInTheDocument();
    expect(screen.getByLabelText("🍽️ Porciones:")).toBeInTheDocument();
    expect(screen.getByLabelText("🍴 Preparación:")).toBeInTheDocument();
    expect(screen.getByText("🛒 Ingredientes:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /registrar producto/i })).toBeInTheDocument();
  });

  it("allows the user to add and remove ingredients", async () => {
    render(<RecipeForm />);

    // Esperar a que se carguen los productos
    await waitFor(() => {
      expect(screen.getByText("Harina")).toBeInTheDocument();
    });

    // Agregar un ingrediente
    const addButton = screen.getByRole("button", { name: /plus/i });
    fireEvent.click(addButton);

    // Verificar que se agregó un ingrediente
    expect(screen.getByLabelText("Cantidad")).toBeInTheDocument();
    expect(screen.getByLabelText("Unidad")).toBeInTheDocument();
    expect(screen.getByLabelText("Producto")).toBeInTheDocument();

    // Eliminar el ingrediente
    const deleteButton = screen.getByRole("button", { name: /trash2/i });
    fireEvent.click(deleteButton);

    // Verificar que se eliminó el ingrediente
    expect(screen.queryByLabelText("Cantidad")).not.toBeInTheDocument();
  });

  it("handles form submission successfully", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { message: "Receta registrada con éxito" },
    });

    render(<RecipeForm />);

    // Llenar los campos del formulario
    fireEvent.change(screen.getByLabelText("🥘 Nombre de la receta"), {
      target: { value: "Torta de chocolate" },
    });
    fireEvent.change(screen.getByLabelText("🍽️ Porciones:"), {
      target: { value: "4 porciones" },
    });
    fireEvent.change(screen.getByLabelText("🍴 Preparación:"), {
      target: { value: "1. Mezclar los ingredientes" },
    });

    // Agregar un ingrediente
    const addButton = screen.getByRole("button", { name: /plus/i });
    fireEvent.click(addButton);
    fireEvent.change(screen.getByLabelText("Cantidad"), {
      target: { value: "200" },
    });
    fireEvent.change(screen.getByLabelText("Unidad"), {
      target: { value: "gramos" },
    });
    fireEvent.change(screen.getByLabelText("Producto"), {
      target: { value: "1" },
    });

    // Enviar el formulario
    const submitButton = screen.getByRole("button", { name: /registrar producto/i });
    fireEvent.click(submitButton);

    // Esperar a que se muestre el mensaje de éxito
    await waitFor(() => {
      expect(screen.getByText("✅ Receta guardada correctamente")).toBeInTheDocument();
    });

    // Verificar que los campos del formulario se reinician
    expect(screen.getByLabelText("🥘 Nombre de la receta")).toHaveValue("");
    expect(screen.getByLabelText("🍽️ Porciones:")).toHaveValue("");
    expect(screen.getByLabelText("🍴 Preparación:")).toHaveValue("");
    expect(screen.queryByLabelText("Cantidad")).not.toBeInTheDocument();
  });

  it("handles API errors gracefully", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Error al registrar la receta"));

    render(<RecipeForm />);

    // Llenar los campos del formulario
    fireEvent.change(screen.getByLabelText("🥘 Nombre de la receta"), {
      target: { value: "Torta de chocolate" },
    });
    fireEvent.change(screen.getByLabelText("🍽️ Porciones:"), {
      target: { value: "4 porciones" },
    });
    fireEvent.change(screen.getByLabelText("🍴 Preparación:"), {
      target: { value: "1. Mezclar los ingredientes" },
    });

    // Enviar el formulario
    const submitButton = screen.getByRole("button", { name: /registrar producto/i });
    fireEvent.click(submitButton);

    // Esperar a que se registre el error en la consola
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining("Error al registrar la receta"));
    });
  });
});