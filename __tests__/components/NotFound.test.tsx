import { render, screen } from "@testing-library/react";
import NotFound from "@/app/not-found";

jest.mock("next/link", () => {
  const MockLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "Link";
  return MockLink;
});

describe("NotFound", () => {
  it("test_not_found_renders_404_heading", () => {
    render(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("test_not_found_renders_home_link", () => {
    render(<NotFound />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });

  it("test_not_found_home_link_text", () => {
    render(<NotFound />);
    expect(screen.getByRole("link")).toHaveTextContent(/wróć na stronę główną/i);
  });
});
