import { render, screen } from "@testing-library/react";
import { ProcessSteps } from "@/components/ProcessSteps";

describe("ProcessSteps", () => {
  it("test_process_steps_renders_six_steps", () => {
    render(<ProcessSteps />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(6);
  });

  it("test_process_steps_numbered_correctly", () => {
    render(<ProcessSteps />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
  });
});
