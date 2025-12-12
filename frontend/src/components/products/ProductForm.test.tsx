import { render, screen, fireEvent } from "@testing-library/react";
import ProductForm from "./ProductForm";

// Mock the productApi
const mockCreate = jest.fn();
const mockUpdate = jest.fn();

jest.mock("@/services/api", () => ({
  productApi: {
    create: mockCreate,
    update: mockUpdate,
  },
}));

describe("ProductForm", () => {
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form fields correctly for new product", () => {
    render(<ProductForm onSave={mockOnSave} />);

    expect(screen.getByText("Add New Product")).toBeInTheDocument();
    expect(screen.getByLabelText("Product Name *")).toBeInTheDocument();
    expect(screen.getByLabelText("Price ($) *")).toBeInTheDocument();
    expect(screen.getByLabelText("Category *")).toBeInTheDocument();
    expect(screen.getByLabelText("Description *")).toBeInTheDocument();
    expect(screen.getByLabelText("In Stock")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Product" })
    ).toBeInTheDocument();
  });

  it("renders form fields correctly for editing product", () => {
    const mockProduct = {
      _id: "1",
      name: "Test Product",
      description: "Test Description",
      price: 29.99,
      category: "Electronics",
      inStock: true,
    };

    render(
      <ProductForm
        product={mockProduct}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByText("Edit Product")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Product")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Description")).toBeInTheDocument();
    expect(screen.getByDisplayValue("29.99")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Electronics")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Update Product" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("updates form fields when user types", () => {
    render(<ProductForm onSave={mockOnSave} />);

    const nameInput = screen.getByLabelText("Product Name *");
    fireEvent.change(nameInput, { target: { value: "New Product" } });
    expect(nameInput).toHaveValue("New Product");

    const priceInput = screen.getByLabelText("Price ($) *");
    fireEvent.change(priceInput, { target: { value: "49.99" } });
    expect(priceInput).toHaveValue("49.99");

    const descriptionInput = screen.getByLabelText("Description *");
    fireEvent.change(descriptionInput, {
      target: { value: "New Description" },
    });
    expect(descriptionInput).toHaveValue("New Description");
  });

  it("calls onSave when form is submitted successfully", async () => {
    mockCreate.mockResolvedValueOnce({});

    render(<ProductForm onSave={mockOnSave} />);

    fireEvent.change(screen.getByLabelText("Product Name *"), {
      target: { value: "Test Product" },
    });
    fireEvent.change(screen.getByLabelText("Price ($) *"), {
      target: { value: "29.99" },
    });
    fireEvent.change(screen.getByLabelText("Category *"), {
      target: { value: "Electronics" },
    });
    fireEvent.change(screen.getByLabelText("Description *"), {
      target: { value: "This is a test product description" },
    });

    const submitButton = screen.getByRole("button", { name: "Add Product" });
    fireEvent.click(submitButton);

    expect(mockCreate).toHaveBeenCalled();
    expect(mockOnSave).toHaveBeenCalled();
  });

  it("shows validation errors for invalid input", () => {
    render(<ProductForm onSave={mockOnSave} />);

    // Submit empty form
    const submitButton = screen.getByRole("button", { name: "Add Product" });
    fireEvent.click(submitButton);

    expect(
      screen.getByText("Please correct the following issues:")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Product name must be at least 2 characters long")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Description must be at least 10 characters long")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Price must be greater than $0")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Category must be at least 2 characters long")
    ).toBeInTheDocument();
  });
});
