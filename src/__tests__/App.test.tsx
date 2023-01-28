import { render, screen } from "@testing-library/react";
import App from "../App";

test("Loading main page", async () => {
  render(<App />);
  expect(screen.getAllByRole("button")).toBeDefined();
  expect(screen.getAllByText("Enter the name", { exact: false })).toBeDefined();
});
