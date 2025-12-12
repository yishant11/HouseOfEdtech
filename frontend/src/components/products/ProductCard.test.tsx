import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./ProductCard";

const mockProduct = {
  _id: "1",
  name: "Test Product",
  description: "This is a test product",
  price: 29.99,
  category: "Electronics",
  inStock: true,
  createdAt: "2023-01-01T00:00:00.000Z",
  updatedAt: "2023-01-01T00:00:00.000Z",
};

describe("ProductCard", () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders product information correctly", () => {
    render(
      <ProductCard
        product={mockProduct}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("This is a test product")).toBeInTheDocument();
    expect(screen.getByText("$29.99")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("In Stock")).toBeInTheDocument();
    expect(screen.getByText("Added: 1/1/2023")).toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", () => {
    render(
      <ProductCard
        product={mockProduct}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const editButton = screen.getByRole("button", { name: "Edit" });
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockProduct);
  });

  it("calls onDelete when delete button is clicked and confirmed", () => {
    // Mock window.confirm to return true
    window.confirm = jest.fn(() => true);

    render(
      <ProductCard
        product={mockProduct}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByRole("button", { name: "Delete" });
    fireEvent.click(deleteButton);

    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete "Test Product"?'
    );
    expect(mockOnDelete).toHaveBeenCalledWith("1");
  });

  it("does not call onDelete when delete is cancelled", () => {
    // Mock window.confirm to return false
    window.confirm = jest.fn(() => false);

    render(
      <ProductCard
        product={mockProduct}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByRole("button", { name: "Delete" });
    fireEvent.click(deleteButton);

    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete "Test Product"?'
    );
    expect(mockOnDelete).not.toHaveBeenCalled();
  });

  it("shows correct badge for out of stock products", () => {
    const outOfStockProduct = {
      ...mockProduct,
      inStock: false,
    };

    render(
      <ProductCard
        product={outOfStockProduct}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Out of Stock")).toBeInTheDocument();
    expect(screen.getByText("Out of Stock")).toHaveClass("bg-destructive");
  });
});
