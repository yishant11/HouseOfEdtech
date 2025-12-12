import { render, screen } from "@testing-library/react";
import ProductList from "./ProductList";

// Mock the productApi
const mockGetAll = jest.fn();

jest.mock("@/services/api", () => ({
  productApi: {
    getAll: mockGetAll,
  },
}));

describe("ProductList", () => {
  it("renders without crashing", () => {
    mockGetAll.mockImplementation(() => new Promise(() => {})); // Never resolving promise

    render(<ProductList />);

    expect(screen.getByText("Product Management")).toBeTruthy();
  });
});
