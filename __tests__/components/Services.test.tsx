import { render, screen } from "@testing-library/react";
import { Services } from "@/components/Services";

describe("Services", () => {
  it("test_services_renders_three_columns", () => {
    render(<Services />);
    const cards = screen.getAllByRole("heading", { level: 3 });
    expect(cards).toHaveLength(3);
  });

  it("test_services_renders_all_service_titles", () => {
    render(<Services />);
    expect(screen.getByText(/Projektowanie Ogrodu/i)).toBeInTheDocument();
    expect(screen.getByText(/Projektowanie Wnętrz/i)).toBeInTheDocument();
    expect(screen.getByText(/Zespół Wykonawczy/i)).toBeInTheDocument();
  });
});
